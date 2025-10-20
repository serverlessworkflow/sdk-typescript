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

import { IEnd, End } from './end';
import { IError, Error } from './error';
import { IMetadata, Metadata } from './metadata';
import { IStatedatafilter, Statedatafilter } from './statedatafilter';
import { ITransition, Transition } from './transition';
import {
  cleanSourceModelProperty,
  isPlainObject,
  normalizeEnd,
  normalizeOnErrors,
  normalizeTransition,
  normalizeUsedForCompensation,
  overwriteEnd,
  overwriteMetadata,
  overwriteOnErrors,
  overwriteStateDataFilter,
  overwriteTimeoutWithStateExecTimeout,
  overwriteTransition,
  setEndValueIfNoTransition,
} from './utils';
import { IStateExecTimeout, StateExecTimeout } from './stateExecTimeout';
import toPlainObject from 'lodash.toplainobject';

export interface ISleepstate {
  sourceModel?: ISleepstate;
  id?: string;
  name?: string;
  type?: 'sleep';
  end?: boolean | IEnd;
  stateDataFilter?: IStatedatafilter;
  duration?: string;
  timeouts?: {
    stateExecTimeout?: IStateExecTimeout;
  };
  onErrors?: IError[];
  transition?: string | ITransition;
  compensatedBy?: string;
  usedForCompensation?: boolean;
  metadata?: IMetadata;

  normalize(): ISleepstate;
  asPlainObject(): ISleepstate;
}

export class Sleepstate implements ISleepstate {
  sourceModel?: Sleepstate;
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
  type?: 'sleep';
  /**
   * State end definition
   */
  end?: boolean | End;
  /**
   * State data filter
   */
  stateDataFilter?: Statedatafilter;
  /**
   * Duration (ISO 8601 duration format) to sleep
   */
  duration?: string;
  /**
   * State specific timeouts
   */
  timeouts?: {
    stateExecTimeout?: StateExecTimeout;
  };
  /**
   * States error handling definitions
   */
  onErrors?: Error[];
  /**
   * Next transition of the workflow after the workflow sleep
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

  constructor(model: any) {
    this.sourceModel = Object.assign({}, model);

    const defaultModel = {
      id: undefined,
      name: undefined,
      type: 'sleep',
      usedForCompensation: false,
    };
    Object.assign(this, defaultModel, model);

    overwriteEnd(this);
    overwriteStateDataFilter(this);
    overwriteTimeoutWithStateExecTimeout(this);
    overwriteOnErrors(this);
    overwriteTransition(this);
    overwriteMetadata(this);
  }

  /**
   * Normalize the value of each property by recursively deleting properties whose value is equal to its default value. Does not modify the object state.
   * @returns {Specification.ISleepstate} without deleted properties.
   */
  normalize(): ISleepstate {
    const clone = new Sleepstate(this);

    normalizeEnd(clone);
    normalizeOnErrors(clone);
    normalizeTransition(clone);
    normalizeUsedForCompensation(clone, this.sourceModel);
    setEndValueIfNoTransition(clone);

    cleanSourceModelProperty(clone);

    if (isPlainObject(this)) {
      return toPlainObject(clone);
    }

    return clone;
  }

  /**
   * Create a shallow copy as plain object
   * @returns {Specification.ISleepstate} as plain object.
   */
  asPlainObject(): ISleepstate {
    return toPlainObject(this);
  }
}
