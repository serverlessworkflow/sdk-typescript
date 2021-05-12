import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

export function exectimeoutValidator(data: Specification.Exectimeout): (() => Specification.Exectimeout) {
  return () => {
    const validate = validators.get('Exectimeout');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Exectimeout is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function exectimeoutBuilder(): Builder<Specification.Exectimeout> {
  return builder<Specification.Exectimeout>(exectimeoutValidator);
}