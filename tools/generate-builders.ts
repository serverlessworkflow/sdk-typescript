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

import { promises as fsPromises } from 'fs';
import * as path from 'path';
import rimraf from 'rimraf';
import { fileHeader, readMeDisclaimer } from './consts';
const { readFile, writeFile, mkdir } = fsPromises;
const rimrafP = async (f: string): Promise<void> =>
  new Promise<void>((resolve, reject) =>
    rimraf(f, (err) => {
      if (err) return reject(err);
      resolve();
    })
  );
declare global {
  interface String {
    matchAll(re: RegExp): RegExpExecArray[];
  }
}
if (!String.prototype.matchAll) {
  String.prototype.matchAll = function (re) {
    const results: RegExpExecArray[] = [];
    let matches: RegExpExecArray | null;
    while ((matches = re.exec(this))) {
      results.push(matches);
    }
    return results;
  };
}

interface BuilderExtension {
  preValidate: string;
}
/** Stores additional code that needs to be added to builders depending on their type */
const buildersExtensions: { [key: string]: BuilderExtension } = {
  Workflow: {
    preValidate: `\n    data.expressionLang = data.expressionLang || 'jq';
                        data.keepActive =  data.keepActive || false;`,
  },
  Exectimeout: {
    preValidate: `\n    data.interrupt = data.interrupt || false;`,
  },
  Transition: {
    preValidate: `\n    if (typeof data !== typeof '') (data as any).compensate = (data as any).compensate || false;`,
  },
  Onevents: {
    preValidate: `\n    data.actionMode = data.actionMode || 'sequential';`,
  },
  Callbackstate: {
    preValidate: `\n    data.type = 'callback';
                        data.usedForCompensation = data.usedForCompensation || false;`,
  },
  Databasedswitch: {
    preValidate: `\n    data.type = 'switch';
                        data.usedForCompensation = data.usedForCompensation || false;`,
  },
  Delaystate: {
    preValidate: `\n    data.type = 'delay';
                        data.usedForCompensation = data.usedForCompensation || false;`,
  },
  Eventbasedswitch: {
    preValidate: `\n    data.type = 'switch';
                        data.usedForCompensation = data.usedForCompensation || false;`,
  },
  Eventstate: {
    preValidate: `\n    data.type = 'event';
                        if (data.exclusive == null) data.exclusive = true;`,
  },
  Foreachstate: {
    preValidate: `\n    data.type = 'foreach';
                        data.usedForCompensation = data.usedForCompensation || false;`,
  },
  Injectstate: {
    preValidate: `\n    data.type = 'inject';
                        data.usedForCompensation = data.usedForCompensation || false;`,
  },
  Operationstate: {
    preValidate: `\n    data.type = 'operation';
                        data.actionMode = data.actionMode || 'sequential';
                        data.usedForCompensation = data.usedForCompensation || false;`,
  },
  Parallelstate: {
    preValidate: `\n    data.type = 'parallel';
                        data.completionType = data.completionType || 'and';
                        data.usedForCompensation = data.usedForCompensation || false;`,
  },
  Subflowstate: {
    preValidate: `\n    data.type = 'subflow';
                        data.waitForCompletion = data.waitForCompletion || false;
                        data.usedForCompensation = data.usedForCompensation || false;`,
  },
  Function: {
    preValidate: `\n    data.type =  data.type || 'rest';`,
  },
  Eventdef: {
    preValidate: `\n    data.kind =  data.kind || 'consumed';`,
  },
  End: {
    preValidate: `\n    if (typeof data !== typeof true) {
                          (data as any).terminate = (data as any).terminate || false;
                          (data as any).compensate = (data as any).compensate || false;
                        }`,
  },
  Repeat: {
    preValidate: `\n    if (data.checkBefore == null) data.checkBefore = true;
                        data.continueOnError = data.continueOnError || false;`,
  },
};

/**
 * Transforms PascalCase/camelCase/snake_case into kebab-case
 * @param {string} value A string
 * @param {boolean} trim If the string needs to be trimmed before transformation
 * @returns A kebab-case string
 */
const toKebabCase = (value: string, trim: boolean = true): string => {
  if (!value) return '';
  const transformable = trim ? value.trim() : value;
  return transformable
    .replace(/([A-Z])/g, '-$1')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/_+/g, '-')
    .toLowerCase();
};

/**
 * Transforms PascalCase into camelCase
 * @param {string} value A PascalCase string
 * @returns A camelCase string
 */
const toCamelCase = (value: string): string => {
  if (!value) return '';
  const transformable = value.trim();
  return transformable[0].toLowerCase() + transformable.slice(1);
};

/**
 * Creates a builder for the provided type
 * @param {string} destDir The builders directory
 * @param {string} dataType The type to create the builder for
 * @returns {void}
 */
const createBuilder = async (destDir: string, dataType: string): Promise<void> => {
  try {
    const camelType = toCamelCase(dataType);
    const extension = buildersExtensions[dataType];
    const builderCode =
      fileHeader +
      `import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validate } from '../utils';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.${dataType}} data The underlying object
 * @returns {Specification.${dataType}} The validated underlying object
 */
function ${camelType}BuildingFn(data: Specification.${dataType}): (() => Specification.${dataType}) {
  return () => {${extension?.preValidate ? extension.preValidate : ''}
    validate('${dataType}', data);
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type \`Specification.${dataType}\`
 * @returns {Specification.${dataType}} A builder for \`Specification.${dataType}\`
 */
export function ${camelType}Builder(): Builder<Specification.${dataType}> {
  return builder<Specification.${dataType}>(${camelType}BuildingFn);
}`;
    const destFile = path.resolve(destDir, toKebabCase(camelType) + '-builder.ts');
    await writeFile(destFile, builderCode);
    return Promise.resolve();
  } catch (ex) {
    return Promise.reject(ex);
  }
};

/**
 * Creates the builders index file
 * @param {string} destDir The builders directory
 * @param {string} dataType The type to create the builders index for
 * @returns {void}
 */
const createIndex = async (destDir: string, types: string[]): Promise<void> => {
  try {
    const indexCode: string =
      fileHeader +
      types.reduce((acc, t) => acc + `export * from './${toKebabCase(toCamelCase(t)) + '-builder'}';\n`, '');
    const indexFile = path.resolve(destDir, 'index.ts');
    await writeFile(indexFile, indexCode);
    return Promise.resolve();
  } catch (ex) {
    return Promise.reject(ex);
  }
};

/**
 * Generates builders
 * @param {string} source The definition file path
 * @param {string} destDir The output directory for builders
 * @returns {void}
 */
const generate = async (source: string, destDir: string): Promise<void> => {
  try {
    await rimrafP(destDir);
    await mkdir(destDir, { recursive: true });
    await writeFile(path.resolve(destDir, 'README.md'), readMeDisclaimer);
    const extractor: RegExp = /export \w* (\w*)/g;
    const definition: string = await readFile(source, 'utf-8');
    const types: string[] = [...definition.matchAll(extractor)].map(([, type]) => type);
    await Promise.all(types.map(createBuilder.bind(null, destDir)));
    createIndex(destDir, types);
    return Promise.resolve();
  } catch (ex) {
    return Promise.reject(ex);
  }
};

const buildersDir = path.resolve(process.cwd(), 'src/lib/builders');
const definitionSrc = path.resolve(process.cwd(), 'src/lib/definitions/workflow.ts');
generate(definitionSrc, buildersDir).then(console.log.bind(console)).catch(console.error.bind(console));
