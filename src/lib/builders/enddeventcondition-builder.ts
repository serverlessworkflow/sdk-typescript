import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Enddeventcondition} data The underlying object
 * @returns {Specification.Enddeventcondition} The validated underlying object
 */
export function enddeventconditionValidator(data: Specification.Enddeventcondition): (() => Specification.Enddeventcondition) {
  return () => {
    const validate = validators.get('Enddeventcondition');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Enddeventcondition is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Enddeventcondition`
 * @returns {Specification.Enddeventcondition} A builder for `Specification.Enddeventcondition`
 */
export function enddeventconditionBuilder(): Builder<Specification.Enddeventcondition> {
  return builder<Specification.Enddeventcondition>(enddeventconditionValidator);
}