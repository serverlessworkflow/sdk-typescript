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

import { cleanSourceModelProperty, normalizeInvoke, overwritePropertyAsPlainType } from './utils';

export class Functionref {
  sourceModel?: Functionref;

  constructor(model: any) {
    this.sourceModel = Object.assign({}, model);

    Object.assign(this, model);
    overwritePropertyAsPlainType('arguments', this);
  }

  /**
   * Name of the referenced function
   */
  refName: string;
  /**
   * Function arguments/inputs
   */
  arguments?: {
    [key: string]: any;
  };
  /**
   * Only used if function type is 'graphql'. A string containing a valid GraphQL selection set
   */
  selectionSet?: string;
  /**
   * Specifies if the function should be invoked sync or async
   */
  invoke?: 'sync' | 'async';

  /**
   * Normalize the value of each property by recursively deleting properties whose value is equal to its default value. Does not modify the object state.
   * @returns {Specification.Functionref} without deleted properties.
   */
  normalize = (): Functionref => {
    const clone = new Functionref(this);

    normalizeInvoke(clone, this.sourceModel);

    cleanSourceModelProperty(clone);

    return clone;
  };
}
