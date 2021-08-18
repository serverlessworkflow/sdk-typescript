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
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import $RefParser from '@apidevtools/json-schema-ref-parser';
import { promises as fsPromises } from 'fs';
import * as path from 'path';
import { URL } from 'url';
import yargs from 'yargs';
import { schemaVersion } from '../package.json';
import { mergeDefinitions, mergeSchemas, reset } from './utils';
const { writeFile, mkdir } = fsPromises;

/**
 * Downloads the given schema (and referenced sub-schema) and save them to disk
 * A merged schema is also saved as `__merged.json`
 * @param schemaUrl {string} The URL to download the schema from
 * @param destDir {string} The destination path to save the schema to
 * @returns {void}
 */
const download = async (schemaUrl: URL, destDir: string): Promise<void> => {
  try {
    await reset(destDir);
    const fileName = path.basename(schemaUrl.pathname);
    const urlBase = schemaUrl.href.replace(fileName, '');
    const $refParser = new $RefParser();
    await $refParser.resolve(schemaUrl.href);
    const externalSchemas = $refParser.$refs
      .paths()
      .filter((p, index, arr) => arr.indexOf(p) === index && p !== schemaUrl.href);
    await writeFile(path.resolve(destDir, fileName), JSON.stringify($refParser.schema, null, 2));
    externalSchemas.forEach(async (externalSchemaUrl: string) => {
      const externalSchema = $refParser.$refs.get(externalSchemaUrl);
      if (externalSchema) {
        const externalSchemaFileName = externalSchemaUrl.replace(urlBase, '');
        await mkdir(path.resolve(destDir, path.dirname(externalSchemaFileName)), { recursive: true });
        await writeFile(path.resolve(destDir, externalSchemaFileName), JSON.stringify(externalSchema, null, 2));
      }
    });
    const known$Refs = new Map<string, string>();
    await mergeDefinitions($refParser, externalSchemas, known$Refs);
    mergeSchemas($refParser, known$Refs, $refParser.schema, '#/');
    await writeFile(path.resolve(destDir, '__merged.json'), JSON.stringify($refParser.schema, null, 2));
    return Promise.resolve();
  } catch (ex) {
    return Promise.reject(ex);
  }
};

const argv = yargs(process.argv.slice(2)).argv;
const schemaUrl: URL = new URL(
  (argv.url as string) ||
    `https://raw.githubusercontent.com/serverlessworkflow/specification/${schemaVersion}.x/schema/workflow.json`
);
const destDir = path.resolve(process.cwd(), 'src/lib/schema');

download(schemaUrl, destDir).then(console.log.bind(console)).catch(console.error.bind(console));
