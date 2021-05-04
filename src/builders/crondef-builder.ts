import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import Crondef = ServerlessWorkflow.Crondef;

export function crondefValidator(data: Crondef): (() => Crondef) {
  return () => {
    const validate = validators.get('Crondef');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Crondef is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function crondefBuilder(): Builder<Crondef> {
  return builder<Crondef>(crondefValidator);
}