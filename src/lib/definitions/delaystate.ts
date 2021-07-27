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

import { End } from './end';
import { Error } from './error';
import { Metadata } from './metadata';
import { Statedatafilter } from './statedatafilter';
import { Transition } from './transition';
import {
  normalizeEndIfObject,
  normalizeOnErrors,
  normalizeTransitionIfObject,
  normalizeUsedForCompensation,
  overwriteEndIfObject,
  overwriteMetadata,
  overwriteOnErrors,
  overwriteStateDataFilter,
  overwritePropertyAsPlainType,
  overwriteTransitionIfObject,
  setEndValueIfNoTransition,
} from './utils';
import { StateExecTimeout } from './types';

export class Delaystate {
  constructor(model: any) {
    const defaultModel = {
      type: 'delay',
      usedForCompensation: false,
    };
    Object.assign(this, defaultModel, model);

    overwriteEndIfObject(this);
    overwriteStateDataFilter(this);
    overwritePropertyAsPlainType('timeouts', this);
    overwriteOnErrors(this);
    overwriteTransitionIfObject(this);
    overwriteMetadata(this);
  }

  /**
   * Unique State id
   */
  id?: string;
  /**
   * State name
   */
  name?: string;
  /**
   * State type
   */
  type?: 'delay';
  /**
   * State end definition
   */
  end?: boolean | End;
  /**
   * State data filter
   */
  stateDataFilter?: Statedatafilter;
  /**
   * Amount of time (ISO 8601 format) to delay
   */
  timeDelay?: string;
  /**
   * State specific timeouts
   */
  timeouts?: {
    stateExecTimeout?: /* State execution timeout duration (ISO 8601 duration format) */ StateExecTimeout;
  };
  /**
   * States error handling and retries definitions
   */
  onErrors?: Error[];
  /**
   * Next transition of the workflow after the time delay
   */
  transition?: string | Transition;
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
   * @returns {Specification.Delaystate} without deleted properties.
   */
  normalize = (): Delaystate => {
    const clone = new Delaystate(this);

    normalizeEndIfObject(clone);
    normalizeOnErrors(clone);
    normalizeTransitionIfObject(clone);
    normalizeUsedForCompensation(clone);
    setEndValueIfNoTransition(clone);
    return clone;
  };
}
