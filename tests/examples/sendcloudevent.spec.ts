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
  eventdefBuilder,
  foreachstateBuilder,
  functionBuilder,
  produceeventdefBuilder,
  workflowBuilder,
  functionrefBuilder,
  endBuilder,
} from '../../src';

describe('sendcloudevent workflow example', () => {
  it('should generate Workflow object', function () {
    const workflow = workflowBuilder()
      .id('sendcloudeventonprovision')
      .version('1.0')
      .name('Send CloudEvent on provision completion')
      .start('ProvisionOrdersState')
      .events([
        eventdefBuilder().name('provisioningCompleteEvent').type('provisionCompleteType').kind('produced').build(),
      ])
      .functions([
        functionBuilder()
          .name('provisionOrderFunction')
          .operation('http://myapis.org/provisioning.json#doProvision')
          .build(),
      ])
      .states([
        foreachstateBuilder()
          .name('ProvisionOrdersState')
          .inputCollection('${ .orders }')
          .iterationParam('singleorder')
          .outputCollection('${ .provisionedOrders }')
          .usedForCompensation(false)
          .actions([
            actionBuilder()
              .functionRef(
                functionrefBuilder()
                  .refName('provisionOrderFunction')
                  .arguments({
                    order: '${ .singleorder }',
                  })
                  .build()
              )
              .build(),
          ])
          .end(
            endBuilder()
              .produceEvents([
                produceeventdefBuilder().eventRef('provisioningCompleteEvent').data('${ .provisionedOrders }').build(),
              ])
              .build()
          )
          .build(),
      ])
      .build();

    const expected = JSON.parse(fs.readFileSync('./tests/examples/sendcloudevent.json', 'utf8'));
    expect(JSON.stringify(workflow.normalize())).toEqual(JSON.stringify(expected));
  });
});
