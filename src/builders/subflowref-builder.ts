import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import Subflowref = ServerlessWorkflow.Subflowref;

export function subflowrefValidator(data: Subflowref): (() => Subflowref) {
  return () => {
    const validate = validators.get('Subflowref');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Subflowref is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function subflowrefBuilder(): Builder<Subflowref> {
  return builder<Subflowref>(subflowrefValidator);
}