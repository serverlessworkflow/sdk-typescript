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
import { Metadata } from './metadata';
import { Transition } from './transition';
import {
  cleanSourceModelProperty,
  normalizeEnd,
  normalizeTransition,
  overwriteEnd,
  overwriteMetadata,
  overwriteTransition,
  setEndValueIfNoTransition,
} from './utils';

export class Sleepstate {
  sourceModel?: Sleepstate;
  /**
   * State name
   */
  name?: string;
  /**
   * State type
   */
  type: 'sleep';
  end?: End;
  /**
   * Duration (ISO 8601 duration format) to sleep
   */
  duration?: string;

  transition?: string | Transition;

  metadata?: /* Metadata information */ Metadata;

  constructor(model: any) {
    this.sourceModel = Object.assign({}, model);

    const defaultModel = {
      id: undefined,
      name: undefined,
      type: 'sleep',
    };
    Object.assign(this, defaultModel, model);

    overwriteEnd(this);
    overwriteTransition(this);
    overwriteMetadata(this);
  }

  /**
   * Normalize the value of each property by recursively deleting properties whose value is equal to its default value. Does not modify the object state.
   * @returns {Specification.Delaystate} without deleted properties.
   */
  normalize = (): Sleepstate => {
    const clone = new Sleepstate(this);

    normalizeEnd(clone);
    normalizeTransition(clone);
    setEndValueIfNoTransition(clone);

    cleanSourceModelProperty(clone);

    return clone;
  };
}
