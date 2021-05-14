import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Eventstate} data The underlying object
 * @returns {Specification.Eventstate} The validated underlying object
 */
export function eventstateValidator(data: Specification.Eventstate): (() => Specification.Eventstate) {
  return () => {
    data.type = 'event';
    const validate = validators.get('Eventstate');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Eventstate is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Eventstate`
 * @returns {Specification.Eventstate} A builder for `Specification.Eventstate`
 */
export function eventstateBuilder(): Builder<Specification.Eventstate> {
  return builder<Specification.Eventstate>(eventstateValidator);
}