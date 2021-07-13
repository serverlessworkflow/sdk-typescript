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
import { Produceeventdef } from './produceeventdef';
import { normalizeCompensateProperty, overwriteProduceEventsValue } from './utils';

export class Transition {
  constructor(model: any) {
    const defaultModel = {
      compensate: false,
    };
    Object.assign(this, defaultModel, model);

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

  /**
   * Normalize the value of each property by recursively deleting properties whose value is equal to its default value. Does not modify the object state.
   * @returns {Specification.Transition} without deleted properties.
   */
  normalize(): Transition {
    const clone = new Transition(this);

    normalizeCompensateProperty(clone);

    return clone;
  }
}
