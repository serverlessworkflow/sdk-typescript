import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Transitioneventcondition} data The underlying object
 * @returns {Specification.Transitioneventcondition} The validated underlying object
 */
export function transitioneventconditionValidator(data: Specification.Transitioneventcondition): (() => Specification.Transitioneventcondition) {
  return () => {
    const validate = validators.get('Transitioneventcondition');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Transitioneventcondition is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Transitioneventcondition`
 * @returns {Specification.Transitioneventcondition} A builder for `Specification.Transitioneventcondition`
 */
export function transitioneventconditionBuilder(): Builder<Specification.Transitioneventcondition> {
  return builder<Specification.Transitioneventcondition>(transitioneventconditionValidator);
}