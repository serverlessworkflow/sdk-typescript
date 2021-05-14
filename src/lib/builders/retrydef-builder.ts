import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Retrydef} data The underlying object
 * @returns {Specification.Retrydef} The validated underlying object
 */
export function retrydefValidator(data: Specification.Retrydef): (() => Specification.Retrydef) {
  return () => {
    const validate = validators.get('Retrydef');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Retrydef is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Retrydef`
 * @returns {Specification.Retrydef} A builder for `Specification.Retrydef`
 */
export function retrydefBuilder(): Builder<Specification.Retrydef> {
  return builder<Specification.Retrydef>(retrydefValidator);
}