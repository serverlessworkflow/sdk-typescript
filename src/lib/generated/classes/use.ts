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

/*****************************************************************************************
 *
 * /!\ This file is computer generated. Any manual modification can and will be lost. /!\
 *
 *****************************************************************************************/

import { _UseAuthentications } from './use-authentications';
import { _UseErrors } from './use-errors';
import { _UseExtensions } from './use-extensions';
import { _UseFunctions } from './use-functions';
import { _UseRetries } from './use-retries';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHook } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { deepCopy, isObject } from '../../utils';

class Use extends ObjectHydrator<Specification.Use> {
  constructor(model?: Partial<Specification.Use>) {
    super(model);
    const self = this as unknown as Specification.Use & object;
    if (isObject(model)) {
      if (typeof model.authentications === 'object')
        self.authentications = new _UseAuthentications(model.authentications);
      if (typeof model.errors === 'object') self.errors = new _UseErrors(model.errors);
      if (typeof model.extensions === 'object') self.extensions = new _UseExtensions(model.extensions);
      if (typeof model.functions === 'object') self.functions = new _UseFunctions(model.functions);
      if (typeof model.retries === 'object') self.retries = new _UseRetries(model.retries);
    }
    getLifecycleHook('Use')?.constructor?.(this);
  }

  validate() {
    const copy = new Use(this as any) as Use & Specification.Use;
    getLifecycleHook('Use')?.preValidation?.(copy);
    validate('Use', deepCopy(copy)); // deepCopy prevents potential additional properties error for constructor, validate, normalize
    getLifecycleHook('Use')?.postValidation?.(copy);
  }

  normalize(): Use & Specification.Use {
    const copy = new Use(this as any) as Use & Specification.Use;
    return getLifecycleHook('Use')?.normalize?.(copy) || copy;
  }
}

export const _Use = Use as {
  new (model?: Partial<Specification.Use>): Use & Specification.Use;
};
