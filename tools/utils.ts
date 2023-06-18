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

import $RefParser from '@apidevtools/json-schema-ref-parser';
import { promises as fsPromises } from 'fs';
import * as path from 'path';
import rimraf from 'rimraf';
import { readMeDisclaimer } from './consts';
import {URL} from "url";
import yargs from "yargs";
import {schemaVersion} from "../package.json";

const { writeFile, mkdir } = fsPromises;

/**
 * Wraps rimraf into a Promise
 * @param f {string} The target to be deleted
 * @returns {void}
 */
export const rimrafP = async (f: string): Promise<void> =>
  new Promise<void>((resolve, reject) =>
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
export const capitalizeFirstLetter = (value: string): string => {
  if (!value) return '';
  const transformable = value.trim();
  return transformable[0].toUpperCase() + transformable.slice(1);
};

/**
 * Tells if the provided objects hold a reference to another definition
 * @param {any} obj The object to test
 * @returns {boolean} Returns true if the object holds a reference to another schema
 */
export const isRef = (obj: any): boolean => obj && obj.$ref && typeof obj.$ref === typeof '';

/**
 * Tells if the provided object holds an external reference
 * @param {any} obj  The object to test
 * @returns {boolean} Returns true if the reference hold by the object is external
 */
export const isRefExernal = (obj: any): boolean => obj && obj.$ref && !obj.$ref.startsWith('#');

/**
 * Gets the property name (key) in the root schema definitions for the provided ref. Used to avoid key collision
 * @param {string} $ref The reference path
 * @param {Map<string, string>} known$Refs The know references map
 * @returns {string} The corrected property name
 */
export const getPropName = ($ref: string, known$Refs: Map<string, string>): string => {
  const baseName = $ref.split('/').slice(-1)[0];
  let propName = baseName;
  let variantIndex = 0;
  while (known$Refs.has(propName) && known$Refs.get(propName) !== $ref) {
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
export const mergeDefinitions = async (
  $refParser: $RefParser,
  paths: string[],
  known$Refs: Map<string, string>,
  parentPaths: string[] = []
): Promise<void> => {
  try {
    if (!parentPaths?.length) {
      Object.keys($refParser.schema.definitions || {}).forEach((key: string) => {
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
        Object.entries(schema.definitions || {}).forEach(([key, value]) => {
          const propName = getPropName(key, known$Refs);
          known$Refs.set(propName, `${fileName}#/definitions/${key}`);
          $refParser.$refs.set(`#/definitions/${propName}`, value);
        });
        const $schemaRefs = await $RefParser.resolve(schemaPath);
        const otherPaths = $schemaRefs.paths().filter((p) => !parentPaths.includes(p));
        otherPaths.forEach((p) => parentPaths.push(p));
        await mergeDefinitions($refParser, otherPaths, known$Refs, parentPaths);
      })
    );
  } catch (ex) {
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
export const mergeSchemas = (
  $refParser: $RefParser,
  known$Refs: Map<string, string>,
  target: any,
  target$Ref: string
): void => {
  const isRootDocument = target$Ref.startsWith('#');
  // todo ? handle circular refs ?
  Object.entries(target)
    .filter(([, value]: [string, any]) => value && typeof value === typeof {} && !ArrayBuffer.isView(value))
    .forEach(([key, value]: [string, any]) => {
      if (!isRef(value) || (isRootDocument && !isRefExernal(value))) {
        const newTargetRef = `${target$Ref.endsWith('/') ? target$Ref : target$Ref + '/'}${key}/`;
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
      } else if (!isRootDocument) {
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

/** Resets the destination directory, recursively deletes everything and adds the README */
export const reset = async (destDir: string) =>
  rimrafP(destDir)
    .then(() => mkdir(destDir, { recursive: true }))
    .then(() => writeFile(path.resolve(destDir, 'README.md'), readMeDisclaimer));


/** Schemas directory */
export const schemaDir = path.resolve(process.cwd(), 'src/lib/schema');


/** The URL to download the schema from */
export const schemaUrl: URL = new URL(
    (yargs(process.argv.slice(2)).argv.url as string) ||
    `https://raw.githubusercontent.com/serverlessworkflow/specification/${schemaVersion}.x/schema/workflow.json`
);
