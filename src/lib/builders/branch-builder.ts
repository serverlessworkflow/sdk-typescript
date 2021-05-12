import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

export function branchValidator(data: Specification.Branch): (() => Specification.Branch) {
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

export function branchBuilder(): Builder<Specification.Branch> {
  return builder<Specification.Branch>(branchValidator);
}