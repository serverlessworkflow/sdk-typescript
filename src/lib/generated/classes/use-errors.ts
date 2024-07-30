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

import { _Error } from './error';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHook } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { deepCopy, isObject } from '../../utils';

class UseErrors extends ObjectHydrator<Specification.UseErrors> {
  constructor(model?: Partial<Specification.UseErrors>) {
    super(model);
    const self = this as unknown as Specification.UseErrors & object;
    if (isObject(model)) {
      const knownProperties: string[] = [];
      Object.entries(model)
        .filter(([key]) => !knownProperties.includes(key))
        .forEach(([key, value]) => {
          self[key] = new _Error(value);
        });
    }
    getLifecycleHook('UseErrors')?.constructor?.(this);
  }

  validate() {
    const copy = new UseErrors(this as any) as UseErrors & Specification.UseErrors;
    getLifecycleHook('UseErrors')?.preValidation?.(copy);
    validate('UseErrors', deepCopy(copy)); // deepCopy prevents potential additional properties error for constructor, validate, normalize
    getLifecycleHook('UseErrors')?.postValidation?.(copy);
  }

  normalize(): UseErrors & Specification.UseErrors {
    const copy = new UseErrors(this as any) as UseErrors & Specification.UseErrors;
    return getLifecycleHook('UseErrors')?.normalize?.(copy) || copy;
  }
}

export const _UseErrors = UseErrors as {
  new (model?: Partial<Specification.UseErrors>): UseErrors & Specification.UseErrors;
};
