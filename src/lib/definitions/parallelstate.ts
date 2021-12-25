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

import { Branch } from './branch';
import { End } from './end';
import { Error } from './error';
import { Metadata } from './metadata';
import { Statedatafilter } from './statedatafilter';
import { Transition } from './transition';
import {
  cleanSourceModelProperty,
  normalizeBranches,
  normalizeCompletionType,
  normalizeEnd,
  normalizeOnErrors,
  normalizeTransition,
  normalizeUsedForCompensation,
  overwriteBranches,
  overwriteEnd,
  overwriteMetadata,
  overwriteOnErrors,
  overwriteStateDataFilter,
  overwriteTimeoutWithStateExecTimeout,
  overwriteTransition,
  setEndValueIfNoTransition,
} from './utils';
import { BranchExecTimeout } from './types';
import { StateExecTimeout } from './stateExecTimeout';

export class Parallelstate {
  sourceModel?: Parallelstate;
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
  type?: 'parallel';
  /**
   * State end definition
   */
  end?: boolean | End;
  /**
   * State data filter
   */
  stateDataFilter?: Statedatafilter;
  /**
   * State specific timeouts
   */
  timeouts?: {
    stateExecTimeout?: StateExecTimeout;
    branchExecTimeout?: /* Single branch execution timeout duration (ISO 8601 duration format) */ BranchExecTimeout;
  };
  /**
   * Branch Definitions
   */
  branches?: /* Branch Definition */ Branch[];
  /**
   * Option types on how to complete branch execution.
   */
  completionType?: 'allOf' | 'atLeast';
  /**
   * Used when completionType is set to 'atLeast' to specify the minimum number of branches that must complete before the state will transition.
   */
  numCompleted?: number | string;
  /**
   * States error handling definitions
   */
  onErrors?: Error[];
  /**
   * Next transition of the workflow after all branches have completed execution
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
      type: 'parallel',
      completionType: 'allOf',
      usedForCompensation: false,
    };
    Object.assign(this, defaultModel, model);

    overwriteEnd(this);
    overwriteStateDataFilter(this);
    overwriteTimeoutWithStateExecTimeout(this);
    overwriteBranches(this);
    overwriteOnErrors(this);
    overwriteTransition(this);
    overwriteMetadata(this);
  }

  /**
   * Normalize the value of each property by recursively deleting properties whose value is equal to its default value. Does not modify the object state.
   * @returns {Specification.Parallelstate} without deleted properties.
   */
  normalize = (): Parallelstate => {
    const clone = new Parallelstate(this);

    normalizeEnd(clone);
    normalizeBranches(clone);
    normalizeCompletionType(clone, this.sourceModel);
    normalizeOnErrors(clone);
    normalizeTransition(clone);
    normalizeUsedForCompensation(clone, this.sourceModel);
    setEndValueIfNoTransition(clone);

    cleanSourceModelProperty(clone);

    return clone;
  };
}
