import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

export function eventconditionValidator(data: Specification.Eventcondition): (() => Specification.Eventcondition) {
  return () => {
    const validate = validators.get('Eventcondition');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Eventcondition is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function eventconditionBuilder(): Builder<Specification.Eventcondition> {
  return builder<Specification.Eventcondition>(eventconditionValidator);
}