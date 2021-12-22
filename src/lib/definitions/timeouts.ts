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
import { WorkflowExecTimeout } from './workflowExecTimeout';
import { ActionExecTimeout, BranchExecTimeout, EventTimeout } from './types';
import {
  cleanSourceModelProperty,
  normalizeWorkflowExecTimeout,
  overwriteStateExecTimeout,
  overwriteWorkflowExecTimeout,
} from './utils';
import { StateExecTimeout } from './stateExecTimeout';

export class Timeouts {
  sourceModel?: Timeouts;

  constructor(model: any) {
    this.sourceModel = Object.assign({}, model);

    Object.assign(this, model);
    overwriteWorkflowExecTimeout(this);
    overwriteStateExecTimeout(this);
  }

  workflowExecTimeout?: WorkflowExecTimeout;
  stateExecTimeout?: StateExecTimeout;
  actionExecTimeout?: /* Single actions definition execution timeout duration (ISO 8601 duration format) */ ActionExecTimeout;
  branchExecTimeout?: /* Single branch execution timeout duration (ISO 8601 duration format) */ BranchExecTimeout;
  eventTimeout?: /* Timeout duration to wait for consuming defined events (ISO 8601 duration format) */ EventTimeout;

  /**
   * Normalize the value of each property by recursively deleting properties whose value is equal to its default value. Does not modify the object state.
   * @returns {Specification.Exectimeout} without deleted properties.
   */
  normalize = (): Timeouts => {
    const clone = new Timeouts(this);
    normalizeWorkflowExecTimeout(clone);

    cleanSourceModelProperty(clone);
    return clone;
  };
}
