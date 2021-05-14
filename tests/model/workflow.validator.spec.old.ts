/*
 * Copyright 2021-Present The Serverless Workflow Specification Authors
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { Workflow } from '../../src';
import { ValidationError, WorkflowValidator } from '../../src/model/workflow.validator';

const validWorkflow: Workflow = {
  id: 'helloworld',
  name: 'hello world',
  version: '0.6',
  start: 'hello builder',
  states: [
    {
      type: 'inject',
      name: 'Hello State',
      data: { result: 'Hello World!' },
      end: true,
    },
  ],
};

describe('workflow validator', () => {
  it('should recognize valid workflow', () => {
    expect(new WorkflowValidator(validWorkflow).isValid()).toBeTruthy();
  });

  const testCases = [{ field: 'id' }, { field: 'name' }, { field: 'version' }, { field: 'start' }, { field: 'states' }];
  testCases.forEach((t) => {
    it(`should return error as field [${t.field}] is not set`, () => {
      const field = t.field;
      const invalidWorkflow = workflowWithoutFields([field]);
      const validator = new WorkflowValidator(invalidWorkflow);
      expect(validator.isValid()).toBeFalse();
      expect(validator.validate().errors().length).toBe(1);
      expectErrorsToContainsMessage(validator.validate().errors(), `${t.field} can not be undefined`);
    });
  });

  it(`should return two validationErrors if two mandatory fields are not set`, () => {
    const invalidWorkflow = workflowWithoutFields(['name', 'version']);
    const validator = new WorkflowValidator(invalidWorkflow);
    expect(validator.isValid()).toBeFalse();
    expect(validator.validate().errors().length).toBe(2);
  });
});

function workflowWithoutFields(fields: string[]): Workflow {
  const invalidWorkflow = Object.assign({}, validWorkflow);
  fields.forEach((field) => {
    delete invalidWorkflow[field];
  });
  return invalidWorkflow;
}

function expectErrorsToContainsMessage(validationErrors: ValidationError[], message: string): void {
  const errorMessages = validationErrors.map((e) => e.message()).join(';');
  expect(errorMessages).toMatch(message);
}
