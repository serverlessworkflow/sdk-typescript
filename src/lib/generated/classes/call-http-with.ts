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

import { _CallHTTPWithEndpoint } from './call-http-with-endpoint';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHook } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { deepCopy, isObject } from '../../utils';

class CallHTTPWith extends ObjectHydrator<Specification.CallHTTPWith> {
  constructor(model?: Partial<Specification.CallHTTPWith>) {
    super(model);
    const self = this as unknown as Specification.CallHTTPWith & object;
    if (isObject(model)) {
      if (typeof model.endpoint === 'object') self.endpoint = new _CallHTTPWithEndpoint(model.endpoint);
    }
    getLifecycleHook('CallHTTPWith')?.constructor?.(this);
  }

  validate() {
    const copy = new CallHTTPWith(this as any) as CallHTTPWith & Specification.CallHTTPWith;
    getLifecycleHook('CallHTTPWith')?.preValidation?.(copy);
    validate('CallHTTPWith', deepCopy(copy)); // deepCopy prevents potential additional properties error for constructor, validate, normalize
    getLifecycleHook('CallHTTPWith')?.postValidation?.(copy);
  }

  normalize(): CallHTTPWith & Specification.CallHTTPWith {
    const copy = new CallHTTPWith(this as any) as CallHTTPWith & Specification.CallHTTPWith;
    return getLifecycleHook('CallHTTPWith')?.normalize?.(copy) || copy;
  }
}

export const _CallHTTPWith = CallHTTPWith as {
  new (model?: Partial<Specification.CallHTTPWith>): CallHTTPWith & Specification.CallHTTPWith;
};
