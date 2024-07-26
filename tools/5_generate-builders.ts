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
import { fileHeader } from './consts';
import {
  buildersDir,
  definitionsDir,
  getExportedDeclarations,
  normalizeKnownAllCaps,
  reset,
  toKebabCase,
} from './utils';

const { readFile, writeFile } = fsPromises;

interface BuilderExtension {
  import?: string;
  preValidate: string;
}

/** Stores additional code that needs to be added to builders depending on their type */
const buildersExtensions: { [key: string]: BuilderExtension } = {
  Dummy: {
    // example
    import: `import { dummyFunction } from '../definitions/utils';`,
    preValidate: `\r\n    dummyFunction(model);`,
  },
};

/**
 * Transforms PascalCase into camelCase
 * @param {string} value A PascalCase string
 * @returns A camelCase string
 */
function toCamelCase(value: string): string {
  if (!value) return '';
  const transformable = value.trim();
  return transformable[0].toLowerCase() + transformable.slice(1);
}

/**
 * Creates a builder for the provided type
 * @param {string} destDir The builders directory
 * @param {string} declaration The type to create the builder for
 * @returns {void}
 */
async function createBuilder(destDir: string, declaration: string): Promise<void> {
  const camelType = toCamelCase(declaration);
  const extension = buildersExtensions[declaration];
  const builderCode =
    fileHeader +
    `import { builder, Builder } from "../../builder";
import { validate } from "../../validation";
import { Classes } from "../classes";
import { Specification } from "../definitions";
${extension?.import ? extension.import + '\n' : ''}
/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.${declaration}} data The underlying object
 * @returns {Specification.${declaration}} The validated underlying object
 */
function buildingFn(data: Specification.${declaration}): Specification.${declaration} {
  const model = new Classes.${declaration}();
  Object.assign(model, data);
  ${extension?.preValidate || ''}    
  validate('${declaration}', model);
  return model as Specification.${declaration};
}

/**
 * A factory to create a builder proxy for the type \`Specification.${declaration}\`
 * @returns {Specification.${declaration}} A builder for \`Specification.${declaration}\`
 */
export function ${camelType}Builder(): Builder<Specification.${declaration}> {
return builder<Specification.${declaration}>(buildingFn);
}`;
  const destFile = path.resolve(destDir, toKebabCase(normalizeKnownAllCaps(declaration)) + '-builder.ts');
  await writeFile(destFile, builderCode);
}

/**
 * Creates the builders index file
 * @param destDir The builders directory
 * @param declarations The list of types to create the index for
 * @returns
 */
async function createIndex(destDir: string, declarations: string[]): Promise<void> {
  try {
    const indexCode: string =
      fileHeader +
      declarations.reduce(
        (acc, declaration) =>
          acc + `export * from './${toKebabCase(normalizeKnownAllCaps(declaration)) + '-builder'}';\n`,
        '',
      );
    const indexFile = path.resolve(destDir, 'index.ts');
    await writeFile(indexFile, indexCode);
    return Promise.resolve();
  } catch (ex) {
    return Promise.reject(ex);
  }
}

/**
 * Generates builders
 * @param definitionFile The definition file path
 * @param destDir The output directory for builders
 * @returns
 */
async function generate(definitionFile: string, destDir: string): Promise<void> {
  try {
    await reset(destDir);
    const definitions = await readFile(definitionFile, { encoding: 'utf-8' });
    const declarations = getExportedDeclarations(definitions);
    await Promise.all(declarations.map(createBuilder.bind(null, destDir)));
    createIndex(destDir, declarations);
    return Promise.resolve();
  } catch (ex) {
    return Promise.reject(ex);
  }
}

const definitionFile = path.resolve(definitionsDir, 'specification.ts');
generate(definitionFile, buildersDir).then(console.log.bind(console)).catch(console.error.bind(console));
