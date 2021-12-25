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
import { cleanSourceModelProperty, normalizeActions, overwriteActions, overwritePropertyAsPlainType } from './utils';
import { ActionExecTimeout, BranchExecTimeout } from './types';

export class Branch /* Branch Definition */ {
  sourceModel?: Branch;
  /**
   * Branch name
   */
  name: string;
  /**
   * State specific timeouts
   */
  timeouts?: {
    actionExecTimeout?: /* Single actions definition execution timeout duration (ISO 8601 duration format) */ ActionExecTimeout;
    branchExecTimeout?: /* Single branch execution timeout duration (ISO 8601 duration format) */ BranchExecTimeout;
  };
  /**
   * Actions to be executed in this branch
   */
  actions: Action[];

  constructor(model: any) {
    this.sourceModel = Object.assign({}, model);

    Object.assign(this, model);
    overwriteActions(this);
    overwritePropertyAsPlainType('timeouts', this);
  }

  /**
   * Normalize the value of each property by recursively deleting properties whose value is equal to its default value. Does not modify the object state.
   * @returns {Specification.Branch} without deleted properties.
   */
  normalize = (): Branch => {
    const clone = new Branch(this);
    normalizeActions(clone);

    cleanSourceModelProperty(clone);
    return clone;
  };
}
