import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Transitiondatacondition} data The underlying object
 * @returns {Specification.Transitiondatacondition} The validated underlying object
 */
export function transitiondataconditionValidator(data: Specification.Transitiondatacondition): (() => Specification.Transitiondatacondition) {
  return () => {
    const validate = validators.get('Transitiondatacondition');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Transitiondatacondition is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Transitiondatacondition`
 * @returns {Specification.Transitiondatacondition} A builder for `Specification.Transitiondatacondition`
 */
export function transitiondataconditionBuilder(): Builder<Specification.Transitiondatacondition> {
  return builder<Specification.Transitiondatacondition>(transitiondataconditionValidator);
}