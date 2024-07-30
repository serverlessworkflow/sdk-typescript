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

class RaiseTaskRaise extends ObjectHydrator<Specification.RaiseTaskRaise> {
  constructor(model?: Partial<Specification.RaiseTaskRaise>) {
    super(model);
    const self = this as unknown as Specification.RaiseTaskRaise & object;
    if (isObject(model)) {
      if (typeof model.error === 'object') self.error = new _Error(model.error);
    }
    getLifecycleHook('RaiseTaskRaise')?.constructor?.(this);
  }

  validate() {
    const copy = new RaiseTaskRaise(this as any) as RaiseTaskRaise & Specification.RaiseTaskRaise;
    getLifecycleHook('RaiseTaskRaise')?.preValidation?.(copy);
    validate('RaiseTaskRaise', deepCopy(copy)); // deepCopy prevents potential additional properties error for constructor, validate, normalize
    getLifecycleHook('RaiseTaskRaise')?.postValidation?.(copy);
  }

  normalize(): RaiseTaskRaise & Specification.RaiseTaskRaise {
    const copy = new RaiseTaskRaise(this as any) as RaiseTaskRaise & Specification.RaiseTaskRaise;
    return getLifecycleHook('RaiseTaskRaise')?.normalize?.(copy) || copy;
  }
}

export const _RaiseTaskRaise = RaiseTaskRaise as {
  new (model?: Partial<Specification.RaiseTaskRaise>): RaiseTaskRaise & Specification.RaiseTaskRaise;
};
