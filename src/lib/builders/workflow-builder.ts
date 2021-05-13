import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

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

export function workflowBuilder(): Builder<Specification.Workflow> {
  return builder<Specification.Workflow>(workflowValidator);
}