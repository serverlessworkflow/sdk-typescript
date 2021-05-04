import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import Eventref = ServerlessWorkflow.Eventref;

export function eventrefValidator(data: Eventref): (() => Eventref) {
  return () => {
    const validate = validators.get('Eventref');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Eventref is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function eventrefBuilder(): Builder<Eventref> {
  return builder<Eventref>(eventrefValidator);
}