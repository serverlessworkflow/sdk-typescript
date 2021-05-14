import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Injectstate} data The underlying object
 * @returns {Specification.Injectstate} The validated underlying object
 */
export function injectstateValidator(data: Specification.Injectstate): () => Specification.Injectstate {
  return () => {
    data.type = 'inject';
    const validate = validators.get('Injectstate');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Injectstate is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Injectstate`
 * @returns {Specification.Injectstate} A builder for `Specification.Injectstate`
 */
export function injectstateBuilder(): Builder<Specification.Injectstate> {
  return builder<Specification.Injectstate>(injectstateValidator);
}
