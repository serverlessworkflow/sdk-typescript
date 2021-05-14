import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Produceeventdef} data The underlying object
 * @returns {Specification.Produceeventdef} The validated underlying object
 */
export function produceeventdefValidator(data: Specification.Produceeventdef): (() => Specification.Produceeventdef) {
  return () => {
    const validate = validators.get('Produceeventdef');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Produceeventdef is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Produceeventdef`
 * @returns {Specification.Produceeventdef} A builder for `Specification.Produceeventdef`
 */
export function produceeventdefBuilder(): Builder<Specification.Produceeventdef> {
  return builder<Specification.Produceeventdef>(produceeventdefValidator);
}