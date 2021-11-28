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
  eventdefBuilder,
  eventstateBuilder,
  functionBuilder,
  oneventsBuilder,
  workflowBuilder,
  functionrefBuilder,
} from '../../src';

describe('carauctionbids workflow example', () => {
  it('should generate Workflow object', function () {
    const workflow = workflowBuilder()
      .id('handleCarAuctionBid')
      .version('1.0')
      .specVersion('0.8')
      .name('Car Auction Bidding Workflow')
      .description('Store a single bid whole the car auction is active')
      .start({
        stateName: 'StoreCarAuctionBid',
        schedule: 'R/PT2H',
      })
      .functions([
        functionBuilder().name('StoreBidFunction').operation('http://myapis.org/carauctionapi.json#storeBid').build(),
      ])
      .events([eventdefBuilder().name('CarBidEvent').type('carBidMadeType').source('carBidEventSource').build()])
      .states([
        eventstateBuilder()
          .name('StoreCarAuctionBid')
          .exclusive(true)
          .onEvents([
            oneventsBuilder()
              .eventRefs(['CarBidEvent'])
              .actions([
                actionBuilder()
                  .functionRef(
                    functionrefBuilder()
                      .refName('StoreBidFunction')
                      .arguments({
                        bid: '${ .bid }',
                      })
                      .build()
                  )
                  .build(),
              ])
              .build(),
          ])
          .build(),
      ])
      .build();

    const expected = JSON.parse(fs.readFileSync('./tests/examples/carauctionbids.json', 'utf8'));
    expect(JSON.stringify(workflow.normalize())).toEqual(JSON.stringify(expected));
  });
});
