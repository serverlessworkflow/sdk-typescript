import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

export function statedatafilterValidator(data: Specification.Statedatafilter): (() => Specification.Statedatafilter) {
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

export function statedatafilterBuilder(): Builder<Specification.Statedatafilter> {
  return builder<Specification.Statedatafilter>(statedatafilterValidator);
}