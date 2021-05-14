import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Datacondition} data The underlying object
 * @returns {Specification.Datacondition} The validated underlying object
 */
export function dataconditionValidator(data: Specification.Datacondition): () => Specification.Datacondition {
  return () => {
    const validate = validators.get('Datacondition');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Datacondition is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Datacondition`
 * @returns {Specification.Datacondition} A builder for `Specification.Datacondition`
 */
export function dataconditionBuilder(): Builder<Specification.Datacondition> {
  return builder<Specification.Datacondition>(dataconditionValidator);
}
