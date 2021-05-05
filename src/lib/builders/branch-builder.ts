import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import Branch = ServerlessWorkflow.Branch;

export function branchValidator(data: Branch): (() => Branch) {
  return () => {
    const validate = validators.get('Branch');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Branch is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function branchBuilder(): Builder<Branch> {
  return builder<Branch>(branchValidator);
}