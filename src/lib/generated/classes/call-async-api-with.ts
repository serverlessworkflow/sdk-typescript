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

class CallAsyncAPIWith extends ObjectHydrator<Specification.CallAsyncAPIWith> {
  constructor(model?: Partial<Specification.CallAsyncAPIWith>) {
    super(model);

    getLifecycleHook('CallAsyncAPIWith')?.constructor?.(this);
  }

  validate() {
    const copy = new CallAsyncAPIWith(this as any) as CallAsyncAPIWith & Specification.CallAsyncAPIWith;
    getLifecycleHook('CallAsyncAPIWith')?.preValidation?.(copy);
    validate('CallAsyncAPIWith', deepCopy(copy)); // deepCopy prevents potential additional properties error for constructor, validate, normalize
    getLifecycleHook('CallAsyncAPIWith')?.postValidation?.(copy);
  }

  normalize(): CallAsyncAPIWith & Specification.CallAsyncAPIWith {
    const copy = new CallAsyncAPIWith(this as any) as CallAsyncAPIWith & Specification.CallAsyncAPIWith;
    return getLifecycleHook('CallAsyncAPIWith')?.normalize?.(copy) || copy;
  }
}

export const _CallAsyncAPIWith = CallAsyncAPIWith as {
  new (model?: Partial<Specification.CallAsyncAPIWith>): CallAsyncAPIWith & Specification.CallAsyncAPIWith;
};
