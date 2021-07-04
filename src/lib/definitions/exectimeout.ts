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

import { normalizeInterruptProperty } from './utils';

export class Exectimeout {
  constructor(model: any) {
    Object.assign(this, model);
  }

  /**
   * Timeout duration (ISO 8601 duration format)
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

  /**
   * Normalize the value of each property by recursively deleting properties whose value is equal to its default value. Does not modify the object state.
   * @returns {Specification.Exectimeout} without deleted properties.
   */
  normalize(): Exectimeout {
    const clone = new Exectimeout(this);

    normalizeInterruptProperty(clone);

    return clone;
  }
}
