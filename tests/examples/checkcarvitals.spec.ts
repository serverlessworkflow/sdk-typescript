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
  eventdefBuilder,
  eventstateBuilder,
  oneventsBuilder,
  repeatBuilder,
  subflowstateBuilder,
  workflowBuilder,
} from '../../src';

describe('checkcarvitals workflow example', () => {
  it('should generate Workflow object', function () {
    const workflow = workflowBuilder()
      .id('checkcarvitals')
      .version('1.0')
      .name('Check Car Vitals Workflow')
      .start('WhenCarIsOn')
      .states([
        eventstateBuilder()
          .name('WhenCarIsOn')
          .onEvents([oneventsBuilder().eventRefs(['CarTurnedOnEvent']).build()])
          .transition('DoCarVitalsChecks')
          .build(),
        subflowstateBuilder()
          .name('DoCarVitalsChecks')
          .workflowId('vitalscheck')
          .repeat(repeatBuilder().stopOnEvents(['CarTurnedOffEvent']).build())
          .build(),
      ])
      .events([
        eventdefBuilder().name('CarTurnedOnEvent').type('car.events').source('my/car/start').build(),
        eventdefBuilder().name('CarTurnedOffEvent').type('car.events').source('my/car/start').build(),
      ])
      .build();

    const expected = JSON.parse(fs.readFileSync('./tests/examples/checkcarvitals.json', 'utf8'));
    expect(workflow).toEqual(expected);
  });
});
