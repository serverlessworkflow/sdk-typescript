import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import Workflow = ServerlessWorkflow.Workflow;

export function workflowValidator(data: Workflow): (() => Workflow) {
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

export function workflowBuilder(): Builder<Workflow> {
  return builder<Workflow>(workflowValidator);
}