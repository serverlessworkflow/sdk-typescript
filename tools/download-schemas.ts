import fetch from 'node-fetch';
import * as path from 'path';
import {promises as fsPromises} from 'fs';
import rimraf from 'rimraf';
const {writeFile,mkdir} = fsPromises;
const rimrafP = async (f: string): Promise<void> => new Promise<void>((resolve, reject) => 
  rimraf(f, (err) => {
    if (err) return reject(err);
    resolve();
  })
);
/**
 * Represents the links of a GitHub content item
 */
interface GithubContentItemLinks {
  self:string;
  git: string;
  html: string;
}

/**
 * Represents the type of a GitHub content item
 */
enum GithubContentItemType {
  File = 'file',
  Dir = 'dir'
}

/**
 * Represents a GitHub content item
 */
interface GithubContentItem {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: GithubContentItemType;
  _links: GithubContentItemLinks;
}

/** Resets the destination directory */
const reset = async (destDir: string) => rimrafP(destDir)
  .then(() => mkdir(destDir, { recursive: true }))
  .then(() => writeFile(path.resolve(destDir, 'README.md'), `# Auto generated notice
This directory and its content has been generated automatically. Do not modify its content, it WILL be lost.`));

/**
 * A promise that list the schemas in the registry
 * @param {string} url The registry entry point
 * @returns {GithubContentItem[]} The list of items
 */
const listFiles = async (url: string): Promise<GithubContentItem[]> => fetch(url)
  .then((res: any) => {
    if (res.status !== 200) throw `Cannot fetch ${url}`;
    return res.json();
  })
  .then((items: GithubContentItem[]) => {
    const queue = items.map(i => {
      if (i.type === GithubContentItemType.Dir) return listFiles(i.url);
      return Promise.resolve([i]);
    });
    return Promise.all(queue);
  })
  .then((items: GithubContentItem[][]) => items.reduce((acc, i) => [...acc, ...i]));
/**
 * A promise that maps the item paths and their urls
 * @param {GithubContentItem[]} items The list of items
 * @returns {Map<string, string>} The path/url map
 */
const mapFilePaths = async (items: GithubContentItem[]): Promise<Map<string, string>> => {
  const filesMap = new Map<string, string>();
  items.forEach(i => {
    filesMap.set(
      i.path,
      i.download_url
    );
  })
  return Promise.resolve(filesMap);
};
/**
 * A promise to download the file at the provided url to the provided dest
 * @param {string} url The URL to get the file from
 * @param {string} dest The destination path
 * @returns {void}
 */
const downloadFile = async (url: string, dest: string): Promise<void> => mkdir(
    path.resolve(process.cwd(), 'src', dest.split('/').slice(0, -1).join('/')), 
    { recursive: true }
  )
  .then(() => fetch(url))
  .then((res: any) => res.arrayBuffer())
  .then((data) => writeFile(path.resolve(process.cwd(), 'src', dest), Buffer.from(data)))
  ;
/**
 * A promise to download the provided files
 * @param {Map<string, string>} filesMap The path/url map to download to/from
 * @returns {void}
 */
const downloadFiles = async (filesMap: Map<string, string>): Promise<void[]> => Promise.all(Array.from(filesMap).map(([dest, url]) => downloadFile(url, dest)));

/** The schema registry base url */
const registryUrl = 'https://api.github.com/repos/serverlessworkflow/specification/contents/schema?ref=main';
/** List, map, download */
reset(path.resolve(process.cwd(), 'src/schema'))
  .then(() => listFiles(registryUrl))
  .then(mapFilePaths)
  .then(downloadFiles)
  .then(console.log.bind(console))
  .catch(console.error.bind(console))
  ;