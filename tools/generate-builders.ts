import {promises as fsPromises} from 'fs';
import * as path from 'path';
import rimraf from 'rimraf';
const {readFile, writeFile, mkdir} = fsPromises;
const rimrafP = async (f: string): Promise<void> => new Promise<void>((resolve, reject) => 
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
  String.prototype.matchAll = function(re) {
    const results: RegExpExecArray[] = [];
    let matches: RegExpExecArray | null;
    while( (matches = re.exec(this)) ) {
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
  "Callbackstate": {
    preValidate: `\r\n    data.type = 'callback';`
  },
  "Databasedswitch": {
    preValidate: `\r\n    data.type = 'switch';`
  },
  "Delaystate": {
    preValidate: `\r\n    data.type = 'delay';`
  },
  "Eventbasedswitch": {
    preValidate: `\r\n    data.type = 'switch';`
  },
  "Eventstate": {
    preValidate: `\r\n    data.type = 'event';`
  },
  "Foreachstate": {
    preValidate: `\r\n    data.type = 'foreach';`
  },
  "Injectstate": {
    preValidate: `\r\n    data.type = 'inject';`
  },
  "Operationstate": {
    preValidate: `\r\n    data.type = 'operation';`
  },
  "Parallelstate": {
    preValidate: `\r\n    data.type = 'parallel';`
  }
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
    const builderCode = `import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.${dataType}} data The underlying object
 * @returns {Specification.${dataType}} The validated underlying object
 */
export function ${camelType}Validator(data: Specification.${dataType}): (() => Specification.${dataType}) {
  return () => {${extension?.preValidate ? extension.preValidate : ''}
    const validate = validators.get('${dataType}');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(\`${dataType} is invalid: \${firstError.message}\`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type \`Specification.${dataType}\`
 * @returns {Specification.${dataType}} A builder for \`Specification.${dataType}\`
 */
export function ${camelType}Builder(): Builder<Specification.${dataType}> {
  return builder<Specification.${dataType}>(${camelType}Validator);
}`;
    const destFile = path.resolve(destDir, toKebabCase(camelType) + '-builder.ts');
    await writeFile(destFile, builderCode);
    return Promise.resolve();
  }
  catch(ex) {
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
    const indexCode: string = types.reduce((acc, t) => acc + `export * from './${toKebabCase(toCamelCase(t)) + '-builder'}';\r\n`, '');
    const indexFile = path.resolve(destDir, 'index.ts');
    await writeFile(indexFile, indexCode);
    return Promise.resolve();
  }
  catch(ex) {
    return Promise.reject(ex);
  }
}

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
    await writeFile(path.resolve(destDir, 'README.md'), `# Auto generated notice
This directory and its content has been generated automatically. Do not modify its content, it WILL be lost.`);
    const extractor: RegExp = /export \w* (\w*)/g;    
    const definition: string = await readFile(source, 'utf-8');
    const types: string[] = [...definition.matchAll(extractor)].map(([, type]) => type);
    await Promise.all(
      types.map(createBuilder.bind(null, destDir))
    );
    createIndex(destDir, types);
    return Promise.resolve();
  }
  catch(ex) {
    return Promise.reject(ex);
  }
};

const buildersDir = path.resolve(process.cwd(), 'src/lib/builders');
const definitionSrc = path.resolve(process.cwd(), 'src/lib/definitions/workflow.ts');
generate(definitionSrc, buildersDir)
  .then(console.log.bind(console))
  .catch(console.error.bind(console))
  ;