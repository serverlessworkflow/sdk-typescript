import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import Exectimeout = ServerlessWorkflow.Exectimeout;

export function exectimeoutValidator(data: Exectimeout): (() => Exectimeout) {
  return () => {
    const validate = validators.get('Exectimeout');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Exectimeout is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function exectimeoutBuilder(): Builder<Exectimeout> {
  return builder<Exectimeout>(exectimeoutValidator);
}