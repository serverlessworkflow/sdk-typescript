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
  // TODO: ignore validation if no validator or throw ?
  if (!validateFn) return data;
  if (!validateFn(data)) {
    console.warn(validateFn.errors);
    const firstError: DefinedError = (validateFn.errors as DefinedError[])[0];
    throw new Error(
      `${typeName} is invalid: ${firstError.instancePath} | ${firstError.schemaPath} | ${firstError.message}
      data: ${data}`
    );
  }
  return true;
};
