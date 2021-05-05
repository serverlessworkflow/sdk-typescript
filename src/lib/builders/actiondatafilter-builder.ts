import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import Actiondatafilter = ServerlessWorkflow.Actiondatafilter;

export function actiondatafilterValidator(data: Actiondatafilter): (() => Actiondatafilter) {
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

export function actiondatafilterBuilder(): Builder<Actiondatafilter> {
  return builder<Actiondatafilter>(actiondatafilterValidator);
}