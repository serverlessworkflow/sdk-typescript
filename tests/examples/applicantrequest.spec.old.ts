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
import * as fs from 'fs';
import { WorkflowBuilder } from '../../src';
import { FunctionDefBuilder } from '../../src';
import { DatabasedSwitchBuilder } from '../../src';
import { TransitionDataConditionBuilder } from '../../src';
import { OperationStateBuilder } from '../../src';
import { SubFlowStateBuilder } from '../../src';
import { ActionBuilder } from '../../src';
import { DefaultTransitionBuilder } from '../../src';
import { FunctionRefBuilder } from '../../src';

describe('applicationrequest workflow example', () => {
  it('should generate Workflow object', function () {
    const workflow = new WorkflowBuilder()
      .withId('applicantrequest')
      .withVersion('1.0')
      .withName('Applicant Request Decision Workflow')
      .withDescription('Determine if applicant request is valid')
      .withStart('CheckApplication')
      .withFunctions([
        new FunctionDefBuilder()
          .withName('sendRejectionEmailFunction')
          .withOperation('http://myapis.org/applicationapi.json#emailRejection')
          .build(),
      ])
      .withStates([
        new DatabasedSwitchBuilder()
          .withName('CheckApplication')
          .withDataConditions([
            new TransitionDataConditionBuilder()
              .withCondition('${ .applicants | .age >= 18 }')
              .withTransition('StartApplication')
              .build(),
            new TransitionDataConditionBuilder()
              .withCondition('${ .applicants | .age < 18 }')
              .withTransition('RejectApplication')
              .build(),
          ])
          .withDefault(new DefaultTransitionBuilder().withTransition('RejectApplication').build())
          .build(),
        new SubFlowStateBuilder()
          .withName('StartApplication')
          .withWorkflowId('startApplicationWorkflowId')
          .withEnd(true)
          .build(),
        new OperationStateBuilder()
          .withName('RejectApplication')
          .withActionMode('sequential')
          .withEnd(true)
          .withActions([
            new ActionBuilder()
              .withFunctionRef(
                new FunctionRefBuilder()
                  .withRefName('sendRejectionEmailFunction')
                  .withArguments({ applicant: '${ .applicant }' })
                  .build()
              )
              .build(),
          ])
          .build(),
      ])
      .build();

    const expected = JSON.parse(fs.readFileSync('./spec/examples/applicantrequest.json').toLocaleString()) as any;
    expect(workflow).toEqual(expected);
  });
});
