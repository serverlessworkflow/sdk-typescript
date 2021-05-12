import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

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

export function eventdatafilterBuilder(): Builder<Specification.Eventdatafilter> {
  return builder<Specification.Eventdatafilter>(eventdatafilterValidator);
}