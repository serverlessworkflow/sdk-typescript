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

import { _RetryPolicy } from './retry-policy';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHook } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { deepCopy, isObject } from '../../utils';

class UseRetries extends ObjectHydrator<Specification.UseRetries> {
  constructor(model?: Partial<Specification.UseRetries>) {
    super(model);
    const self = this as unknown as Specification.UseRetries & object;
    if (isObject(model)) {
      const knownProperties: string[] = [];
      Object.entries(model)
        .filter(([key]) => !knownProperties.includes(key))
        .forEach(([key, value]) => {
          self[key] = new _RetryPolicy(value);
        });
    }
    getLifecycleHook('UseRetries')?.constructor?.(this);
  }

  validate() {
    const copy = new UseRetries(this as any) as UseRetries & Specification.UseRetries;
    getLifecycleHook('UseRetries')?.preValidation?.(copy);
    validate('UseRetries', deepCopy(copy)); // deepCopy prevents potential additional properties error for constructor, validate, normalize
    getLifecycleHook('UseRetries')?.postValidation?.(copy);
  }

  normalize(): UseRetries & Specification.UseRetries {
    const copy = new UseRetries(this as any) as UseRetries & Specification.UseRetries;
    return getLifecycleHook('UseRetries')?.normalize?.(copy) || copy;
  }
}

export const _UseRetries = UseRetries as {
  new (model?: Partial<Specification.UseRetries>): UseRetries & Specification.UseRetries;
};
