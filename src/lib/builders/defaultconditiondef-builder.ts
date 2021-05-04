import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import Defaultconditiondef = ServerlessWorkflow.Defaultconditiondef;

export function defaultconditiondefValidator(data: Defaultconditiondef): (() => Defaultconditiondef) {
  return () => {
    const validate = validators.get('Defaultconditiondef');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Defaultconditiondef is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function defaultconditiondefBuilder(): Builder<Defaultconditiondef> {
  return builder<Defaultconditiondef>(defaultconditiondefValidator);
}