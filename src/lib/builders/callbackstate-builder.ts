import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import Callbackstate = ServerlessWorkflow.Callbackstate;

export function callbackstateValidator(data: Callbackstate): (() => Callbackstate) {
  return () => {
    data.type = 'callback';
    const validate = validators.get('Callbackstate');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Callbackstate is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function callbackstateBuilder(): Builder<Callbackstate> {
  return builder<Callbackstate>(callbackstateValidator);
}