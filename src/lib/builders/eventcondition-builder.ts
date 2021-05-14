import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Eventcondition} data The underlying object
 * @returns {Specification.Eventcondition} The validated underlying object
 */
export function eventconditionValidator(data: Specification.Eventcondition): () => Specification.Eventcondition {
  return () => {
    const validate = validators.get('Eventcondition');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Eventcondition is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Eventcondition`
 * @returns {Specification.Eventcondition} A builder for `Specification.Eventcondition`
 */
export function eventconditionBuilder(): Builder<Specification.Eventcondition> {
  return builder<Specification.Eventcondition>(eventconditionValidator);
}
