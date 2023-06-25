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
import { schemaDir, mergeDefinitions, mergeSchemas, schemaUrl } from './utils';

const { writeFile } = fsPromises;

/**
 * Generate a merged schema `__merged.json` from schemas in schemas directory
 * @param schemaUrl {string} The URL to download the schema from //TODO this does not like right, revisit mergeDefinitions
 * @param destDir {string} The destination path to save the schema to
 * @returns {void}
 */
const execute = async (schemaUrl: URL, destDir: string): Promise<void> => {
  try {
    const $refParser = new $RefParser();
    await $refParser.resolve(schemaUrl.href);
    const externalSchemas = $refParser.$refs
      .paths()
      .filter((p, index, arr) => arr.indexOf(p) === index && p !== schemaUrl.href);

    const known$Refs = new Map<string, string>();
    await mergeDefinitions($refParser, externalSchemas, known$Refs);
    mergeSchemas($refParser, known$Refs, $refParser.schema, '#/');
    await writeFile(path.resolve(destDir, '__merged.json'), JSON.stringify($refParser.schema, null, 2));
    return Promise.resolve();
  } catch (ex) {
    return Promise.reject(ex);
  }
};

execute(schemaUrl, schemaDir).then(console.log.bind(console)).catch(console.error.bind(console));
