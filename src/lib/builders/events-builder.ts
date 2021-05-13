import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

export function eventsValidator(data: Specification.Events): (() => Specification.Events) {
  return () => {
    const validate = validators.get('Events');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Events is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function eventsBuilder(): Builder<Specification.Events> {
  return builder<Specification.Events>(eventsValidator);
}