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
import { End } from './end';
import { Metadata } from './metadata';
import { Statedatafilter } from './statedatafilter';
import { Transition } from './transition';
import {
  normalizeEndProperty,
  normalizeTransitionProperty,
  normalizeUsedForCompensationProperty,
  overwriteEndValueIfObject,
  overwriteMetadataValue,
  overwriteStateDataFilterValue,
  overwriteTransitionValueIfObject,
  setEndValueIfNoTransition,
} from './utils';

export class Injectstate {
  constructor(model: any) {
    const defaultModel = { type: 'inject', usedForCompensation: false };
    Object.assign(this, defaultModel, model);

    overwriteEndValueIfObject(this);
    overwriteStateDataFilterValue(this);
    overwriteTransitionValueIfObject(this);
    overwriteMetadataValue(this);
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
   * State data filter
   */
  stateDataFilter?: Statedatafilter;
  /**
   * Next transition of the workflow after subflow has completed
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
  normalize(): Injectstate {
    const clone = new Injectstate(this);

    normalizeUsedForCompensationProperty(clone);
    normalizeEndProperty(clone);
    normalizeTransitionProperty(clone);

    setEndValueIfNoTransition(clone);

    return clone;
  }
}
