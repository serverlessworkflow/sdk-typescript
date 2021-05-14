import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Action} data The underlying object
 * @returns {Specification.Action} The validated underlying object
 */
export function actionValidator(data: Specification.Action): (() => Specification.Action) {
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

/**
 * A factory to create a builder proxy for the type `Specification.Action`
 * @returns {Specification.Action} A builder for `Specification.Action`
 */
export function actionBuilder(): Builder<Specification.Action> {
  return builder<Specification.Action>(actionValidator);
}