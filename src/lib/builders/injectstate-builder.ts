import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import Injectstate = ServerlessWorkflow.Injectstate;

export function injectstateValidator(data: Injectstate): (() => Injectstate) {
  return () => {
    data.type = 'inject';
    const validate = validators.get('Injectstate');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Injectstate is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function injectstateBuilder(): Builder<Injectstate> {
  return builder<Injectstate>(injectstateValidator);
}