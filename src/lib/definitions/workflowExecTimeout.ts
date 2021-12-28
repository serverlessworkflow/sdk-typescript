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

import { cleanSourceModelProperty, normalizeInterrupt } from './utils';

export class WorkflowExecTimeout {
  sourceModel?: WorkflowExecTimeout;
  /**
   * Workflow execution timeout duration (ISO 8601 duration format). If not specified should be 'unlimited'
   */
  duration: string;
  /**
   * If `false`, workflow instance is allowed to finish current execution. If `true`, current workflow execution is abrupted.
   */
  interrupt?: boolean;
  /**
   * Name of a workflow state to be executed before workflow instance is terminated
   */
  runBefore?: string;

  constructor(model: any) {
    this.sourceModel = Object.assign({}, model);

    const defaultModel = { interrupt: true };
    Object.assign(this, defaultModel, model);
  }

  /**
   * Normalize the value of each property by recursively deleting properties whose value is equal to its default value. Does not modify the object state.
   * @returns {Specification.WorkflowExecTimeout} without deleted properties.
   */

  normalize = (): WorkflowExecTimeout => {
    const clone = new WorkflowExecTimeout(this);

    normalizeInterrupt(clone, this.sourceModel);

    cleanSourceModelProperty(clone);
    return clone;
  };
}
