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
import { reset } from './utils';
const { readFile, writeFile } = fsPromises;

declare global {
  interface String {
    matchAll(re: RegExp): RegExpExecArray[];
  }
}

const types = ['Datacondition', 'Eventcondition', 'Events', 'Functions', 'Retries', 'Switchstate'];

interface BuilderExtension {
  import?: string;
  preValidate: string;
}
/** Stores additional code that needs to be added to builders depending on their type */
const buildersExtensions: { [key: string]: BuilderExtension } = {
  Callbackstate: {
    import: `import { setEndValueIfNoTransition } from '../definitions/utils';`,
    preValidate: `\r\n    setEndValueIfNoTransition(model);`,
  },
  Delaystate: {
    import: `import { setEndValueIfNoTransition } from '../definitions/utils';`,
    preValidate: `\r\n    setEndValueIfNoTransition(model);`,
  },
  Eventstate: {
    import: `import { setEndValueIfNoTransition } from '../definitions/utils';`,
    preValidate: `\r\n    setEndValueIfNoTransition(model);`,
  },
  Foreachstate: {
    import: `import { setEndValueIfNoTransition } from '../definitions/utils';`,
    preValidate: `\r\n    setEndValueIfNoTransition(model);`,
  },
  Injectstate: {
    import: `import { setEndValueIfNoTransition } from '../definitions/utils';`,
    preValidate: `\r\n    setEndValueIfNoTransition(model);`,
  },
  Operationstate: {
    import: `import { setEndValueIfNoTransition } from '../definitions/utils';`,
    preValidate: `\r\n    setEndValueIfNoTransition(model);`,
  },
  Parallelstate: {
    import: `import { setEndValueIfNoTransition } from '../definitions/utils';`,
    preValidate: `\r\n    setEndValueIfNoTransition(model);`,
  },
  Subflowstate: {
    import: `import { setEndValueIfNoTransition } from '../definitions/utils';`,
    preValidate: `\r\n    setEndValueIfNoTransition(model);`,
  },
  Defaultdef: {
    import: `import { setEndValueIfNoTransition } from '../definitions/utils';`,
    preValidate: `\r\n    setEndValueIfNoTransition(model);`,
  },
  Error: {
    import: `import { setEndValueIfNoTransition } from '../definitions/utils';`,
    preValidate: `\r\n    setEndValueIfNoTransition(model);`,
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
${extension?.import ? extension.import : ''}

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.${dataType}} data The underlying object
 * @returns {Specification.${dataType}} The validated underlying object
 */
function ${camelType}BuildingFn(data: Specification.${dataType}): (() => Specification.${dataType}) {
  return () => {
    const model = new Specification.${dataType}(data);

    ${extension?.preValidate ? extension.preValidate : ''}
    
    validate('${dataType}', model);
    return model;
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
const createIndex = async (destDir: string, classes: string[]): Promise<void> => {
  try {
    const indexCode: string =
      fileHeader +
      classes.reduce((acc, t) => acc + `export * from './${toKebabCase(toCamelCase(t)) + '-builder'}';\n`, '');
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
    await reset(destDir);
    const extractor: RegExp = /export \w* (\w*)/g;
    const definition: string = await readFile(source, 'utf-8');
    const classes: string[] = [...definition.matchAll(extractor)]
      .map(([, type]) => type)
      .filter((cl) => !types.includes(cl));
    await Promise.all(classes.map(createBuilder.bind(null, destDir)));
    createIndex(destDir, classes);
    return Promise.resolve();
  } catch (ex) {
    return Promise.reject(ex);
  }
};

const buildersDir = path.resolve(process.cwd(), 'src/lib/builders');
const definitionSrc = path.resolve(process.cwd(), 'src/lib/schema/types/workflow.ts');
generate(definitionSrc, buildersDir).then(console.log.bind(console)).catch(console.error.bind(console));
