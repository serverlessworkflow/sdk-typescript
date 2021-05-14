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
import {
  ActionBuilder,
  ActionDataFilterBuilder,
  DatabasedSwitchBuilder,
  DefaultTransitionBuilder,
  DelayStateBuilder,
  FunctionDefBuilder,
  FunctionRefBuilder,
  OnErrorBuilder,
  OperationStateBuilder,
  StateDataFilterBuilder,
  SubFlowStateBuilder,
  TransitionDataConditionBuilder,
  WorkflowBuilder,
} from '../../src';
import * as fs from 'fs';

describe('jobmonitoring workflow example', () => {
  it('should generate Workflow object', function () {
    const workflow = new WorkflowBuilder()
      .withId('jobmonitoring')
      .withVersion('1.0')
      .withName('Job Monitoring')
      .withDescription('Monitor finished execution of a submitted job')
      .withStart('SubmitJob')
      .withFunctions([
        new FunctionDefBuilder()
          .withName('submitJob')
          .withOperation('http://myapis.org/monitorapi.json#doSubmit')
          .build(),
        new FunctionDefBuilder()
          .withName('checkJobStatus')
          .withOperation('http://myapis.org/monitorapi.json#checkStatus')
          .build(),
        new FunctionDefBuilder()
          .withName('reportJobSuceeded')
          .withOperation('http://myapis.org/monitorapi.json#reportSucceeded')
          .build(),
        new FunctionDefBuilder()
          .withName('reportJobFailed')
          .withOperation('http://myapis.org/monitorapi.json#reportFailure')
          .build(),
      ])
      .withStates([
        new OperationStateBuilder()
          .withName('SubmitJob')
          .withActionMode('sequential')
          .withActions([
            new ActionBuilder()
              .withFunctionRef(
                new FunctionRefBuilder()
                  .withRefName('submitJob')
                  .withArguments({
                    name: '${ .job.name }',
                  })
                  .build()
              )
              .withActionDataFilter(new ActionDataFilterBuilder().withResults('${ .jobuid }').build())
              .build(),
          ])
          .withOnErrors([new OnErrorBuilder().withError('*').withTransition('SubmitError').build()])
          .withStateDataFilter(new StateDataFilterBuilder().withOutput('${ .jobuid }').build())
          .withTransition('WaitForCompletion')
          .build(),
        new SubFlowStateBuilder()
          .withName('SubmitError')
          .withWorkflowId('handleJobSubmissionErrorWorkflow')
          .withEnd(true)
          .build(),
        new DelayStateBuilder()
          .withName('WaitForCompletion')
          .withTimeDelay('PT5S')
          .withTransition('GetJobStatus')
          .build(),
        new OperationStateBuilder()
          .withName('GetJobStatus')
          .withActionMode('sequential')
          .withActions([
            new ActionBuilder()
              .withFunctionRef(
                new FunctionRefBuilder()
                  .withRefName('checkJobStatus')
                  .withArguments({
                    name: '${ .jobuid }',
                  })
                  .build()
              )
              .withActionDataFilter(new ActionDataFilterBuilder().withResults('${ .jobstatus }').build())
              .build(),
          ])
          .withStateDataFilter(new StateDataFilterBuilder().withOutput('${ .jobstatus }').build())
          .withTransition('DetermineCompletion')
          .build(),
        new DatabasedSwitchBuilder()
          .withName('DetermineCompletion')
          .withDataConditions([
            new TransitionDataConditionBuilder()
              .withCondition('${ .jobStatus == "SUCCEEDED" }')
              .withTransition('JobSucceeded')
              .build(),
            new TransitionDataConditionBuilder()
              .withCondition('${ .jobStatus == "FAILED" }')
              .withTransition('JobFailed')
              .build(),
          ])
          .withDefault(new DefaultTransitionBuilder().withTransition('WaitForCompletion').build())
          .build(),
        new OperationStateBuilder()
          .withName('JobSucceeded')
          .withActionMode('sequential')
          .withActions([
            new ActionBuilder()
              .withFunctionRef(
                new FunctionRefBuilder()
                  .withRefName('reportJobSuceeded')
                  .withArguments({
                    name: '${ .jobuid }',
                  })
                  .build()
              )
              .build(),
          ])
          .withEnd(true)
          .build(),
        new OperationStateBuilder()
          .withName('JobFailed')
          .withActionMode('sequential')
          .withActions([
            new ActionBuilder()
              .withFunctionRef(
                new FunctionRefBuilder()
                  .withRefName('reportJobFailed')
                  .withArguments({
                    name: '${ .jobuid }',
                  })
                  .build()
              )
              .build(),
          ])
          .withEnd(true)
          .build(),
      ])
      .build();

    const expected = JSON.parse(fs.readFileSync('./spec/examples/jobmonitoring.json').toLocaleString()) as any;
    expect(workflow).toEqual(expected);
  });
});
