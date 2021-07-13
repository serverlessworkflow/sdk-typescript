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
import { Action } from './action';
import { Eventdatafilter } from './eventdatafilter';
import { normalizeActionModeParallelProperty, overwriteActionsValue, overwriteEventDataFilterValue } from './utils';

export class Onevents {
  constructor(model: any) {
    const defaultModel = { actionMode: 'parallel' };
    Object.assign(this, defaultModel, model);

    overwriteEventDataFilterValue(this);
    overwriteActionsValue(this);
  }

  /**
   * References one or more unique event names in the defined workflow events
   */
  eventRefs: [string, ...string[]];
  /**
   * Specifies how actions are to be performed (in sequence of parallel)
   */
  actionMode?: 'sequential' | 'parallel';
  /**
   * Actions to be performed if expression matches
   */
  actions?: Action[];
  /**
   * Event data filter
   */
  eventDataFilter?: Eventdatafilter;

  /**
   * Normalize the value of each property by recursively deleting properties whose value is equal to its default value. Does not modify the object state.
   * @returns {Specification.Onevents} without deleted properties.
   */
  normalize(): Onevents {
    const clone = new Onevents(this);

    normalizeActionModeParallelProperty(clone);

    return clone;
  }
}
