import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import Eventcondition = ServerlessWorkflow.Eventcondition;

export function eventconditionValidator(data: Eventcondition): (() => Eventcondition) {
  return () => {
    const validate = validators.get('Eventcondition');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Eventcondition is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function eventconditionBuilder(): Builder<Eventcondition> {
  return builder<Eventcondition>(eventconditionValidator);
}