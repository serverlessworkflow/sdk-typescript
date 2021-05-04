import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import End = ServerlessWorkflow.End;

export function endValidator(data: End): (() => End) {
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

export function endBuilder(): Builder<End> {
  return builder<End>(endValidator);
}