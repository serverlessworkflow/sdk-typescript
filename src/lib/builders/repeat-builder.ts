import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

export function repeatValidator(data: Specification.Repeat): (() => Specification.Repeat) {
  return () => {
    const validate = validators.get('Repeat');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Repeat is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function repeatBuilder(): Builder<Specification.Repeat> {
  return builder<Specification.Repeat>(repeatValidator);
}