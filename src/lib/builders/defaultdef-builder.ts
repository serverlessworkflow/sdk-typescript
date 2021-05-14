import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Defaultdef} data The underlying object
 * @returns {Specification.Defaultdef} The validated underlying object
 */
export function defaultdefValidator(data: Specification.Defaultdef): (() => Specification.Defaultdef) {
  return () => {
    const validate = validators.get('Defaultdef');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Defaultdef is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Defaultdef`
 * @returns {Specification.Defaultdef} A builder for `Specification.Defaultdef`
 */
export function defaultdefBuilder(): Builder<Specification.Defaultdef> {
  return builder<Specification.Defaultdef>(defaultdefValidator);
}