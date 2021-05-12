import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

export function endValidator(data: Specification.End): (() => Specification.End) {
  return () => {
    const validate = validators.get('End');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`End is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function endBuilder(): Builder<Specification.End> {
  return builder<Specification.End>(endValidator);
}