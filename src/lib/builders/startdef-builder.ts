import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import Startdef = ServerlessWorkflow.Startdef;

export function startdefValidator(data: Startdef): (() => Startdef) {
  return () => {
    const validate = validators.get('Startdef');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Startdef is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function startdefBuilder(): Builder<Startdef> {
  return builder<Startdef>(startdefValidator);
}