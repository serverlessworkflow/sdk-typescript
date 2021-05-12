import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

export function defaultdefValidator(data: Specification.Defaultdef): (() => Specification.Defaultdef) {
  return () => {
    const validate = validators.get('Defaultdef');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Defaultdef is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function defaultdefBuilder(): Builder<Specification.Defaultdef> {
  return builder<Specification.Defaultdef>(defaultdefValidator);
}