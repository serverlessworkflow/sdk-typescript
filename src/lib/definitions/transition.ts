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
import { Produceeventdef } from './produceeventdef';
import { overwriteProduceEventsValue } from './utils';

export class Transition {
  constructor(model: any) {
    Object.assign(this, model);

    overwriteProduceEventsValue(this);
  }

  /**
   * Name of state to transition to
   */
  nextState: string;
  /**
   * Array of events to be produced before the transition happens
   */
  produceEvents?: /* Produce an event and set its data */ Produceeventdef[];
  /**
   * If set to true, triggers workflow compensation when before this transition is taken. Default is false
   */
  compensate?: boolean;
}
