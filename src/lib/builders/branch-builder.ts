import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Branch} data The underlying object
 * @returns {Specification.Branch} The validated underlying object
 */
export function branchValidator(data: Specification.Branch): (() => Specification.Branch) {
  return () => {
    const validate = validators.get('Branch');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Branch is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Branch`
 * @returns {Specification.Branch} A builder for `Specification.Branch`
 */
export function branchBuilder(): Builder<Specification.Branch> {
  return builder<Specification.Branch>(branchValidator);
}