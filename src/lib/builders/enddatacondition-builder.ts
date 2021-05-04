import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import Enddatacondition = ServerlessWorkflow.Enddatacondition;

export function enddataconditionValidator(data: Enddatacondition): (() => Enddatacondition) {
  return () => {
    const validate = validators.get('Enddatacondition');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Enddatacondition is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function enddataconditionBuilder(): Builder<Enddatacondition> {
  return builder<Enddatacondition>(enddataconditionValidator);
}