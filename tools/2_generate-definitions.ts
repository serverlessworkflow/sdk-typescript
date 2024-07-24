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

import { compile, JSONSchema, Options } from 'json-schema-to-typescript';
import { promises as fsPromises } from 'fs';
import * as path from 'path';
import { Project, QuoteKind } from 'ts-morph';
import { fileHeader } from './consts';
import { definitionsDir, isObject, reset, schemaDir } from './utils';

const { writeFile, readFile } = fsPromises;

/**
 * Try to prevent type duplicate by removing metadata where $ref are used
 * see https://github.com/bcherny/json-schema-to-typescript/issues/193
 * @param schema The raw schema
 * @returns The schema without conflicting metadata
 */
function removeConflictingMetadata(schema: any): any {
  const blacklistedProperties = ['title', 'description', 'default'];
  if (!isObject(schema) && !Array.isArray(schema)) {
    return schema;
  }
  if (Array.isArray(schema)) {
    return schema.map((item) => removeConflictingMetadata(item));
  }
  return Object.entries(schema).reduce((outputSchema, [key, value]: [string, any]) => {
    let newValue = JSON.parse(JSON.stringify(value));
    if (!!newValue['$ref']) {
      // leave only $ref if the definition only includes $ref and some metadata. If there are additionnal properties, leave it untouched
      blacklistedProperties.forEach((prop) => delete newValue[prop]);
      if (Object.keys(newValue).length > 1) {
        newValue = JSON.parse(JSON.stringify(value));
      }
    }
    outputSchema[key] = removeConflictingMetadata(newValue);
    return outputSchema;
  }, {} as any);
}

/**
 * Removes duplicate declarations from the provided TypeScript code
 * see https://github.com/bcherny/json-schema-to-typescript/issues/193
 * @param tsSource The TypeScript source code to remove the duplicates from
 * @returns The source code without duplicates
 */
function removeDuplicateDeclarations(tsSource: string): string {
  const project = new Project({
    useInMemoryFileSystem: true,
    manipulationSettings: {
      quoteKind: QuoteKind.Single,
    },
  });
  const sourceFile = project.createSourceFile('declarations.ts', tsSource);
  const duplicates = Array.from(sourceFile.getExportedDeclarations())
    .map(([name, _]) => name)
    .filter((name) => name.match(/\d$/));
  const newSource = duplicates.reduce(
    (src, name) => src.replace(new RegExp(': ' + name, 'g'), ': ' + name.replace(/\d+$/g, '')),
    tsSource,
  );
  sourceFile.replaceWithText(newSource);
  for (const name of duplicates) {
    const declaration = sourceFile.getTypeAlias(name) || sourceFile.getInterface(name);
    declaration?.remove();
  }
  sourceFile.formatText();
  return sourceFile.getFullText();
}

/**
 * Generates a TypeScript file containing type declarations that represent the structure defined in the JSON Schema
 * @param srcFile The path to the JSON Schema file
 * @param destFile The destination path where the generated TypeScript file will be saved
 * @returns A promise that resolves when the TypeScript file has been successfully written
 */
async function generate(srcFile: string, destFile: string): Promise<void> {
  const options: Partial<Options> = {
    customName: (schema: JSONSchema, keyNameFromDefinition: string | undefined) =>
      schema.$id?.includes('serverlessworkflow.io') ? 'Workflow' : keyNameFromDefinition,
    bannerComment: `${fileHeader}
  
  /*****************************************************************************************
   *
   * /!\\ This file is computer generated. Any manual modification can and will be lost. /!\\
   *
   *****************************************************************************************/
  
  `,
    //unreachableDefinitions: true,
  };
  const schemaText = await readFile(srcFile, { encoding: 'utf-8' });
  const schema = removeConflictingMetadata(JSON.parse(schemaText));
  //const schema = JSON.parse(schemaText);
  const declarations = await compile(schema, 'Workflow', options);
  const destDir = path.dirname(destFile);
  await reset(destDir);
  await writeFile(destFile, declarations);
  //await writeFile(destFile, removeDuplicateDeclarations(declarations));
  await writeFile(path.resolve(destDir, 'index.ts'), fileHeader + "export * as Specification from './specification';");
}

const srcFile = path.resolve(schemaDir, 'workflow.json');
const destFile = path.resolve(definitionsDir, 'specification.ts');

generate(srcFile, destFile).then(console.log.bind(console)).catch(console.error.bind(console));
