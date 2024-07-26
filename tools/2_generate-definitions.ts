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
import { fileHeader } from './consts';
import { definitionsDir, isObject, reset, schemaDir, toPascalCase } from './utils';

const { writeFile, readFile } = fsPromises;

const structuralObjectProperties = [
  '$defs',
  'definitions',
  'properties',
  'patternProperties',
  'additionalProperties',
  'dependencies',
  'dependentSchemas',
  'if',
  //'then', // creates a duplicate FlowDirective because of switch case then
  'else',
  'not',
  'items',
  'additionalItems',
  'unevaluatedItems',
  'contains',
  'propertyNames',
  'unevaluatedProperties',
];

const structuralArrayProperties = [
  'allOf',
  'anyOf',
  'oneOf',
  'items',
  'enum',
  'type',
  'examples',
  'required',
  'dependentRequired',
];

const metadataProperties = ['title', 'description', 'default', 'type'];

/**
 * Embellishes the provided schema to increase its compatibility with json-schema-to-typescript, the resulting schema should keep the validation properties as the input one (phase 1)
 * - adds missing type:object properties
 * - adds missing titles to objects
 * @param schema The schema to embellish
 * @param path The current path of the schema relative to the original schema
 * @param parentTitle The title of the parent object, if any
 * @returns An embellished schema with titles and types
 */
function prepareSchema(schema: any, path: string[] = ['#'], parentTitle: string = ''): any {
  if (!isObject(schema) && !Array.isArray(schema)) {
    return schema;
  }
  if (Array.isArray(schema)) {
    return schema.map((item, i) => prepareSchema(item, [...path, i.toString()], parentTitle));
  }
  const newSchema = JSON.parse(JSON.stringify(schema));
  const parent = path.slice(-1)[0];
  const schemaKeys = Object.keys(newSchema);
  if (!structuralObjectProperties.includes(parent)) {
    if (!newSchema.type && !newSchema.oneOf && !newSchema.anyOf && !newSchema.allOf) {
      // not necessary ?
      newSchema.type = 'object';
      schemaKeys.push('type');
    }
    if (newSchema.title) {
      parentTitle = newSchema.title;
    }
    if (
      !newSchema.title &&
      (!newSchema.type || newSchema.type === 'object' || newSchema.type === 'array') && // only naming object or array types
      isNaN(parseInt(parent, 10)) && // it comes from a oneOf/anyOf/allOf, it should be titled manually
      newSchema.items?.type !== 'string' && // if it's an array of string, it doesn't need to be named
      newSchema.items?.type !== 'number' && // if it's an array of number, it doesn't need to be named
      schemaKeys.filter((key) => !metadataProperties.includes(key)).length // if it's just a plain object, with nothing but a type an some description
    ) {
      if (parentTitle.trim()) {
        newSchema.title = toPascalCase(`${parentTitle} ${parent}`);
      } else {
        newSchema.title = toPascalCase(
          path
            .slice(1)
            .filter((part) => !structuralObjectProperties.includes(part) && !structuralArrayProperties.includes(part))
            .join(' '),
        );
      }
      schemaKeys.push('title');
      parentTitle = newSchema.title;
    }
  }
  return Object.entries(newSchema).reduce((outputSchema, [key, value]: [string, any]) => {
    outputSchema[key] = prepareSchema(value, [...path, key], parentTitle);
    return outputSchema;
  }, {} as any);
}

/**
 * Transforms the provided schema to increase its compatibility with json-schema-to-typescript, the resulting schema **will** behave differently that the input one (phase 2)
 * - replaces `unevaluatedProperties` with `additionalProperties`
 * - transforms inheritance via `$ref` or `additionalProperties.$ref` to `allOf.$ref`
 * - removes metadata where only $ref is used
 * @param schema The schema to transform
 * @param path The current path of the schema relative to the original schema
 * @returns A mutated schema
 */
function mutateSchema(schema: any, path: string[] = ['#']): any {
  if (!isObject(schema) && !Array.isArray(schema)) {
    return schema;
  }
  if (Array.isArray(schema)) {
    return schema.map((item, i) => mutateSchema(item, [...path, i.toString()]));
  }
  const newSchema = JSON.parse(JSON.stringify(schema));
  const parent = path.slice(-1)[0];
  const schemaKeys = Object.keys(newSchema);
  if (!structuralObjectProperties.includes(parent)) {
    if (newSchema.unevaluatedProperties != null) {
      newSchema.additionalProperties = newSchema.unevaluatedProperties;
      delete newSchema.unevaluatedProperties;
      schemaKeys[schemaKeys.indexOf('unevaluatedProperties')] = 'additionalProperties';
    }
    if (newSchema['$ref']) {
      if (schemaKeys.filter((key) => !metadataProperties.includes(key)).length == 1) {
        // only $ref
        metadataProperties.forEach((prop) => delete newSchema[prop]);
      } else if (newSchema.properties) {
        const $ref = { $ref: newSchema['$ref'] };
        const properties = {
          properties: newSchema.properties,
        } as any;
        delete newSchema['$ref'];
        delete newSchema.properties;
        newSchema.allOf = [$ref, properties];
      }
    }
  }
  return Object.entries(newSchema).reduce((outputSchema, [key, value]: [string, any]) => {
    outputSchema[key] = mutateSchema(value, [...path, key]);
    return outputSchema;
  }, {} as any);
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
    style: {
      singleQuote: true,
    },
    //unreachableDefinitions: true,
  };
  const schemaText = await readFile(srcFile, { encoding: 'utf-8' });
  let schema = prepareSchema(JSON.parse(schemaText));
  await writeFile(srcFile.replace('workflow', '__internal_workflow'), JSON.stringify(schema, null, 2));
  schema = mutateSchema(schema);
  //await writeFile(srcFile.replace('workflow', '__mutated_workflow'), JSON.stringify(schema, null, 2));
  const declarations = await compile(schema, 'Workflow', options);
  const destDir = path.dirname(destFile);
  await reset(destDir);
  await writeFile(destFile, declarations);
  await writeFile(path.resolve(destDir, 'index.ts'), `${fileHeader}export * as Specification from './specification';`);
}

const srcFile = path.resolve(schemaDir, 'workflow.json');
const destFile = path.resolve(definitionsDir, 'specification.ts');

generate(srcFile, destFile).then(console.log.bind(console)).catch(console.error.bind(console));
