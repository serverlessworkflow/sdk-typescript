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
  classesDir,
  definitionsDir,
  getExportedDeclarations,
  normalizeKnownAllCaps,
  reset,
  toKebabCase,
} from './utils';

const { writeFile, readFile } = fsPromises;

const getClassDeclaration = (className: string): string => `import { _Reflector } from "../../reflector";
import { Specification } from "../definitions";

class _${className} extends _Reflector<Specification.${className}> {
    constructor(data?: Partial<Specification.${className}>) {
        super(data);
    }
}

export const ${className} = _${className} as ({
    new (data?: Partial<Specification.${className}>): _${className} & Specification.${className}
});`;

/**
 * Generates empty classes. Used
 * @param definitionFile
 * @param destDir
 */
async function generate(definitionFile: string, destDir: string): Promise<void> {
  const definitions = await readFile(definitionFile, { encoding: 'utf-8' });
  const declarations = getExportedDeclarations(definitions);
  await reset(destDir);
  for (const declaration of declarations) {
    const classSrc = getClassDeclaration(declaration);
    const destFile = path.resolve(destDir, toKebabCase(normalizeKnownAllCaps(declaration)) + '.ts');
    await writeFile(destFile, classSrc);
  }
  const indexSrc = `${fileHeader}
${declarations.reduce((imports, declaration) => `${imports}import { ${declaration} } from './${toKebabCase(normalizeKnownAllCaps(declaration))}';\n`, '')}
export const Classes = {
  ${declarations.reduce((exports, declaration) => `${exports}  ${declaration},\n`, '')}
};`;
  const destFile = path.resolve(destDir, 'index.ts');
  await writeFile(destFile, indexSrc);
}

const definitionFile = path.resolve(definitionsDir, 'specification.ts');

generate(definitionFile, classesDir).then(console.log.bind(console)).catch(console.error.bind(console));
