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
 * oUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import * as fs from 'fs';
import {
  actionBuilder,
  databasedswitchBuilder,
  defaultdefBuilder,
  functionBuilder,
  operationstateBuilder,
  subflowstateBuilder,
  transitiondataconditionBuilder,
  workflowBuilder,
} from '../../src';

describe('applicationrequest workflow example', () => {
  it('should generate Workflow object', function () {
    const workflow = workflowBuilder()
      .id('applicantrequest')
      .version('1.0')
      .name('Applicant Request Decision Workflow')
      .description('Determine if applicant request is valid')
      .start('CheckApplication')
      .functions([
        functionBuilder()
          .name('sendRejectionEmailFunction')
          .operation('http://myapis.org/applicationapi.json#emailRejection')
          .build(),
      ])
      .states([
        databasedswitchBuilder()
          .name('CheckApplication')
          .dataConditions([
            transitiondataconditionBuilder()
              .condition('${ .applicants | .age >= 18 }')
              .transition('StartApplication')
              .build(),
            transitiondataconditionBuilder()
              .condition('${ .applicants | .age < 18 }')
              .transition('RejectApplication')
              .build(),
          ])
          .default(defaultdefBuilder().transition('RejectApplication').build())
          .build(),
        subflowstateBuilder().name('StartApplication').workflowId('startApplicationWorkflowId').end(true).build(),
        operationstateBuilder()
          .name('RejectApplication')
          .actionMode('sequential')
          .end(true)
          .actions([
            actionBuilder()
              .functionRef({
                refName: 'sendRejectionEmailFunction',
                arguments: { applicant: '${ .applicant }' },
              })
              .build(),
          ])
          .build(),
      ])
      .build();

    const expected = JSON.parse(fs.readFileSync('./tests/examples/applicantrequest.json').toLocaleString()) as any;
    expect(workflow).toEqual(expected);
  });
});
