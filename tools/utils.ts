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

import { promises as fsPromises } from 'fs';
import * as path from 'path';
import { rimraf } from 'rimraf';
import { readMeDisclaimer } from './consts';
import { URL } from 'url';
import yargs from 'yargs';
import { schemaVersion } from '../package.json';

const { writeFile, mkdir } = fsPromises;

/** Resets the destination directory, recursively deletes everything and adds the README */
export const reset = async (destDir: string) =>
  rimraf(destDir)
    .then(() => mkdir(destDir, { recursive: true }))
    .then(() => writeFile(path.resolve(destDir, 'README.md'), readMeDisclaimer));

/** Schemas directory */
export const schemaDir = path.resolve(process.cwd(), 'src/lib/schema');

const argv = yargs(process.argv.slice(2))
  .options({
    url: { type: 'string' },
  })
  .parseSync();
/** The URL to download the schema from */
export const schemaUrl: URL = new URL(
  argv.url || `https://serverlessworkflow.io/schemas/${schemaVersion}/workflow.json`,
);
