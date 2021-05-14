import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Events} data The underlying object
 * @returns {Specification.Events} The validated underlying object
 */
export function eventsValidator(data: Specification.Events): () => Specification.Events {
  return () => {
    const validate = validators.get('Events');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Events is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Events`
 * @returns {Specification.Events} A builder for `Specification.Events`
 */
export function eventsBuilder(): Builder<Specification.Events> {
  return builder<Specification.Events>(eventsValidator);
}
