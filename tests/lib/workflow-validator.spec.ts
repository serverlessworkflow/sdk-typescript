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
import { ValidationError, WorkflowValidator } from '../../src';
import { Workflow } from '../../src/lib/definitions/workflow';

const validWorkflow = {
  id: 'helloworld',
  version: '1.0',
  specVersion: '0.7',
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
};

describe('workflow-validator, invalid state', () => {
  it('should return errors instance of ValidationError if the workflow provided is not valid', () => {
    // @ts-ignore
    const workflowWithEmptyStates = Object.assign({ ...validWorkflow }, { states: [] }) as Workflow;

    const workflowValidator = new WorkflowValidator(workflowWithEmptyStates);

    const numErrors = 1;
    expectInvalidWorkflow(workflowValidator, numErrors);
    expect(workflowValidator.errors[0].message).toMatch('states');
  });

  it('should check if specVersion match the supported sdk version', () => {
    // @ts-ignore
    const workflowWithInvalidSpecVersion = Object.assign({ ...validWorkflow }, { specVersion: '0.1' }) as Workflow;

    const workflowValidator = new WorkflowValidator(workflowWithInvalidSpecVersion);

    const numErrors = 1;
    expectInvalidWorkflow(workflowValidator, numErrors);

    expect(workflowValidator.errors[0].message).toMatch('specVersion');
  });

  function expectInvalidWorkflow(workflowValidator: WorkflowValidator, numErrors: number) {
    expect(workflowValidator.isValid).toBeFalsy('Expected isValid to be false');
    expect(workflowValidator.errors.length).toBe(numErrors);
    workflowValidator.errors.forEach((error) => {
      expect(error.constructor === ValidationError).toBeTruthy('Expected errors to be instance of ValidationError');
    });
  }
});

describe('workflow-validator, valid state', () => {
  it('should have no errors if the workflow is valid', () => {
    // @ts-ignore
    const workflow = validWorkflow as Workflow;

    const workflowValidator = new WorkflowValidator(workflow);
    expect(workflowValidator.errors.length).toBe(0);
    expect(workflowValidator.isValid).toBeTruthy('Expected isValid to be true');
  });
});
