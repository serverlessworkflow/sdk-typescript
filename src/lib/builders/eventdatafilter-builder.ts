import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Eventdatafilter} data The underlying object
 * @returns {Specification.Eventdatafilter} The validated underlying object
 */
export function eventdatafilterValidator(data: Specification.Eventdatafilter): (() => Specification.Eventdatafilter) {
  return () => {
    const validate = validators.get('Eventdatafilter');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Eventdatafilter is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Eventdatafilter`
 * @returns {Specification.Eventdatafilter} A builder for `Specification.Eventdatafilter`
 */
export function eventdatafilterBuilder(): Builder<Specification.Eventdatafilter> {
  return builder<Specification.Eventdatafilter>(eventdatafilterValidator);
}