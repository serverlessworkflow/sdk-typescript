import { DefinedError, ValidateFunction } from 'ajv';
import { validators } from './validators';
import Workflow = ServerlessWorkflow.Workflow;

export class WorkflowValidator {
  /** The validation errors after running validate(), if any */
  validationErrors: DefinedError[] | never[] = [];
  /** The validate function */
  private validateFn: ValidateFunction<Workflow>;
  /**
   * Creates a new WorkflowValidator for the provided workflow
   * @param {Workflow} workflow The workflow to validate
   */
  constructor(private workflow: Workflow) {
    this.validateFn = validators.get('Workflow') as ValidateFunction<Workflow>;
  }
  /**
   * Validates the workflow, populates the validationErrors if any
   * @returns {boolean} If the workflow is valid or not
   */
  validate() {
    const isValid = this.validateFn(this.workflow);
    this.validationErrors = this.validateFn.errors as DefinedError[];
    return isValid;
  }
}