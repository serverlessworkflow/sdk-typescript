import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Crondef} data The underlying object
 * @returns {Specification.Crondef} The validated underlying object
 */
export function crondefValidator(data: Specification.Crondef): () => Specification.Crondef {
  return () => {
    const validate = validators.get('Crondef');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Crondef is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Crondef`
 * @returns {Specification.Crondef} A builder for `Specification.Crondef`
 */
export function crondefBuilder(): Builder<Specification.Crondef> {
  return builder<Specification.Crondef>(crondefValidator);
}
