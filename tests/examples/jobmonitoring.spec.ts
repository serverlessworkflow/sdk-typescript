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

import * as fs from 'fs';
import {
  actionBuilder,
  actiondatafilterBuilder,
  databasedswitchBuilder,
  functionBuilder,
  functionrefBuilder,
  operationstateBuilder,
  statedatafilterBuilder,
  transitiondataconditionBuilder,
  workflowBuilder,
  defaultconditiondefBuilder,
  sleepstateBuilder,
} from '../../src';

describe('jobmonitoring workflow example', () => {
  it('should generate Workflow object', function () {
    const workflow = workflowBuilder()
      .id('jobmonitoring')
      .version('1.0')
      .specVersion('0.7')
      .name('Job Monitoring')
      .description('Monitor finished execution of a submitted job')
      .start('SubmitJob')
      .functions([
        functionBuilder().name('submitJob').operation('http://myapis.org/monitorapi.json#doSubmit').build(),
        functionBuilder().name('checkJobStatus').operation('http://myapis.org/monitorapi.json#checkStatus').build(),
        functionBuilder()
          .name('reportJobSuceeded')
          .operation('http://myapis.org/monitorapi.json#reportSucceeded')
          .build(),
        functionBuilder().name('reportJobFailed').operation('http://myapis.org/monitorapi.json#reportFailure').build(),
      ])
      .states([
        operationstateBuilder()
          .name('SubmitJob')
          .actionMode('sequential')
          .actions([
            actionBuilder()
              .functionRef(
                functionrefBuilder()
                  .refName('submitJob')
                  .arguments({
                    name: '${ .job.name }',
                  })
                  .build()
              )
              .actionDataFilter(actiondatafilterBuilder().results('${ .jobuid }').build())
              .build(),
          ])
          .stateDataFilter(statedatafilterBuilder().output('${ .jobuid }').build())
          .transition('WaitForCompletion')
          .build(),
        sleepstateBuilder().name('WaitForCompletion').duration('PT5S').transition('GetJobStatus').build(),
        operationstateBuilder()
          .name('GetJobStatus')
          .actionMode('sequential')
          .actions([
            actionBuilder()
              .functionRef(
                functionrefBuilder()
                  .refName('checkJobStatus')
                  .arguments({
                    name: '${ .jobuid }',
                  })
                  .build()
              )
              .actionDataFilter(actiondatafilterBuilder().results('${ .jobstatus }').build())
              .build(),
          ])
          .stateDataFilter(statedatafilterBuilder().output('${ .jobstatus }').build())
          .transition('DetermineCompletion')
          .build(),
        databasedswitchBuilder()
          .name('DetermineCompletion')
          .dataConditions([
            transitiondataconditionBuilder()
              .condition('${ .jobStatus == "SUCCEEDED" }')
              .transition('JobSucceeded')
              .build(),
            transitiondataconditionBuilder().condition('${ .jobStatus == "FAILED" }').transition('JobFailed').build(),
          ])
          .defaultCondition(defaultconditiondefBuilder().transition('WaitForCompletion').build())
          .build(),
        operationstateBuilder()
          .name('JobSucceeded')
          .actionMode('sequential')
          .actions([
            actionBuilder()
              .functionRef(
                functionrefBuilder()
                  .refName('reportJobSuceeded')
                  .arguments({
                    name: '${ .jobuid }',
                  })
                  .build()
              )
              .build(),
          ])
          .build(),
        operationstateBuilder()
          .name('JobFailed')
          .actionMode('sequential')
          .actions([
            actionBuilder()
              .functionRef(
                functionrefBuilder()
                  .refName('reportJobFailed')
                  .arguments({
                    name: '${ .jobuid }',
                  })
                  .build()
              )
              .build(),
          ])
          .build(),
      ])
      .build();

    const expected = JSON.parse(fs.readFileSync('./tests/examples/jobmonitoring.json', 'utf8'));
    expect(JSON.stringify(workflow.normalize())).toEqual(JSON.stringify(expected));
  });
});
