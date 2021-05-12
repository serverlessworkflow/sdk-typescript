import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

export function errorValidator(data: Specification.Error): (() => Specification.Error) {
  return () => {
    const validate = validators.get('Error');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Error is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function errorBuilder(): Builder<Specification.Error> {
  return builder<Specification.Error>(errorValidator);
}