import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

export function enddeventconditionValidator(data: Specification.Enddeventcondition): (() => Specification.Enddeventcondition) {
  return () => {
    const validate = validators.get('Enddeventcondition');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Enddeventcondition is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function enddeventconditionBuilder(): Builder<Specification.Enddeventcondition> {
  return builder<Specification.Enddeventcondition>(enddeventconditionValidator);
}