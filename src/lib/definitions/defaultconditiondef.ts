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
  cleanSourceModelProperty,
  normalizeEnd,
  normalizeTransition,
  overwriteEnd,
  overwriteTransition,
  setEndValueIfNoTransition,
} from './utils';

export class Defaultconditiondef /* DefaultCondition definition. Can be either a transition or end definition */ {
  sourceModel?: Defaultconditiondef;
  /**
   * The optional name of the default condition, used solely for display purposes
   */
  name?: string;
  transition: string | Transition;
  end?: boolean | End;

  constructor(model: any) {
    this.sourceModel = Object.assign({}, model);

    Object.assign(this, model);

    overwriteTransition(this);
    overwriteEnd(this);
  }

  /**
   * Normalize the value of each property by recursively deleting properties whose value is equal to its default value. Does not modify the object state.
   * @returns {Specification.Defaultdef} without deleted properties.
   */
  normalize = (): Defaultconditiondef => {
    const clone = new Defaultconditiondef(this);

    normalizeEnd(clone);
    normalizeTransition(clone);
    setEndValueIfNoTransition(clone);

    cleanSourceModelProperty(clone);

    return clone;
  };
}
