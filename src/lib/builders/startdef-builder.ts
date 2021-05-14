import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Startdef} data The underlying object
 * @returns {Specification.Startdef} The validated underlying object
 */
export function startdefValidator(data: Specification.Startdef): () => Specification.Startdef {
  return () => {
    const validate = validators.get('Startdef');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Startdef is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Startdef`
 * @returns {Specification.Startdef} A builder for `Specification.Startdef`
 */
export function startdefBuilder(): Builder<Specification.Startdef> {
  return builder<Specification.Startdef>(startdefValidator);
}
