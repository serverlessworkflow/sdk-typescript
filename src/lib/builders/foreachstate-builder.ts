import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import Foreachstate = ServerlessWorkflow.Foreachstate;

export function foreachstateValidator(data: Foreachstate): (() => Foreachstate) {
  return () => {
    data.type = 'foreach';
    const validate = validators.get('Foreachstate');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Foreachstate is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function foreachstateBuilder(): Builder<Foreachstate> {
  return builder<Foreachstate>(foreachstateValidator);
}