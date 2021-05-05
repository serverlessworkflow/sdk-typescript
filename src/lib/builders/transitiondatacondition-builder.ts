import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import Transitiondatacondition = ServerlessWorkflow.Transitiondatacondition;

export function transitiondataconditionValidator(data: Transitiondatacondition): (() => Transitiondatacondition) {
  return () => {
    const validate = validators.get('Transitiondatacondition');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Transitiondatacondition is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function transitiondataconditionBuilder(): Builder<Transitiondatacondition> {
  return builder<Transitiondatacondition>(transitiondataconditionValidator);
}