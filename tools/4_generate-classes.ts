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
import { fileHeader, inFileDisclaimer } from './consts';
import {
  classesDir,
  definitionsDir,
  getExportedDeclarations,
  normalizeKnownAllCaps,
  reset,
  toKebabCase,
} from './utils';

const { writeFile, readFile } = fsPromises;

/**
 * Returns the declaration for a class
 * @param name The name of the class
 * @param baseClass The inherited class, if any
 * @returns The declaration of the class
 */
const getObjectClassDeclaration = (name: string, baseClass?: string): string =>
  `${fileHeader}
${inFileDisclaimer}

${baseClass ? `import { _${baseClass} } from './${toKebabCase(normalizeKnownAllCaps(baseClass))}';` : 'import { Hydrator } from "../../hydrator";'}
import { Specification } from "../definitions";

class ${name} extends ${baseClass ? '_' + baseClass : `Hydrator<Specification.${name}>`} {
    constructor(model?: Partial<Specification.${name}>) {
        super(model);
    }
}

export const _${name} = ${name} as ({
    new (model?: Partial<Specification.${name}>): ${name} & Specification.${name}
});`;

/**
 * Returns the declaration for a class that behaves like an array
 * @param name The name of the class
 * @param arrayType The type parameter of the underlying array
 * @returns The declaration of the array-like class
 */
const getArrayLikeClassDeclaration = (name: string, arrayType: string): string =>
  `${fileHeader}
${inFileDisclaimer}

import { Specification } from "../definitions";

class ${name} extends Array<${arrayType}> {
  constructor(model?: Array<${arrayType}>) {
    super(...(model||[]));
    if (model != null && !Array.isArray(model)) {
      throw new Error('The provided model should be an array');
    }
    Object.setPrototypeOf(this, Object.create(${name}.prototype));
  }
}

export const _${name} = ${name}; // could be exported directly, but it makes the job of building the index more straightforward as it's consistant with "object" classes
`;

/**
 * Generates classes
 * @param definitionFile The declaration file to generate the classes from
 * @param destDir The directory to save the declaration at
 */
async function generate(definitionFile: string, destDir: string): Promise<void> {
  const definitions = await readFile(definitionFile, { encoding: 'utf-8' });
  const exportedDeclarations = getExportedDeclarations(definitions);
  const aliases = Array.from(exportedDeclarations.keys());
  await reset(destDir);
  for (const [alias, node] of exportedDeclarations) {
    const exportedType = node![0].getType();
    let classDeclaration: string = '';
    if (!exportedType.isArray()) {
      const baseClass = exportedType.getIntersectionTypes()?.[0]?.getText().replace('import("/declarations").', '');
      classDeclaration = getObjectClassDeclaration(alias, baseClass);
    } else {
      const arrayType = exportedType
        .getArrayElementTypeOrThrow()
        .getText()
        .replace('import("/declarations")', 'Specification');
      classDeclaration = getArrayLikeClassDeclaration(alias, arrayType);
    }
    const destFile = path.resolve(destDir, toKebabCase(normalizeKnownAllCaps(alias)) + '.ts');
    await writeFile(destFile, classDeclaration);
  }
  const indexSrc = `${fileHeader}
${aliases.reduce((imports, alias) => `${imports}import { _${alias} } from './${toKebabCase(normalizeKnownAllCaps(alias))}';\n`, '')}
export const Classes = {
${aliases.reduce((exports, alias) => `${exports}  ${alias}: _${alias},\n`, '')}
};`;
  const destFile = path.resolve(destDir, 'index.ts');
  await writeFile(destFile, indexSrc);
}

const definitionFile = path.resolve(definitionsDir, 'specification.ts');

generate(definitionFile, classesDir).then(console.log.bind(console)).catch(console.error.bind(console));
