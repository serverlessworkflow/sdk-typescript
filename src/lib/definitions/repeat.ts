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

import { normalizeCheckBeforeProperty, normalizeContinueOnErrorProperty } from './utils';

export class Repeat {
  constructor(model: any) {
    const defaultModel = {
      continueOnError: false,
      checkBefore: false,
    };
    Object.assign(this, defaultModel, model);
  }

  /**
   * Expression evaluated against SubFlow state data. SubFlow will repeat execution as long as this expression is true or until the max property count is reached
   */
  expression?: string;
  /**
   * If true, the expression is evaluated before each repeat execution, if false the expression is evaluated after each repeat execution
   */
  checkBefore?: boolean;
  /**
   * Sets the maximum amount of repeat executions
   */
  max?: number;
  /**
   * If true, repeats executions in a case unhandled errors propagate from the sub-workflow to this state
   */
  continueOnError?: boolean;
  /**
   * List referencing defined consumed workflow events. SubFlow will repeat execution until one of the defined events is consumed, or until the max property count is reached
   */
  stopOnEvents?: [string, ...string[]];

  /**
   * Normalize the value of each property by recursively deleting properties whose value is equal to its default value. Does not modify the object state.
   * @returns {Specification.Repeat} without deleted properties.
   */
  normalize = (): Repeat => {
    const clone = new Repeat(this);

    normalizeContinueOnErrorProperty(clone);
    normalizeCheckBeforeProperty(clone);

    return clone;
  };
}
