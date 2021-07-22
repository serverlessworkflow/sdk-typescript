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
import { Metadata } from './metadata';
import { Statedatafilter } from './statedatafilter';
import { Transition } from './transition';
import {
  normalizeEndIfObject,
  normalizeTransitionIfObject,
  normalizeUsedForCompensation,
  overwriteEndIfObject,
  overwriteMetadata,
  overwritePropertyAsPlainType,
  overwriteStateDataFilter,
  overwriteTransitionIfObject,
  setEndValueIfNoTransition,
} from './utils';
import { StateExecTimeout } from './types';

export class Injectstate {
  constructor(model: any) {
    const defaultModel = { type: 'inject', usedForCompensation: false };
    Object.assign(this, defaultModel, model);

    overwriteEndIfObject(this);
    overwritePropertyAsPlainType('data', this);
    overwritePropertyAsPlainType('timeouts', this);
    overwriteStateDataFilter(this);
    overwriteTransitionIfObject(this);
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
  type?: 'inject';
  /**
   * State end definition
   */
  end?: boolean | End;
  /**
   * JSON object which can be set as states data input and can be manipulated via filters
   */
  data?: {
    [key: string]: any;
  };
  /**
   * State specific timeouts
   */
  timeouts?: {
    stateExecTimeout?: /* State execution timeout duration (ISO 8601 duration format) */ StateExecTimeout;
  };
  /**
   * State data filter
   */
  stateDataFilter?: Statedatafilter;
  /**
   * Next transition of the workflow after injection has completed
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
   * @returns {Specification.Injectstate} without deleted properties.
   */
  normalize = (): Injectstate => {
    const clone = new Injectstate(this);

    normalizeEndIfObject(clone);
    normalizeTransitionIfObject(clone);
    normalizeUsedForCompensation(clone);
    setEndValueIfNoTransition(clone);

    return clone;
  };
}
