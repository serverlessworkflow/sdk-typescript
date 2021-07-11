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
    throw Error(`Validate function not defined for type [${typeName}]`);
  };


  if (!validateFn(data)) {
    console.warn(validateFn.errors);
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
