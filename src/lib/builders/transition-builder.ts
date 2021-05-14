import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Transition} data The underlying object
 * @returns {Specification.Transition} The validated underlying object
 */
export function transitionValidator(data: Specification.Transition): (() => Specification.Transition) {
  return () => {
    const validate = validators.get('Transition');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Transition is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Transition`
 * @returns {Specification.Transition} A builder for `Specification.Transition`
 */
export function transitionBuilder(): Builder<Specification.Transition> {
  return builder<Specification.Transition>(transitionValidator);
}