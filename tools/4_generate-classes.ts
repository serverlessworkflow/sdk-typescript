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
import { classesDir, definitionsDir, normalizeKnownAllCaps, reset, toKebabCase } from './utils';
import {
  getArrayHydration,
  getExportedDeclarations,
  getObjectHydration,
  getTypeName,
  getUnderlyingTypes,
} from './reflection';
import { Node, Type } from 'ts-morph';

const { writeFile, readFile } = fsPromises;

/**
 * Returns the declaration for a class
 * @param name The name of the class
 * @param baseClass The inherited class, if any
 * @returns The declaration of the class
 */
function getObjectClassDeclaration(name: string, node: Node, type: Type, baseClass?: string): string {
  const hydrationResult = getObjectHydration(node, type);
  return `${fileHeader}
${inFileDisclaimer}

${hydrationResult.imports.map((type) => `import { _${type} } from './${toKebabCase(normalizeKnownAllCaps(type))}';`).join('\n')}
${baseClass ? `import { _${baseClass} } from './${toKebabCase(normalizeKnownAllCaps(baseClass))}';` : "import { ObjectHydrator } from '../../hydrator';"}
import { Specification } from '../definitions';
import { getLifecycleHook } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { deepCopy${hydrationResult.code ? ', isObject' : ''} } from '../../utils';

class ${name} extends ${baseClass ? '_' + baseClass : `ObjectHydrator<Specification.${name}>`} {
  constructor(model?: Partial<Specification.${name}>) {
    super(model);
    ${
      hydrationResult.code
        ? `const self = (this as unknown) as Specification.${name} & object;
      if (isObject(model)) {
        ${hydrationResult.code}
      }`
        : ''
    }
    getLifecycleHook('${name}')?.constructor?.(this);
  }
  
  validate() {
    const copy = new ${name}(this as any) as ${name} & Specification.${name};
    getLifecycleHook('${name}')?.preValidation?.(copy);
    validate('${name}', deepCopy(copy)); // deepCopy prevents potential additional properties error for constructor, validate, normalize
    getLifecycleHook('${name}')?.postValidation?.(copy);
  }
  
  normalize(): ${name} & Specification.${name} {
    const copy = new ${name}(this as any) as ${name} & Specification.${name};
    return getLifecycleHook('${name}')?.normalize?.(copy) || copy;
  }
}

export const _${name} = ${name} as ({
    new (model?: Partial<Specification.${name}>): ${name} & Specification.${name}
});`;
}

/**
 * Returns the declaration for a class that behaves like an array
 * @param name The name of the class
 * @param arrayTypeName The type parameter of the underlying array
 * @returns The declaration of the array-like class
 */
function getArrayLikeClassDeclaration(name: string, arrayTypeName: string, type: Type): string {
  const hydrationResult = getArrayHydration(type);
  return `${fileHeader}
${inFileDisclaimer}

${hydrationResult.imports.map((type) => `import { _${type} } from './${toKebabCase(normalizeKnownAllCaps(type))}';`)}
import { Specification } from '../definitions';
import { ArrayHydrator } from '../../hydrator';
import { getLifecycleHook } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { deepCopy } from '../../utils';

class ${name} extends ArrayHydrator<${arrayTypeName}> {
  constructor(model?: Array<${arrayTypeName}> | number) {
    super(model);
    if (Array.isArray(model)) {
      ${hydrationResult.code}
    }
    Object.setPrototypeOf(this, Object.create(${name}.prototype));
    getLifecycleHook('${name}')?.constructor?.(this);
  }

  validate() {
    const copy = new ${name}(this);
    getLifecycleHook('${name}')?.preValidation?.(copy);
    validate('${name}', deepCopy(copy)); // deepCopy prevents potential additional properties error for constructor, validate, normalize
    getLifecycleHook('${name}')?.postValidation?.(copy);
  }
  
  normalize(): ${name} {
    const copy = new ${name}(this);
    return getLifecycleHook('${name}')?.normalize?.(copy) || copy;
  }
}

export const _${name} = ${name}; // could be exported directly, but it makes the job of building the index more straightforward as it's consistant with "object" classes
`;
}

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
    if (!exportedType.isArray() && !exportedType.isTuple()) {
      const baseClass = exportedType.getIntersectionTypes()?.[0];
      const baseClassName = baseClass ? getTypeName(baseClass) : undefined;
      classDeclaration = getObjectClassDeclaration(alias, node![0], exportedType, baseClassName);
    } else {
      const arrayType = getTypeName(
        exportedType.getArrayElementType() || getUnderlyingTypes(exportedType)[0],
        'Specification.',
      );
      classDeclaration = getArrayLikeClassDeclaration(alias, arrayType, exportedType);
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
