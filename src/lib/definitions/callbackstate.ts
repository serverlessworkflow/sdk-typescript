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
import { End } from './end';
import { Error } from './error';
import { Eventdatafilter } from './eventdatafilter';
import { Metadata } from './metadata';
import { Statedatafilter } from './statedatafilter';
import { Transition } from './transition';
import {
  normalizeAction,
  normalizeEndIfObject,
  normalizeOnErrors,
  normalizeTransitionIfObject,
  normalizeUsedForCompensation,
  overwriteAction,
  overwriteEndIfObject,
  overwriteEventDataFilter,
  overwriteMetadata,
  overwriteOnErrors,
  overwritePropertyAsPlainType,
  overwriteStateDataFilter,
  overwriteTransitionIfObject,
  setEndValueIfNoTransition,
} from './utils';
import { ActionExecTimeout, EventTimeout, StateExecTimeout } from './types';

export class Callbackstate {
  constructor(model: any) {
    const defaultModel = { type: 'callback', usedForCompensation: false };
    Object.assign(this, defaultModel, model);

    overwriteAction(this);
    overwritePropertyAsPlainType('timeouts', this);
    overwriteEventDataFilter(this);
    overwriteStateDataFilter(this);
    overwriteOnErrors(this);
    overwriteTransitionIfObject(this);
    overwriteEndIfObject(this);
    overwriteMetadata(this);
  }

  /**
   * Unique state id
   */
  id?: string;
  /**
   * State name
   */
  name?: string;
  /**
   * State type
   */
  type?: 'callback';
  /**
   * Defines the action to be executed
   */
  action?: Action;
  /**
   * References an unique callback event name in the defined workflow events
   */
  eventRef?: string;
  /**
   * State specific timeouts
   */
  timeouts?: {
    stateExecTimeout?: /* State execution timeout duration (ISO 8601 duration format) */ StateExecTimeout;
    actionExecTimeout?: /* Single actions definition execution timeout duration (ISO 8601 duration format) */ ActionExecTimeout;
    eventTimeout?: /* Timeout duration to wait for consuming defined events (ISO 8601 duration format) */ EventTimeout;
  };
  /**
   * Event data filter
   */
  eventDataFilter?: Eventdatafilter;
  /**
   * State data filter
   */
  stateDataFilter?: Statedatafilter;
  /**
   * States error handling and retries definitions
   */
  onErrors?: Error[];
  /**
   * Next transition of the workflow after all the actions have been performed
   */
  transition?: string | Transition;
  /**
   * State end definition
   */
  end?: boolean | End;
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
   * @returns {Specification.Callbackstate} without deleted properties.
   */
  normalize = (): Callbackstate => {
    const clone = new Callbackstate(this);

    normalizeAction(clone);
    normalizeOnErrors(clone);
    normalizeTransitionIfObject(clone);
    normalizeEndIfObject(clone);
    normalizeUsedForCompensation(clone);
    setEndValueIfNoTransition(clone);

    return clone;
  };
}
