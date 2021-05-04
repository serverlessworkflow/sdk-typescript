import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import Switchstate = ServerlessWorkflow.Switchstate;

export function switchstateValidator(data: Switchstate): (() => Switchstate) {
  return () => {
    const validate = validators.get('Switchstate');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Switchstate is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function switchstateBuilder(): Builder<Switchstate> {
  return builder<Switchstate>(switchstateValidator);
}