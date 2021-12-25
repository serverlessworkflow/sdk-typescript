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
import { Produceeventdef } from './produceeventdef';
import {
  cleanSourceModelProperty,
  normalizeCompensate,
  normalizeContinueAs,
  normalizeTerminate,
  overwriteContinueAs,
  overwriteProduceEvents,
} from './utils';
import { Continueasdef } from './continueasdef';

export class End {
  sourceModel?: End;
  /**
   * If true, completes all execution flows in the given workflow instance
   */
  terminate?: boolean;
  /**
   * Defines events that should be produced
   */
  produceEvents?: /* Produce an event and set its data */ Produceeventdef[];
  /**
   * If set to true, triggers workflow compensation. Default is false
   */
  compensate?: boolean;
  continueAs?: string | Continueasdef;

  constructor(model: any) {
    this.sourceModel = Object.assign({}, model);

    const defaultModel = {
      compensate: false,
      terminate: false,
    };
    Object.assign(this, defaultModel, model);

    overwriteProduceEvents(this);
    overwriteContinueAs(this);
  }

  /**
   * Normalize the value of each property by recursively deleting properties whose value is equal to its default value. Does not modify the object state.
   * @returns {Specification.End} without deleted properties.
   */
  normalize = (): End => {
    const clone = new End(this);

    normalizeCompensate(clone, this.sourceModel);
    normalizeTerminate(clone, this.sourceModel);
    normalizeContinueAs(clone);

    cleanSourceModelProperty(clone);
    return clone;
  };
}
