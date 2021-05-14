import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.End} data The underlying object
 * @returns {Specification.End} The validated underlying object
 */
export function endValidator(data: Specification.End): (() => Specification.End) {
  return () => {
    const validate = validators.get('End');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`End is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.End`
 * @returns {Specification.End} A builder for `Specification.End`
 */
export function endBuilder(): Builder<Specification.End> {
  return builder<Specification.End>(endValidator);
}