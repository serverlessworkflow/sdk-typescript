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
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ValidateFunction } from 'ajv';
import { Specification } from './definitions';
import { validators } from './validators';
import { ValidationError } from './validation-error';

import { schemaVersion } from '../../package.json';

export class WorkflowValidator {
  /** The validation errors after running validate(), if any */
  readonly errors: ValidationError[] = [];

  /** Whether the workflow is valid or not */
  readonly isValid: boolean;

  /**
   * Creates a new WorkflowValidator for the provided workflow
   * @param {Workflow} workflow The workflow to validate
   */
  constructor(private workflow: Specification.Workflow) {
    const validateFn = validators.get('Workflow') as ValidateFunction<Specification.Workflow>;
    const normalizedWf = this.workflow.normalize();
    validateFn(JSON.parse(JSON.stringify(normalizedWf)));
    if (validateFn.errors) {
      this.errors = validateFn.errors.map((error) => {
        const message = `Workflow is invalid: ${error.instancePath} | ${error.schemaPath} | ${error.message}
        data: ${JSON.stringify(normalizedWf, null, 4)}`;
        return new ValidationError(message);
      });
    }

    const specVersion = workflow.specVersion;
    if (schemaVersion !== specVersion) {
      const message = `provided workflow.specVersion value '${specVersion}' can not be different from the SDK supported version '${schemaVersion}'`;
      this.errors.push(new ValidationError(message));
    }

    this.isValid = this.errors.length === 0;
  }
}
