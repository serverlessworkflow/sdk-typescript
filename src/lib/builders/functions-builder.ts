import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import Functions = ServerlessWorkflow.Functions;

export function functionsValidator(data: Functions): (() => Functions) {
  return () => {
    const validate = validators.get('Functions');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Functions is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function functionsBuilder(): Builder<Functions> {
  return builder<Functions>(functionsValidator);
}