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

import { _Task } from './task';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHook } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { deepCopy, isObject } from '../../utils';

class UseFunctions extends ObjectHydrator<Specification.UseFunctions> {
  constructor(model?: Partial<Specification.UseFunctions>) {
    super(model);
    const self = this as unknown as Specification.UseFunctions & object;
    if (isObject(model)) {
      const knownProperties: string[] = [];
      Object.entries(model)
        .filter(([key]) => !knownProperties.includes(key))
        .forEach(([key, value]) => {
          self[key] = new _Task(value);
        });
    }
    getLifecycleHook('UseFunctions')?.constructor?.(this);
  }

  validate() {
    const copy = new UseFunctions(this as any) as UseFunctions & Specification.UseFunctions;
    getLifecycleHook('UseFunctions')?.preValidation?.(copy);
    validate('UseFunctions', deepCopy(copy)); // deepCopy prevents potential additional properties error for constructor, validate, normalize
    getLifecycleHook('UseFunctions')?.postValidation?.(copy);
  }

  normalize(): UseFunctions & Specification.UseFunctions {
    const copy = new UseFunctions(this as any) as UseFunctions & Specification.UseFunctions;
    return getLifecycleHook('UseFunctions')?.normalize?.(copy) || copy;
  }
}

export const _UseFunctions = UseFunctions as {
  new (model?: Partial<Specification.UseFunctions>): UseFunctions & Specification.UseFunctions;
};
