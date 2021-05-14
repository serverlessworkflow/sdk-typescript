import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Schedule} data The underlying object
 * @returns {Specification.Schedule} The validated underlying object
 */
export function scheduleValidator(data: Specification.Schedule): () => Specification.Schedule {
  return () => {
    const validate = validators.get('Schedule');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Schedule is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Schedule`
 * @returns {Specification.Schedule} A builder for `Specification.Schedule`
 */
export function scheduleBuilder(): Builder<Specification.Schedule> {
  return builder<Specification.Schedule>(scheduleValidator);
}
