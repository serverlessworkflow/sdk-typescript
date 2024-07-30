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

import { _EmitTaskEmitEvent } from './emit-task-emit-event';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHook } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { deepCopy, isObject } from '../../utils';

class EmitTaskEmit extends ObjectHydrator<Specification.EmitTaskEmit> {
  constructor(model?: Partial<Specification.EmitTaskEmit>) {
    super(model);
    const self = this as unknown as Specification.EmitTaskEmit & object;
    if (isObject(model)) {
      if (typeof model.event === 'object') self.event = new _EmitTaskEmitEvent(model.event);
    }
    getLifecycleHook('EmitTaskEmit')?.constructor?.(this);
  }

  validate() {
    const copy = new EmitTaskEmit(this as any) as EmitTaskEmit & Specification.EmitTaskEmit;
    getLifecycleHook('EmitTaskEmit')?.preValidation?.(copy);
    validate('EmitTaskEmit', deepCopy(copy)); // deepCopy prevents potential additional properties error for constructor, validate, normalize
    getLifecycleHook('EmitTaskEmit')?.postValidation?.(copy);
  }

  normalize(): EmitTaskEmit & Specification.EmitTaskEmit {
    const copy = new EmitTaskEmit(this as any) as EmitTaskEmit & Specification.EmitTaskEmit;
    return getLifecycleHook('EmitTaskEmit')?.normalize?.(copy) || copy;
  }
}

export const _EmitTaskEmit = EmitTaskEmit as {
  new (model?: Partial<Specification.EmitTaskEmit>): EmitTaskEmit & Specification.EmitTaskEmit;
};
