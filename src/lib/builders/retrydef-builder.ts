import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import Retrydef = ServerlessWorkflow.Retrydef;

export function retrydefValidator(data: Retrydef): (() => Retrydef) {
  return () => {
    const validate = validators.get('Retrydef');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Retrydef is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function retrydefBuilder(): Builder<Retrydef> {
  return builder<Retrydef>(retrydefValidator);
}