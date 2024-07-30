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

class CallGRPCWithService extends ObjectHydrator<Specification.CallGRPCWithService> {
  constructor(model?: Partial<Specification.CallGRPCWithService>) {
    super(model);

    getLifecycleHook('CallGRPCWithService')?.constructor?.(this);
  }

  validate() {
    const copy = new CallGRPCWithService(this as any) as CallGRPCWithService & Specification.CallGRPCWithService;
    getLifecycleHook('CallGRPCWithService')?.preValidation?.(copy);
    validate('CallGRPCWithService', deepCopy(copy)); // deepCopy prevents potential additional properties error for constructor, validate, normalize
    getLifecycleHook('CallGRPCWithService')?.postValidation?.(copy);
  }

  normalize(): CallGRPCWithService & Specification.CallGRPCWithService {
    const copy = new CallGRPCWithService(this as any) as CallGRPCWithService & Specification.CallGRPCWithService;
    return getLifecycleHook('CallGRPCWithService')?.normalize?.(copy) || copy;
  }
}

export const _CallGRPCWithService = CallGRPCWithService as {
  new (model?: Partial<Specification.CallGRPCWithService>): CallGRPCWithService & Specification.CallGRPCWithService;
};
