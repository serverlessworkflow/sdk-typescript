import { DefinedError, ValidateFunction } from 'ajv';
import { Specification } from './definitions';
import { validators } from './validators';

export class WorkflowValidator {
  /** The validation errors after running validate(), if any */
  errors: DefinedError[] | never[] = [];
  /** The validate function */
  private validateFn: ValidateFunction<Specification.Workflow>;
  /**
   * Creates a new WorkflowValidator for the provided workflow
   * @param {Workflow} workflow The workflow to validate
   */
  constructor(private workflow: Specification.Workflow) {
    this.validateFn = validators.get('Workflow') as ValidateFunction<Specification.Workflow>;
  }
  /**
   * Validates the workflow, populates the errors if any
   * @returns {boolean} If the workflow is valid or not
   */
  validate(): boolean {
    const isValid = this.validateFn(this.workflow);
    this.errors = this.validateFn.errors as DefinedError[];
    return isValid;
  }
}