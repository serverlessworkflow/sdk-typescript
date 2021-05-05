import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import Transition = ServerlessWorkflow.Transition;

export function transitionValidator(data: Transition): (() => Transition) {
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

export function transitionBuilder(): Builder<Transition> {
  return builder<Transition>(transitionValidator);
}