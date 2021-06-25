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
import {
  actionBuilder,
  errorBuilder,
  functionBuilder,
  operationstateBuilder,
  statedatafilterBuilder,
  subflowstateBuilder,
  workflowBuilder,
  functionrefBuilder,
} from '../../src';

describe('provisionorder workflow example', () => {
  it('should generate Workflow object', function () {
    const workflow = workflowBuilder()
      .id('provisionorders')
      .version('1.0')
      .name('Provision Orders')
      .description('Provision Orders and handle errors thrown')
      .start('ProvisionOrder')
      .functions([
        functionBuilder()
          .name('provisionOrderFunction')
          .operation('http://myapis.org/provisioningapi.json#doProvision')
          .build(),
      ])
      .states([
        operationstateBuilder()
          .name('ProvisionOrder')
          .actionMode('sequential')
          .actions([
            actionBuilder()
              .functionRef(
                functionrefBuilder()
                  .refName('provisionOrderFunction')
                  .arguments({
                    order: '${ .order }',
                  })
                  .build()
              )
              .build(),
          ])
          .stateDataFilter(statedatafilterBuilder().output('${ .exceptions }').build())
          .transition('ApplyOrder')
          .onErrors([
            errorBuilder().error('Missing order id').transition('MissingId').build(),
            errorBuilder().error('Missing order item').transition('MissingItem').build(),
            errorBuilder().error('Missing order quantity').transition('MissingQuantity').build(),
          ])
          .build(),
        subflowstateBuilder().name('MissingId').workflowId('handleMissingIdExceptionWorkflow').build(),
        subflowstateBuilder().name('MissingItem').workflowId('handleMissingItemExceptionWorkflow').build(),
        subflowstateBuilder().name('MissingQuantity').workflowId('handleMissingQuantityExceptionWorkflow').build(),
        subflowstateBuilder().name('ApplyOrder').workflowId('applyOrderWorkflowId').build(),
      ])
      .build();

    const expected = JSON.parse(fs.readFileSync('./tests/examples/provisionorder.json', 'utf8'));
    expect(JSON.stringify(workflow.normalize())).toEqual(JSON.stringify(expected));
  });
});
