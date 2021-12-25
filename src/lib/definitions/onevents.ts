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
import {
  cleanSourceModelProperty,
  normalizeActionMode,
  normalizeActions,
  overwriteActions,
  overwriteEventDataFilter,
} from './utils';

export class Onevents {
  sourceModel?: Onevents;
  /**
   * References one or more unique event names in the defined workflow events
   */
  eventRefs: [string, ...string[]];
  /**
   * Specifies how actions are to be performed (in sequence or in parallel)
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

  constructor(model: any) {
    this.sourceModel = Object.assign({}, model);

    const defaultModel = { actionMode: 'sequential' };
    Object.assign(this, defaultModel, model);

    overwriteActions(this);
    overwriteEventDataFilter(this);
  }

  /**
   * Normalize the value of each property by recursively deleting properties whose value is equal to its default value. Does not modify the object state.
   * @returns {Specification.Onevents} without deleted properties.
   */
  normalize = (): Onevents => {
    const clone = new Onevents(this);

    normalizeActionMode(clone, this.sourceModel);
    normalizeActions(clone);

    cleanSourceModelProperty(clone);

    return clone;
  };
}
