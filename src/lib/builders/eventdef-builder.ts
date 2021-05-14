import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Eventdef} data The underlying object
 * @returns {Specification.Eventdef} The validated underlying object
 */
export function eventdefValidator(data: Specification.Eventdef): (() => Specification.Eventdef) {
  return () => {
    const validate = validators.get('Eventdef');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Eventdef is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Eventdef`
 * @returns {Specification.Eventdef} A builder for `Specification.Eventdef`
 */
export function eventdefBuilder(): Builder<Specification.Eventdef> {
  return builder<Specification.Eventdef>(eventdefValidator);
}