import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import Eventdatafilter = ServerlessWorkflow.Eventdatafilter;

export function eventdatafilterValidator(data: Eventdatafilter): (() => Eventdatafilter) {
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

export function eventdatafilterBuilder(): Builder<Eventdatafilter> {
  return builder<Eventdatafilter>(eventdatafilterValidator);
}