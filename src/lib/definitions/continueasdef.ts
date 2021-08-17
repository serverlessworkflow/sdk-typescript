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
 *
 */

import { WorkflowExecTimeout } from './workflowExecTimeout';
import { normalizeWorkflowExecTimeout, overwritePropertyAsPlainType, overwriteWorkflowExecTimeout } from './utils';

export class Continueasdef {
  constructor(model: any) {
    Object.assign(this, model);
    overwriteWorkflowExecTimeout(this);
    overwritePropertyAsPlainType('data', this);
  }

  /**
   * Unique id of the workflow to continue execution as
   */
  workflowId: string;
  /**
   * Version of the workflow to continue execution as
   */
  version?: string;
  /**
   * If string type, an expression which selects parts of the states data output to become the workflow data input of continued execution. If object type, a custom object to become the workflow data input of the continued execution
   */
  data?:
    | string
    | {
        [key: string]: any;
      };
  /**
   * Workflow execution timeout to be used by the workflow continuing execution. Overwrites any specific settings set by that workflow
   */
  workflowExecTimeout?: WorkflowExecTimeout;

  /**
   * Normalize the value of each property by recursively deleting properties whose value is equal to its default value. Does not modify the object state.
   * @returns {Specification.Exectimeout} without deleted properties.
   */
  normalize = (): Continueasdef => {
    const clone = new Continueasdef(this);
    normalizeWorkflowExecTimeout(clone);
    return clone;
  };
}
