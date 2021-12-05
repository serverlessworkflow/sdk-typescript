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
