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
import { Action } from './action';
import { Eventdatafilter } from './eventdatafilter';

export class Onevents {
  constructor(model: any) {
    const result = {};
    Object.assign(this, result, model);
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
}
