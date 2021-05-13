import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

export function eventrefValidator(data: Specification.Eventref): (() => Specification.Eventref) {
  return () => {
    const validate = validators.get('Eventref');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Eventref is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function eventrefBuilder(): Builder<Specification.Eventref> {
  return builder<Specification.Eventref>(eventrefValidator);
}