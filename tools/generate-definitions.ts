import $RefParser from "@apidevtools/json-schema-ref-parser";
import dtsGenerator, { JsonSchema as dtsGeneratorJsonSchema, parseSchema } from 'dtsgenerator';
import {promises as fsPromises} from 'fs';
import * as path from 'path';
import rimraf from 'rimraf';
const {writeFile, mkdir} = fsPromises;
const rimrafP = async (f: string): Promise<void> => new Promise<void>((resolve, reject) => 
  rimraf(f, (err) => {
    if (err) return reject(err);
    resolve();
  })
);
/**
 * Capitalized the first letter of the provided string
 * @param {} value The string to capitalize
 * @returns {string} The capitalized string
 */
const capitalizeFirstLetter = (value: string):string => {
  if (!value) return '';
  const transformable = value.trim();
  return transformable[0].toUpperCase() + transformable.slice(1);
};
/**
 * Tells if the provided objects hold a reference to another definition
 * @param {any} obj The object to test
 * @returns {boolean} Returns true if the object holds a reference to another schema
 */
const isRef = (obj: any): boolean => obj && obj.$ref && typeof obj.$ref === typeof '';
/**
 * Tells if the provided object holds an external reference
 * @param {any} obj  The object to test
 * @returns {boolean} Returns true if the reference hold by the object is external
 */
const isRefExernal = (obj: any): boolean => obj && obj.$ref && !obj.$ref.startsWith('#');
/**
 * Gets the property name (key) in the root schema definitions for the provided ref. Used to avoid key collision
 * @param {string} $ref The reference path
 * @param {Map<string, string>} known$Refs The know references map
 * @returns {string} The corrected property name
 */
const getPropName = ($ref: string, known$Refs:  Map<string, string>): string => {
  const baseName = $ref.split('/').slice(-1)[0];
  let propName = baseName;
  let variantIndex = 0;
  while(true) {
    if (!known$Refs.has(propName)) {
      break;
    }
    if (known$Refs.get(propName) === $ref) {
      break;
    }
    variantIndex++;
    propName = baseName + variantIndex;
  }
  return propName;
};

/**
 * Merges the definitions founds in the schemas in path into the root schema's definitions
 * @param {$RefParser} $refParser The $RefParser instance of the root schema
 * @param {string[]} paths The path to the schemas containing definitions to merge
 * @param {Map<string, string>} known$Refs The know references map
 * @param {string[]} parentPaths (internal) The previously known paths
 */
const mergeDefinitions = async ($refParser: $RefParser, paths: string[], known$Refs: Map<string, string>, parentPaths: string[] = []): Promise<void> => {
  try {
    if (!parentPaths?.length) {
      Object.keys($refParser.schema.definitions||{}).forEach((key: string) => {
        if (!known$Refs.has(key)) {
          known$Refs.set(key, `#/definitions/${key}`);
        }
      });
      parentPaths = paths;
    }
    await Promise.all(
      paths.map(async (schemaPath: string) => {
        const fileName = path.basename(schemaPath);
        const schema = await $RefParser.parse(schemaPath);
        Object.entries(schema.definitions||{}).forEach(([key, value]) => {
          const propName = getPropName(key, known$Refs);
          known$Refs.set(propName, `${fileName}#/definitions/${key}`);
          $refParser.$refs.set(`#/definitions/${propName}`, value);
        });
        const $schemaRefs = await $RefParser.resolve(schemaPath);
        const otherPaths = $schemaRefs.paths().filter(p => !parentPaths.includes(p));
        otherPaths.forEach(p => parentPaths.push(p));
        await mergeDefinitions($refParser, otherPaths, known$Refs, parentPaths);
      })
    );
  }
  catch(ex) {
    return Promise.reject(ex);
  }
};

/**
 * Merges external schemas references into the root schema definitions
 * @param {$RefParser} $refParser The $RefParser instance of the root schema
 * @param {Map<string, string>} known$Refs The know references map
 * @param {any} target The object to crawl for references
 * @param {string} target$Ref The provided target reference path
 */
const mergeSchemas = ($refParser: $RefParser, known$Refs: Map<string, string>, target: any, target$Ref: string): void => {
  const isRootDocument = target$Ref.startsWith('#');
  // todo ? handle circular refs ?
  Object.entries(target)
    .filter(([key, value]: [string, any]) => value && typeof value === typeof {} && !ArrayBuffer.isView(value))
    .forEach(([key, value]: [string, any]) => {
      if (!isRef(value) || (isRootDocument && !isRefExernal(value))) {
        let newTargetRef = `${target$Ref.endsWith('/') ? target$Ref : target$Ref + '/'}${key}/`;
        mergeSchemas($refParser, known$Refs, value, newTargetRef);
        return;
      }
      if (isRefExernal(value)) {
        const propName = getPropName(value.$ref, known$Refs);
        if (known$Refs.has(propName)) {
          value.$ref = `#/definitions/${propName}`;
          return;
        }
        const referencedSchema = $refParser.$refs.get(value.$ref);
        mergeSchemas($refParser, known$Refs, referencedSchema, value.$ref);
        known$Refs.set(propName, value.$ref);
        value.$ref = `#/definitions/${propName}`;
        $refParser.$refs.set(`#/definitions/${propName}`, referencedSchema);
      }
      else if (!isRootDocument) {
        const document = target$Ref.split('#')[0];
        const relative$Ref = document + value.$ref;
        const propName = getPropName(relative$Ref, known$Refs);
        if (known$Refs.has(propName)) {
          value.$ref = `#/definitions/${propName}`;
          return;
        }
        const referencedSchema = $refParser.$refs.get(relative$Ref);
        mergeSchemas($refParser, known$Refs, referencedSchema, relative$Ref);
        known$Refs.set(propName, relative$Ref);
        value.$ref = `#/definitions/${propName}`;
        $refParser.$refs.set(`#/definitions/${propName}`, referencedSchema);
      }
    });
};

/**
 * Creates the type->path map for the ajv validators
 * @param {string} dest The output path
 * @param {Map<string, string>} known$Refs The know references map
 * @returns {void}
 */
const createValidatorsPaths = async (dest: string, known$Refs: Map<string, string>, baseUrl: string): Promise<void> => {
  try {
    const validatorsPathsCode = `/**
* A map of type names and their corresponding schema
*/
export const validatorsPaths: [string, string][] = [
  ['Workflow', '${baseUrl}/workflow.json'],
${Array.from(known$Refs).map(([dataType, path]) => `  ['${capitalizeFirstLetter(dataType)}', '${baseUrl}/${path.includes('.json') ? path : 'workflow.json' + path}'],`).join('\r\n')}
]`;
    const destDir = path.dirname(dest);
    await rimrafP(destDir);
    await mkdir(destDir, { recursive: true });
    await writeFile(path.resolve(destDir, 'README.md'), `# Auto generated notice
This directory and its content has been generated automatically. Do not modify its content, it WILL be lost.`);
    await writeFile(dest, validatorsPathsCode);
  }
  catch(ex) {
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
    const paths = [ ...$refParser.$refs.paths(), ...additionnalSchemas ].filter((p, index, arr) => arr.indexOf(p) === index && p !== source);
    await mergeDefinitions($refParser, paths, known$Refs);
    mergeSchemas($refParser, known$Refs, $refParser.schema, '#/');
    let generatedTS = (await dtsGenerator({
        contents: [parseSchema($refParser.schema as dtsGeneratorJsonSchema)],
        config: {
          plugins: {
            "@dtsgenerator/replace-namespace": {
              map: [
                {
                  from: ["ServerlessworkflowOrg", "Core", true, "WorkflowJson"],
                  to: ["ServerlessWorkflow"]
                },
                {
                  from: ["ServerlessworkflowOrg", "Core", true, "WorkflowJson", "Definitions"],
                  to: ["ServerlessWorkflow"]
                },
                {
                  from: ["ServerlessworkflowOrg", "Core", true, "Definitions"],
                  to: ["ServerlessWorkflow"]
                }
            ]
            }
          }
        }
      }))
      .replace(/WorkflowJson\.Definitions\./g, '')
      .replace(/WorkflowJson/g, 'Workflow')
      ;
    const lines = generatedTS.split('\n');
    generatedTS = lines.slice(1, lines.length - 2).join('\n'); // removes 'declare namespace' and keeps 'exports'.
    const destDir = path.dirname(dest);
    await rimrafP(destDir);
    await mkdir(destDir, { recursive: true });
    await writeFile(path.resolve(destDir, 'README.md'), `# Auto generated notice
This directory and its content has been generated automatically. Do not modify its content, it WILL be lost.`);
    await writeFile(dest, generatedTS);
    await writeFile(path.resolve(destDir, 'index.ts'), "export * as Specification from './workflow';");
    const validatorsDest = path.resolve(path.dirname(dest), '../validation/validators-paths.ts');
    const $id = $refParser.schema.$id;
    const baseUrl = path.dirname($id);
    await createValidatorsPaths(validatorsDest, known$Refs, baseUrl);
    return Promise.resolve();
  }
  catch (ex) {
    return Promise.reject(ex);
  }
};

const srcFile = path.resolve(process.cwd(), 'src/lib/schema/workflow.json');
const destFile = 'src/lib/definitions/workflow.ts';
/*
const additionnalSchemas = [
  path.resolve(process.cwd(), 'src/lib/schema/common.json'), // should be resolved already, no need to add it manually
  path.resolve(process.cwd(), 'src/lib/schema/extensions/kpi.json'), // not linked by workflow, manually added
];
generate(srcFile, destFile, additionnalSchemas)
*/
generate(srcFile, destFile)
  .then(console.log.bind(console))
  .catch(console.error.bind(console))
  ;
