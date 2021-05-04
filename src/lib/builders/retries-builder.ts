import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import Retries = ServerlessWorkflow.Retries;

export function retriesValidator(data: Retries): (() => Retries) {
  return () => {
    const validate = validators.get('Retries');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Retries is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function retriesBuilder(): Builder<Retries> {
  return builder<Retries>(retriesValidator);
}