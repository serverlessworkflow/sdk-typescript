import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Foreachstate} data The underlying object
 * @returns {Specification.Foreachstate} The validated underlying object
 */
export function foreachstateValidator(data: Specification.Foreachstate): (() => Specification.Foreachstate) {
  return () => {
    data.type = 'foreach';
    const validate = validators.get('Foreachstate');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Foreachstate is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Foreachstate`
 * @returns {Specification.Foreachstate} A builder for `Specification.Foreachstate`
 */
export function foreachstateBuilder(): Builder<Specification.Foreachstate> {
  return builder<Specification.Foreachstate>(foreachstateValidator);
}