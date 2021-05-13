import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

export function transitioneventconditionValidator(data: Specification.Transitioneventcondition): (() => Specification.Transitioneventcondition) {
  return () => {
    const validate = validators.get('Transitioneventcondition');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Transitioneventcondition is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function transitioneventconditionBuilder(): Builder<Specification.Transitioneventcondition> {
  return builder<Specification.Transitioneventcondition>(transitioneventconditionValidator);
}