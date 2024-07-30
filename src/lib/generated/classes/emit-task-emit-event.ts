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

import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHook } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { deepCopy } from '../../utils';

class EmitTaskEmitEvent extends ObjectHydrator<Specification.EmitTaskEmitEvent> {
  constructor(model?: Partial<Specification.EmitTaskEmitEvent>) {
    super(model);

    getLifecycleHook('EmitTaskEmitEvent')?.constructor?.(this);
  }

  validate() {
    const copy = new EmitTaskEmitEvent(this as any) as EmitTaskEmitEvent & Specification.EmitTaskEmitEvent;
    getLifecycleHook('EmitTaskEmitEvent')?.preValidation?.(copy);
    validate('EmitTaskEmitEvent', deepCopy(copy)); // deepCopy prevents potential additional properties error for constructor, validate, normalize
    getLifecycleHook('EmitTaskEmitEvent')?.postValidation?.(copy);
  }

  normalize(): EmitTaskEmitEvent & Specification.EmitTaskEmitEvent {
    const copy = new EmitTaskEmitEvent(this as any) as EmitTaskEmitEvent & Specification.EmitTaskEmitEvent;
    return getLifecycleHook('EmitTaskEmitEvent')?.normalize?.(copy) || copy;
  }
}

export const _EmitTaskEmitEvent = EmitTaskEmitEvent as {
  new (model?: Partial<Specification.EmitTaskEmitEvent>): EmitTaskEmitEvent & Specification.EmitTaskEmitEvent;
};
