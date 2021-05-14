import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Switchstate} data The underlying object
 * @returns {Specification.Switchstate} The validated underlying object
 */
export function switchstateValidator(data: Specification.Switchstate): () => Specification.Switchstate {
  return () => {
    const validate = validators.get('Switchstate');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Switchstate is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Switchstate`
 * @returns {Specification.Switchstate} A builder for `Specification.Switchstate`
 */
export function switchstateBuilder(): Builder<Specification.Switchstate> {
  return builder<Specification.Switchstate>(switchstateValidator);
}
