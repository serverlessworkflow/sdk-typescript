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
  FunctionDefBuilder,
  FunctionRefBuilder,
  OnErrorBuilder,
  OperationStateBuilder,
  StateDataFilterBuilder,
  SubFlowStateBuilder,
  WorkflowBuilder,
} from '../../src';
import * as fs from 'fs';

describe('provisionorder workflow example', () => {
  it('should generate Workflow object', function () {
    const workflow = new WorkflowBuilder()
      .withId('provisionorders')
      .withVersion('1.0')
      .withName('Provision Orders')
      .withDescription('Provision Orders and handle errors thrown')
      .withStart('ProvisionOrder')
      .withFunctions([
        new FunctionDefBuilder()
          .withName('provisionOrderFunction')
          .withOperation('http://myapis.org/provisioningapi.json#doProvision')
          .build(),
      ])
      .withStates([
        new OperationStateBuilder()
          .withName('ProvisionOrder')
          .withActionMode('sequential')
          .withActions([
            new ActionBuilder()
              .withFunctionRef(
                new FunctionRefBuilder()
                  .withRefName('provisionOrderFunction')
                  .withArguments({
                    order: '${ .order }',
                  })
                  .build()
              )
              .build(),
          ])
          .withStateDataFilter(new StateDataFilterBuilder().withOutput('${ .exceptions }').build())
          .withTransition('ApplyOrder')
          .withOnErrors([
            new OnErrorBuilder().withError('Missing order id').withTransition('MissingId').build(),
            new OnErrorBuilder().withError('Missing order item').withTransition('MissingItem').build(),
            new OnErrorBuilder().withError('Missing order quantity').withTransition('MissingQuantity').build(),
          ])
          .build(),
        new SubFlowStateBuilder()
          .withName('MissingId')
          .withWorkflowId('handleMissingIdExceptionWorkflow')
          .withEnd(true)
          .build(),
        new SubFlowStateBuilder()
          .withName('MissingItem')
          .withWorkflowId('handleMissingItemExceptionWorkflow')
          .withEnd(true)
          .build(),
        new SubFlowStateBuilder()
          .withName('MissingQuantity')
          .withWorkflowId('handleMissingQuantityExceptionWorkflow')
          .withEnd(true)
          .build(),
        new SubFlowStateBuilder().withName('ApplyOrder').withWorkflowId('applyOrderWorkflowId').withEnd(true).build(),
      ])
      .build();

    const expected = JSON.parse(fs.readFileSync('./spec/examples/provisionorder.json').toLocaleString()) as any;
    expect(workflow).toEqual(expected);
  });
});
