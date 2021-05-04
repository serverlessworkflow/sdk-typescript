import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import Eventstate = ServerlessWorkflow.Eventstate;

export function eventstateValidator(data: Eventstate): (() => Eventstate) {
  return () => {
    data.type = 'event';
    const validate = validators.get('Eventstate');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Eventstate is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function eventstateBuilder(): Builder<Eventstate> {
  return builder<Eventstate>(eventstateValidator);
}