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

import { Defaultconditiondef } from './defaultconditiondef';
import { Error } from './error';
import { Metadata } from './metadata';
import { Statedatafilter } from './statedatafilter';
import {
  cleanSourceModelProperty,
  normalizeDefaultCondition,
  normalizeEventConditions,
  normalizeOnErrors,
  normalizeUsedForCompensation,
  overwriteDefaultCondition,
  overwriteEventConditions,
  overwriteMetadata,
  overwriteOnErrors,
  overwriteStateDataFilter,
  overwriteTimeoutWithStateExecTimeout,
} from './utils';
import { Eventcondition, EventTimeout } from './types';
import { StateExecTimeout } from './stateExecTimeout';

export class Eventbasedswitchstate {
  sourceModel?: Eventbasedswitchstate;

  constructor(model: any) {
    this.sourceModel = Object.assign({}, model);

    const defaultModel = { id: undefined, name: undefined, type: 'switch', usedForCompensation: false };
    Object.assign(this, defaultModel, model);

    overwriteStateDataFilter(this);
    overwriteTimeoutWithStateExecTimeout(this);
    overwriteEventConditions(this);
    overwriteOnErrors(this);
    overwriteDefaultCondition(this);
    overwriteMetadata(this);
  }
  /**
   * Unique State id
   */
  id?: string;
  /**
   * State name
   */
  name: string;
  /**
   * State type
   */
  type: 'switch';
  /**
   * State data filter
   */
  stateDataFilter?: Statedatafilter;
  /**
   * State specific timeouts
   */
  timeouts?: {
    stateExecTimeout?: StateExecTimeout;
    eventTimeout?: /* Timeout duration to wait for consuming defined events (ISO 8601 duration format) */ EventTimeout;
  };
  /**
   * Defines conditions evaluated against events
   */
  eventConditions: Eventcondition[];
  /**
   * States error handling definitions
   */
  onErrors?: Error[];
  /**
   * Default transition of the workflow if there is no matching data conditions. Can include a transition or end definition
   */
  defaultCondition: /* DefaultCondition definition. Can be either a transition or end definition */ Defaultconditiondef;
  /**
   * Unique Name of a workflow state which is responsible for compensation of this state
   */
  compensatedBy?: string;
  /**
   * If true, this state is used to compensate another state. Default is false
   */
  usedForCompensation?: boolean;
  metadata?: /* Metadata information */ Metadata;

  /**
   * Normalize the value of each property by recursively deleting properties whose value is equal to its default value. Does not modify the object state.
   * @returns {Specification.Eventbasedswitch} without deleted properties.
   */
  normalize = (): Eventbasedswitchstate => {
    const clone = new Eventbasedswitchstate(this);

    normalizeEventConditions(clone);
    normalizeOnErrors(clone);
    normalizeDefaultCondition(clone);
    normalizeUsedForCompensation(clone, this.sourceModel);

    cleanSourceModelProperty(clone);
    return clone;
  };
}
