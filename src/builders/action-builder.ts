import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import Action = ServerlessWorkflow.Action;

export function actionValidator(data: Action): (() => Action) {
  return () => {
    const validate = validators.get('Action');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Action is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function actionBuilder(): Builder<Action> {
  return builder<Action>(actionValidator);
}