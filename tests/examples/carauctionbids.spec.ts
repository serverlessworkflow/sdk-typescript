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
  eventstateBuilder,
  functionBuilder,
  oneventsBuilder,
  workflowBuilder,
} from '../../src';

describe('carauctionbids workflow example', () => {
  it('should generate Workflow object', function () {
    const workflow = workflowBuilder()
      .id('handleCarAuctionBid')
      .version('1.0')
      .name('Car Auction Bidding Workflow')
      .description('Store a single bid whole the car auction is active')
      .start({
        stateName: 'StoreCarAuctionBid',
        schedule: '2020-03-20T09:00:00Z/2020-03-20T15:00:00Z',
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
                  .functionRef({
                    refName: 'StoreBidFunction',
                    arguments: {
                      bid: '${ .bid }',
                    },
                  })
                  .build(),
              ])
              .build(),
          ])
          .end(true)
          .build(),
      ])
      .build();

    const expected = JSON.parse(fs.readFileSync('./tests/examples/carauctionbids.json').toLocaleString()) as any;
    expect(workflow).toEqual(expected);
  });
});
