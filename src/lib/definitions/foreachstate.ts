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
import { Metadata } from './metadata';
import { Statedatafilter } from './statedatafilter';
import { Transition } from './transition';
import {
  cleanSourceModelProperty,
  normalizeActions,
  normalizeEnd,
  normalizeMode,
  normalizeOnErrors,
  normalizeTransition,
  normalizeUsedForCompensation,
  overwriteActions,
  overwriteEnd,
  overwriteMetadata,
  overwriteOnErrors,
  overwriteStateDataFilter,
  overwritePropertyAsPlainType,
  overwriteTransition,
  setEndValueIfNoTransition,
} from './utils';
import { ActionExecTimeout, StateExecTimeout } from './types';

export class Foreachstate {
  sourceModel?: Foreachstate;
  /**
   * State name
   */
  name?: string;
  /**
   * State type
   */
  type?: 'foreach';
  /**
   * State end definition
   */
  end?: boolean | End;
  /**
   * Workflow expression selecting an array element of the states data
   */
  inputCollection?: string;
  /**
   * Workflow expression specifying an array element of the states data to add the results of each iteration
   */
  outputCollection?: string;
  /**
   * Name of the iteration parameter that can be referenced in actions/workflow. For each parallel iteration, this param should contain an unique element of the inputCollection array
   */
  iterationParam?: string;
  /**
   * Specifies how many iterations may run in parallel at the same time. Used if 'mode' property is set to 'parallel' (default)
   */
  batchSize?: number | string;
  /**
   * Actions to be executed for each of the elements of inputCollection
   */
  actions?: Action[];
  /**
   * State specific timeouts
   */
  timeouts?: {
    stateExecTimeout?: /* Workflow state execution timeout duration (ISO 8601 duration format) */ StateExecTimeout;
    actionExecTimeout?: /* Action execution timeout duration (ISO 8601 duration format) */ ActionExecTimeout;
  };
  /**
   * State data filter
   */
  stateDataFilter?: Statedatafilter;
  /**
   * States error handling definitions
   */
  onErrors?: Error[];
  /**
   * Next transition of the workflow after state has completed
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
  /**
   * Specifies how iterations are to be performed (sequentially or in parallel)
   */
  mode?: 'sequential' | 'parallel';
  metadata?: /* Metadata information */ Metadata;

  constructor(model: any) {
    this.sourceModel = Object.assign({}, model);

    const defaultModel = {
      id: undefined,
      name: undefined,
      type: 'foreach',
      usedForCompensation: false,
      mode: 'parallel',
    };
    Object.assign(this, defaultModel, model);

    overwriteEnd(this);
    overwriteActions(this);
    overwritePropertyAsPlainType('timeouts', this);
    overwriteStateDataFilter(this);
    overwriteOnErrors(this);
    overwriteTransition(this);
    overwriteMetadata(this);
  }

  /**
   * Normalize the value of each property by recursively deleting properties whose value is equal to its default value. Does not modify the object state.
   * @returns {Specification.Foreachstate} without deleted properties.
   */
  normalize = (): Foreachstate => {
    const clone = new Foreachstate(this);

    normalizeEnd(clone);
    normalizeActions(clone);
    normalizeOnErrors(clone);
    normalizeTransition(clone);
    normalizeUsedForCompensation(clone, this.sourceModel);
    normalizeMode(clone, this.sourceModel);
    setEndValueIfNoTransition(clone);

    cleanSourceModelProperty(clone);

    return clone;
  };
}
