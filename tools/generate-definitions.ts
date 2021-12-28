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
import dtsGenerator, { JsonSchema as dtsGeneratorJsonSchema, parseSchema } from 'dtsgenerator';
import { promises as fsPromises } from 'fs';
import * as path from 'path';
import { fileHeader } from './consts';
import { capitalizeFirstLetter, mergeDefinitions, mergeSchemas, reset } from './utils';

const { writeFile } = fsPromises;

/**
 * Creates the type->path map for the ajv validators
 * @param {string} dest The output path
 * @param {Map<string, string>} known$Refs The know references map
 * @returns {void}
 */
const createValidatorsPaths = async (dest: string, known$Refs: Map<string, string>, baseUrl: string): Promise<void> => {
  try {
    const validatorsPathsCode =
      fileHeader +
      `/**
* A map of type names and their corresponding schema
*/
export const validatorsPaths: [string, string][] = [
  ['Workflow', '${baseUrl}/workflow.json'],
${Array.from(known$Refs)
  .map(
    ([dataType, path]) =>
      `  ['${capitalizeFirstLetter(dataType)}', '${baseUrl}/${
        path.includes('.json') ? path : 'workflow.json' + path
      }'],`
  )
  .join('\r\n')}
]`;
    const destDir = path.dirname(dest);
    await reset(destDir);
    await writeFile(dest, validatorsPathsCode);
  } catch (ex) {
    return Promise.reject(ex);
  }
};

/**
 * Generates TypeScript equivalent of the provided JSON Schema
 * @param {string} source The input JSON Schema path
 * @param {string} dest The output TypeScript path
 * @param {string[]} additionnalSchemas Optional schemas to gather and merge definitions from
 */
const generate = async (source: string, dest: string, additionnalSchemas: string[] = []): Promise<void> => {
  try {
    const $refParser = new $RefParser();
    const known$Refs = new Map<string, string>();
    await $refParser.resolve(source);
    const paths = [...$refParser.$refs.paths(), ...additionnalSchemas].filter(
      (p, index, arr) => arr.indexOf(p) === index && p !== source
    );
    await mergeDefinitions($refParser, paths, known$Refs);
    mergeSchemas($refParser, known$Refs, $refParser.schema, '#/');
    let generatedTS = (
      await dtsGenerator({
        contents: [parseSchema($refParser.schema as dtsGeneratorJsonSchema)],
        config: {
          plugins: {
            '@dtsgenerator/replace-namespace': {
              map: [
                {
                  from: [true, true, true, true, true],
                  to: ['ServerlessWorkflow'],
                },
              ],
            },
          },
        },
      })
    )
      .replace(/WorkflowJson\.Definitions\./g, '')
      .replace(/WorkflowJson/g, 'Workflow');
    const lines = generatedTS.split('\n');
    generatedTS = lines.slice(1, lines.length - 2).join('\n'); // removes 'declare namespace' and keeps 'exports'.
    const destDir = path.dirname(dest);
    await reset(destDir);
    await writeFile(dest, fileHeader + generatedTS);
    await writeFile(path.resolve(destDir, 'index.ts'), fileHeader + "export * as Specification from './workflow';");
    const validatorsDest = path.resolve(path.dirname(dest), '../validation/validators-paths.ts');
    const $id = $refParser.schema.$id;
    const baseUrl = path.dirname($id);
    await createValidatorsPaths(validatorsDest, known$Refs, baseUrl);
    return Promise.resolve();
  } catch (ex) {
    return Promise.reject(ex);
  }
};

const srcFile = path.resolve(process.cwd(), 'src/lib/schema/workflow.json');
const destFile = 'src/lib/schema/types/workflow.ts';
/*
const additionnalSchemas = [
  path.resolve(process.cwd(), 'src/lib/schema/common.json'), // should be resolved already, no need to add it manually
  path.resolve(process.cwd(), 'src/lib/schema/extensions/kpi.json'), // not linked by workflow, manually added
];
generate(srcFile, destFile, additionnalSchemas)
*/
generate(srcFile, destFile).then(console.log.bind(console)).catch(console.error.bind(console));
