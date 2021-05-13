import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

export function functionsValidator(data: Specification.Functions): (() => Specification.Functions) {
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

export function functionsBuilder(): Builder<Specification.Functions> {
  return builder<Specification.Functions>(functionsValidator);
}