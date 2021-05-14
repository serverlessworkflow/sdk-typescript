import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Repeat} data The underlying object
 * @returns {Specification.Repeat} The validated underlying object
 */
export function repeatValidator(data: Specification.Repeat): () => Specification.Repeat {
  return () => {
    const validate = validators.get('Repeat');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Repeat is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Repeat`
 * @returns {Specification.Repeat} A builder for `Specification.Repeat`
 */
export function repeatBuilder(): Builder<Specification.Repeat> {
  return builder<Specification.Repeat>(repeatValidator);
}
