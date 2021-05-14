import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Workflow} data The underlying object
 * @returns {Specification.Workflow} The validated underlying object
 */
export function workflowValidator(data: Specification.Workflow): (() => Specification.Workflow) {
  return () => {
    const validate = validators.get('Workflow');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Workflow is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Workflow`
 * @returns {Specification.Workflow} A builder for `Specification.Workflow`
 */
export function workflowBuilder(): Builder<Specification.Workflow> {
  return builder<Specification.Workflow>(workflowValidator);
}