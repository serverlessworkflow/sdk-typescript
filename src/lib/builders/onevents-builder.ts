import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

export function oneventsValidator(data: Specification.Onevents): (() => Specification.Onevents) {
  return () => {
    const validate = validators.get('Onevents');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Onevents is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function oneventsBuilder(): Builder<Specification.Onevents> {
  return builder<Specification.Onevents>(oneventsValidator);
}