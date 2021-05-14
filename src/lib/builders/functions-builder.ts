import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Functions} data The underlying object
 * @returns {Specification.Functions} The validated underlying object
 */
export function functionsValidator(data: Specification.Functions): () => Specification.Functions {
  return () => {
    const validate = validators.get('Functions');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Functions is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Functions`
 * @returns {Specification.Functions} A builder for `Specification.Functions`
 */
export function functionsBuilder(): Builder<Specification.Functions> {
  return builder<Specification.Functions>(functionsValidator);
}
