import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

export function eventdefValidator(data: Specification.Eventdef): (() => Specification.Eventdef) {
  return () => {
    const validate = validators.get('Eventdef');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Eventdef is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function eventdefBuilder(): Builder<Specification.Eventdef> {
  return builder<Specification.Eventdef>(eventdefValidator);
}