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
import { Specification } from '.';

import { Action } from './action';
import { End } from './end';
import { Error } from './error';
import { Eventdatafilter } from './eventdatafilter';
import { Metadata } from './metadata';
import { Statedatafilter } from './statedatafilter';
import { Transition } from './transition';
import {
  normalizeEndProperty,
  normalizeOnErrorsProperty,
  normalizeTransitionProperty,
  normalizeUsedForCompensationProperty,
  overwriteActionValue,
  overwriteEndValueIfObject,
  overwriteEventDataFilterValue,
  overwriteMetadataValue,
  overwriteOnErrorsValue,
  overwriteStateDataFilterValue,
  overwriteTransitionValueIfObject,
  setEndValueIfNoTransition,
} from './utils';

export class Callbackstate {
  constructor(model: any) {
    const defaultModel = { type: 'callback' } as Specification.Callbackstate;
    Object.assign(this, defaultModel, model);

    overwriteActionValue(this);
    overwriteEndValueIfObject(this);
    overwriteEventDataFilterValue(this);
    overwriteMetadataValue(this);
    overwriteOnErrorsValue(this);
    overwriteStateDataFilterValue(this);
    overwriteTransitionValueIfObject(this);
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
   * Time period to wait for incoming events (ISO 8601 format)
   */
  timeout?: string;
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

    normalizeUsedForCompensationProperty(clone);
    normalizeEndProperty(clone);
    normalizeTransitionProperty(clone);
    normalizeOnErrorsProperty(clone);

    setEndValueIfNoTransition(clone);

    return clone;
  };
}
