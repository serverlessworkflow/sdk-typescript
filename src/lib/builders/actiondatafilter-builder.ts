import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

export function actiondatafilterValidator(data: Specification.Actiondatafilter): (() => Specification.Actiondatafilter) {
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

export function actiondatafilterBuilder(): Builder<Specification.Actiondatafilter> {
  return builder<Specification.Actiondatafilter>(actiondatafilterValidator);
}