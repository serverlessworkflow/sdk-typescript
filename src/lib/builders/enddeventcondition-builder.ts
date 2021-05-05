import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import Enddeventcondition = ServerlessWorkflow.Enddeventcondition;

export function enddeventconditionValidator(data: Enddeventcondition): (() => Enddeventcondition) {
  return () => {
    const validate = validators.get('Enddeventcondition');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Enddeventcondition is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function enddeventconditionBuilder(): Builder<Enddeventcondition> {
  return builder<Enddeventcondition>(enddeventconditionValidator);
}