import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import Defaultdef = ServerlessWorkflow.Defaultdef;

export function defaultdefValidator(data: Defaultdef): (() => Defaultdef) {
  return () => {
    const validate = validators.get('Defaultdef');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Defaultdef is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function defaultdefBuilder(): Builder<Defaultdef> {
  return builder<Defaultdef>(defaultdefValidator);
}