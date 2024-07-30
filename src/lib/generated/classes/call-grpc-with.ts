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

import { _CallGRPCWithService } from './call-grpc-with-service';
import { _CallGRPCWithArguments } from './call-grpc-with-arguments';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHook } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { deepCopy, isObject } from '../../utils';

class CallGRPCWith extends ObjectHydrator<Specification.CallGRPCWith> {
  constructor(model?: Partial<Specification.CallGRPCWith>) {
    super(model);
    const self = this as unknown as Specification.CallGRPCWith & object;
    if (isObject(model)) {
      if (typeof model.service === 'object') self.service = new _CallGRPCWithService(model.service);
      if (typeof model.arguments === 'object') self.arguments = new _CallGRPCWithArguments(model.arguments);
    }
    getLifecycleHook('CallGRPCWith')?.constructor?.(this);
  }

  validate() {
    const copy = new CallGRPCWith(this as any) as CallGRPCWith & Specification.CallGRPCWith;
    getLifecycleHook('CallGRPCWith')?.preValidation?.(copy);
    validate('CallGRPCWith', deepCopy(copy)); // deepCopy prevents potential additional properties error for constructor, validate, normalize
    getLifecycleHook('CallGRPCWith')?.postValidation?.(copy);
  }

  normalize(): CallGRPCWith & Specification.CallGRPCWith {
    const copy = new CallGRPCWith(this as any) as CallGRPCWith & Specification.CallGRPCWith;
    return getLifecycleHook('CallGRPCWith')?.normalize?.(copy) || copy;
  }
}

export const _CallGRPCWith = CallGRPCWith as {
  new (model?: Partial<Specification.CallGRPCWith>): CallGRPCWith & Specification.CallGRPCWith;
};
