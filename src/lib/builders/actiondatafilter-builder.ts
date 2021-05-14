import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Actiondatafilter} data The underlying object
 * @returns {Specification.Actiondatafilter} The validated underlying object
 */
export function actiondatafilterValidator(data: Specification.Actiondatafilter): () => Specification.Actiondatafilter {
  return () => {
    const validate = validators.get('Actiondatafilter');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Actiondatafilter is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Actiondatafilter`
 * @returns {Specification.Actiondatafilter} A builder for `Specification.Actiondatafilter`
 */
export function actiondatafilterBuilder(): Builder<Specification.Actiondatafilter> {
  return builder<Specification.Actiondatafilter>(actiondatafilterValidator);
}
