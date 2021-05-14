import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Retries} data The underlying object
 * @returns {Specification.Retries} The validated underlying object
 */
export function retriesValidator(data: Specification.Retries): (() => Specification.Retries) {
  return () => {
    const validate = validators.get('Retries');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Retries is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Retries`
 * @returns {Specification.Retries} A builder for `Specification.Retries`
 */
export function retriesBuilder(): Builder<Specification.Retries> {
  return builder<Specification.Retries>(retriesValidator);
}