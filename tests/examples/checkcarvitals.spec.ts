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
  eventdefBuilder,
  actionBuilder,
  operationstateBuilder,
  eventstateBuilder,
  oneventsBuilder,
  workflowBuilder,
  sleepBuilder,
  eventbasedswitchstateBuilder,
  enddeventconditionBuilder,
  defaultconditiondefBuilder,
} from '../../src';

describe('checkcarvitals workflow example', () => {
  it('should generate Workflow object', function () {
    const workflow = workflowBuilder()
      .id('checkcarvitals')
      .name('Check Car Vitals Workflow')
      .version('1.0')
      .specVersion('0.7')
      .start('WhenCarIsOn')
      .states([
        eventstateBuilder()
          .name('WhenCarIsOn')
          .onEvents([oneventsBuilder().eventRefs(['CarTurnedOnEvent']).build()])
          .transition('DoCarVitalChecks')
          .build(),
        operationstateBuilder()
          .name('DoCarVitalChecks')
          .actions([actionBuilder().subFlowRef('vitalscheck').sleep(sleepBuilder().after('PT1S').build()).build()])

          .transition('CheckContinueVitalChecks')
          .build(),

        eventbasedswitchstateBuilder()
          .name('CheckContinueVitalChecks')
          .eventConditions([
            enddeventconditionBuilder()
              .name('Car Turned Off Condition')
              .eventRef('CarTurnedOffEvent')
              .end(true)
              .build(),
          ])
          .defaultCondition(defaultconditiondefBuilder().transition('DoCarVitalChecks').build())
          .build(),
      ])
      .events([
        eventdefBuilder().name('CarTurnedOnEvent').type('car.events').source('my/car').build(),
        eventdefBuilder().name('CarTurnedOffEvent').type('car.events').source('my/car').build(),
      ])
      .build();

    const expected = JSON.parse(fs.readFileSync('./tests/examples/checkcarvitals.json', 'utf8'));
    expect(JSON.stringify(workflow.normalize())).toEqual(JSON.stringify(expected));
  });
});
