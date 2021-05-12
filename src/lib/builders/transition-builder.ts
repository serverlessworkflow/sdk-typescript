import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

export function transitionValidator(data: Specification.Transition): (() => Specification.Transition) {
  return () => {
    const validate = validators.get('Transition');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Transition is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function transitionBuilder(): Builder<Specification.Transition> {
  return builder<Specification.Transition>(transitionValidator);
}