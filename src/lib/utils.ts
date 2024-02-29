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
import { DefinedError, ValidateFunction } from 'ajv';
import { validators } from './validators';

/**
 * Validates the provided data or throws an error
 * @param typeName {string} The data type to validate
 * @param data {object} The data to validate
 * @returns {boolean} True if valid, throws if invalid
 */
export const validate = (typeName: string, data: any): boolean => {
  const validateFn: ValidateFunction | undefined = validators.get(typeName);

  if (!validateFn) {
    throw Error(`Validate function not defined for type '${typeName}'`);
  }

  if (!validateFn(JSON.parse(JSON.stringify(data)))) {
    const firstError: DefinedError = (validateFn.errors as DefinedError[])[0];
    throw new Error(
      `${typeName} is invalid: ${firstError.instancePath} | ${firstError.schemaPath} | ${firstError.message}
      data: ${JSON.stringify(data, null, 4)}`
    );
  }
  return true;
};

/**
 * Determine if the provided value is an object or a primitive type
 * @param value The data
 * @returns {boolean} True if the provided value is an object
 */
export const isObject = (value: any): boolean => {
  if (!value) return false;
  const type = typeof value;
  return type === 'object';
};

/**
 * Represents the options used to convert string to pascal case or camel case
 */
export interface CaseConvertionOptions {
  /** Keep dashes (-) characters */
  keepDashes: boolean;
  /** Capitalize after dashes (-) characters, if kept */
  capitalizeAfterDashes: boolean;
  /** Keep underscores (_) characters */
  keepUnderscores: boolean;
  /** Capitalize after underscores (_) characters, if kept */
  capitalizeAfterUnderscores: boolean;
  /** Keep dots (.) characters */
  keepDots: boolean;
  /** Capitalize after dots (.) characters, if kept */
  capitalizeAfterDots: boolean;
}

/**
 * Holds default convertion options
 */
export const defaultConvertionOptions = {
  keepDashes: false,
  capitalizeAfterDashes: false,
  keepUnderscores: false,
  capitalizeAfterUnderscores: false,
  keepDots: true,
  capitalizeAfterDots: true,
} as CaseConvertionOptions;

/**
 * Converts a string to pascal case (PascalCase)
 * @param source string The string to convert to pascal case
 * @param convertionOptions CaseConvertionOptions Defaults: keepDashes: false, capitalizeAfterDashes: false, keepUnderscores: false, capitalizeAfterUnderscores: false, keepDots: true, capitalizeAfterDots: true
 * @returns string The pascal case string
 */
export const pascalCase = (
  source: string,
  convertionOptions: CaseConvertionOptions = defaultConvertionOptions
): string => {
  if (!source) return '';
  let delimiter = '';
  if (!convertionOptions.keepDashes) {
    source = source.replace(/-+/g, ' ');
  } else if (convertionOptions.capitalizeAfterDashes) {
    delimiter += '-';
  }
  if (!convertionOptions.keepUnderscores) {
    source = source.replace(/_+/g, ' ');
  } else if (convertionOptions.capitalizeAfterUnderscores) {
    delimiter += '_';
  }
  if (!convertionOptions.keepDots) {
    source = source.replace(/\.+/g, ' ');
  } else if (convertionOptions.capitalizeAfterDots) {
    delimiter += '\\.';
  }
  if (delimiter) {
    source = source.replace(
      new RegExp('([' + delimiter + '])+(.)(\\w+)', 'g'),
      ($1, $2, $3, $4) => `${$2}${$3.toUpperCase()}${$4.toLowerCase()}`
    );
  }
  return source
    .replace(/\s+(.)(\w+)/g, ($1, $2, $3) => `${$2.toUpperCase()}${$3.toLowerCase()}`)
    .replace(/\s/g, '')
    .replace(/\w/, (s) => s.toUpperCase());
};

/**
 * Converts a PasalCase/camelCase string into a human readable string
 * @param source string The string to convert
 * @param keepCapitalLetters boolean If capital letters should be kept
 * @returns string The converted string
 */
export const humanCase = (source: string, keepCapitalLetters: boolean = false): string => {
  if (!source) return '';
  let transformable = source.trim();
  transformable =
    transformable[0].toUpperCase() +
    transformable
      .slice(1)
      .replace(/([A-Z])/g, ' $1')
      .replace(/\s+/g, ' ');
  if (keepCapitalLetters) {
    return transformable;
  } else {
    return transformable.toLowerCase();
  }
};
