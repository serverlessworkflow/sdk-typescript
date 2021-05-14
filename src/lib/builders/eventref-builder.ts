import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Eventref} data The underlying object
 * @returns {Specification.Eventref} The validated underlying object
 */
export function eventrefValidator(data: Specification.Eventref): (() => Specification.Eventref) {
  return () => {
    const validate = validators.get('Eventref');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Eventref is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Eventref`
 * @returns {Specification.Eventref} A builder for `Specification.Eventref`
 */
export function eventrefBuilder(): Builder<Specification.Eventref> {
  return builder<Specification.Eventref>(eventrefValidator);
}