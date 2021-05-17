/*
 * Copyright 2021-Present The Serverless Workflow Specification Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * oUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import fetch from 'node-fetch';
import * as path from 'path';
import { promises as fsPromises } from 'fs';
import rimraf from 'rimraf';
import yargs from 'yargs';
import { version } from '../package.json';
import { readMeDisclaimer } from './consts';
const { writeFile, mkdir } = fsPromises;
const rimrafP = async (f: string): Promise<void> =>
  new Promise<void>((resolve, reject) =>
    rimraf(f, (err) => {
      if (err) return reject(err);
      resolve();
    })
  );
/**
 * Represents the links of a GitHub content item
 */
interface GithubContentItemLinks {
  self: string;
  git: string;
  html: string;
}

/**
 * Represents the type of a GitHub content item
 */
enum GithubContentItemType {
  File = 'file',
  Dir = 'dir',
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
const reset = async (destDir: string) =>
  rimrafP(destDir)
    .then(() => mkdir(destDir, { recursive: true }))
    .then(() => writeFile(path.resolve(destDir, 'README.md'), readMeDisclaimer));

/**
 * A promise that list the schemas in the registry
 * @param {string} url The registry entry point
 * @returns {GithubContentItem[]} The list of items
 */
const listFiles = async (url: string): Promise<GithubContentItem[]> =>
  fetch(url)
    .then((res: any) => {
      if (res.status !== 200) throw `Cannot fetch ${url}`;
      return res.json();
    })
    .then((items: GithubContentItem[]) => {
      const queue = items.map((i) => {
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
  items.forEach((i) => {
    filesMap.set(i.path, i.download_url);
  });
  return Promise.resolve(filesMap);
};
/**
 * A promise to download the file at the provided url to the provided dest
 * @param {string} url The URL to get the file from
 * @param {string} dest The destination path
 * @returns {void}
 */
const downloadFile = async (url: string, dest: string): Promise<void> =>
  mkdir(path.resolve(process.cwd(), 'src/lib', dest.split('/').slice(0, -1).join('/')), { recursive: true })
    .then(() => fetch(url))
    .then((res: any) => res.arrayBuffer())
    .then((data) => writeFile(path.resolve(process.cwd(), 'src/lib', dest), Buffer.from(data)));
/**
 * A promise to download the provided files
 * @param {Map<string, string>} filesMap The path/url map to download to/from
 * @returns {void}
 */
const downloadFiles = async (filesMap: Map<string, string>): Promise<void[]> =>
  Promise.all(Array.from(filesMap).map(([dest, url]) => downloadFile(url, dest)));

const argv = yargs(process.argv.slice(2)).argv;
const ref = `v${version.split('.').slice(0, -1).join('.')}`;
/** The schema registry base url, either provided in args or based on the package version */
const registryUrl: string =
  (argv.registry as string) ||
  `https://api.github.com/repos/serverlessworkflow/specification/contents/schema?ref=${ref}`;
console.log(`Using registry '${registryUrl}'`);
/** List, map, download */
reset(path.resolve(process.cwd(), 'src/lib/schema'))
  .then(() => listFiles(registryUrl))
  .then(mapFilePaths)
  .then(downloadFiles)
  .then(console.log.bind(console))
  .catch(console.error.bind(console));
