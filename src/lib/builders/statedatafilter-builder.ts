import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Statedatafilter} data The underlying object
 * @returns {Specification.Statedatafilter} The validated underlying object
 */
export function statedatafilterValidator(data: Specification.Statedatafilter): () => Specification.Statedatafilter {
  return () => {
    const validate = validators.get('Statedatafilter');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Statedatafilter is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Statedatafilter`
 * @returns {Specification.Statedatafilter} A builder for `Specification.Statedatafilter`
 */
export function statedatafilterBuilder(): Builder<Specification.Statedatafilter> {
  return builder<Specification.Statedatafilter>(statedatafilterValidator);
}
