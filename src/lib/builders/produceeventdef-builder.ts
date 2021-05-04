import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import Produceeventdef = ServerlessWorkflow.Produceeventdef;

export function produceeventdefValidator(data: Produceeventdef): (() => Produceeventdef) {
  return () => {
    const validate = validators.get('Produceeventdef');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Produceeventdef is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function produceeventdefBuilder(): Builder<Produceeventdef> {
  return builder<Produceeventdef>(produceeventdefValidator);
}