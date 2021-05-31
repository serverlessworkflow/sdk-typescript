/*
 * Copyright 2021-Present The Serverless Workflow Specification Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * oUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { ValidateFunction } from 'ajv';
import { Specification } from './definitions';
import { validators } from './validators';
import { ValidationError } from './validation-error';

export class WorkflowValidator {
  /** The validation errors after running validate(), if any */
  errors: ValidationError[] | never[] = [];

  /** Whether the workflow is valid or not */
  isValid: boolean;

  /**
   * Creates a new WorkflowValidator for the provided workflow
   * @param {Workflow} workflow The workflow to validate
   */
  constructor(private workflow: Specification.Workflow) {
    this.validate();
  }

  /**
   * Validates the workflow, populates the errors if any
   */
  private validate(): void {
    const validateFn = validators.get('Workflow') as ValidateFunction<Specification.Workflow>;
    this.isValid = validateFn(this.workflow);
    if (validateFn.errors) {
      this.errors = validateFn.errors.map(
        (error) => new ValidationError(`invalid: ${error.instancePath} | ${error.schemaPath} | ${error.message}`)
      );
    }
  }
}
