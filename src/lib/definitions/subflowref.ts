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

import { Specification } from './index';
import { normalizeWaitForCompletion } from './utils';

export class Subflowref {
  constructor(model: any) {
    const defaultModel = { waitForCompletion: true } as Specification.Subflowref;

    Object.assign(this, defaultModel, model);
  }

  /**
   * Workflow execution must wait for sub-workflow to finish before continuing
   */
  waitForCompletion?: boolean;
  /**
   * Unique id of the sub-workflow to be invoked
   */
  workflowId: string;
  /**
   * Version of the sub-workflow to be invoked
   */
  version?: string;

  /**
   * Normalize the value of each property by recursively deleting properties whose value is equal to its default value. Does not modify the object state.
   * @returns {Specification.Subflowref} without deleted properties.
   */
  normalize = (): Subflowref => {
    const clone = new Subflowref(this);

    normalizeWaitForCompletion(clone);

    return clone;
  };
}
