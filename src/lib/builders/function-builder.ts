import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

export function functionValidator(data: Specification.Function): (() => Specification.Function) {
  return () => {
    const validate = validators.get('Function');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Function is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function functionBuilder(): Builder<Specification.Function> {
  return builder<Specification.Function>(functionValidator);
}