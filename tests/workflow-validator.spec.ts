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
 *
 */
import { ValidationError, WorkflowValidator } from '../src/';
import { Workflow } from '../src/lib/definitions/workflow';

describe('workflow-validator', () => {
  it('should return errors instance of ValidationError if the workflow provided is not valid', () => {
    // @ts-ignore
    const workflow = {
      id: 'helloworld',
      name: 'Hello World Workflow',
      version: '1.0',
      description: 'Inject Hello World',
      start: 'Hello State',
      states: [],
    } as Workflow;

    const workflowValidator = new WorkflowValidator(workflow);
    expect(workflowValidator.isValid).toBeFalsy('Expected isValid to be false');
    expect(workflowValidator.errors.length).toBe(1);
    expect(workflowValidator.errors[0].constructor === ValidationError).toBeTruthy(
      'Expected errors to be instance of ValidationError'
    );
    expect(workflowValidator.errors[0].message).toMatch('states');
  });

  it('should have no errors if the workflow is valid', () => {
    const workflow = {
      id: 'helloworld',
      version: '1.0',
      name: 'Hello World Workflow',
      description: 'Inject Hello World',
      start: 'Hello State',
      states: [
        {
          name: 'Hello State',
          type: 'inject',
          data: {
            result: 'Hello World!',
          },
          end: true,
        },
      ],
    } as Workflow;

    const workflowValidator = new WorkflowValidator(workflow);
    expect(workflowValidator.errors.length).toBe(0);
    expect(workflowValidator.isValid).toBeTruthy('Expected isValid to be true');
  });
});
