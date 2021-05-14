import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Callbackstate} data The underlying object
 * @returns {Specification.Callbackstate} The validated underlying object
 */
export function callbackstateValidator(data: Specification.Callbackstate): () => Specification.Callbackstate {
  return () => {
    data.type = 'callback';
    const validate = validators.get('Callbackstate');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Callbackstate is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Callbackstate`
 * @returns {Specification.Callbackstate} A builder for `Specification.Callbackstate`
 */
export function callbackstateBuilder(): Builder<Specification.Callbackstate> {
  return builder<Specification.Callbackstate>(callbackstateValidator);
}
