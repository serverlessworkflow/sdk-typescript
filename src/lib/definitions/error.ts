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
import { End } from './end';
import { Transition } from './transition';
import {
  normalizeEndProperty,
  normalizeTransitionProperty,
  overwriteEndValueIfObject,
  overwriteTransitionValueIfObject,
  setEndValueIfNoTransition,
} from './utils';

export class Error {
  constructor(model: any) {
    Object.assign(this, model);

    overwriteTransitionValueIfObject(this);
    overwriteEndValueIfObject(this);
  }

  /**
   * Domain-specific error name, or '*' to indicate all possible errors
   */
  error: string;
  /**
   * Error code. Can be used in addition to the name to help runtimes resolve to technical errors/exceptions. Should not be defined if error is set to '*'
   */
  code?: string;
  /**
   * References a unique name of a retry definition.
   */
  retryRef?: string;
  transition: string | Transition;
  end?: boolean | End;

  /**
   * Normalize the value of each property by recursively deleting properties whose value is equal to its default value. Does not modify the object state.
   * @returns {Specification.Error} without deleted properties.
   */
  normalize(): Error {
    const clone = new Error(this);

    normalizeEndProperty(clone);
    normalizeTransitionProperty(clone);

    setEndValueIfNoTransition(clone);

    return clone;
  }
}
