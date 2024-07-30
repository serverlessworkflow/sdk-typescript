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

import { _Input } from './input';
import { _Output } from './output';
import { _Export } from './export';
import { _Timeout } from './timeout';
import { _CallHTTPWith } from './call-http-with';
import { _TaskBase } from './task-base';
import { Specification } from '../definitions';
import { getLifecycleHook } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { deepCopy, isObject } from '../../utils';

class CallHTTP extends _TaskBase {
  constructor(model?: Partial<Specification.CallHTTP>) {
    super(model);
    const self = this as unknown as Specification.CallHTTP & object;
    if (isObject(model)) {
      self.call = 'http' as const;
      if (typeof model.input === 'object') self.input = new _Input(model.input);
      if (typeof model.output === 'object') self.output = new _Output(model.output);
      if (typeof model.export === 'object') self.export = new _Export(model.export);
      if (typeof model.timeout === 'object') self.timeout = new _Timeout(model.timeout);
      if (typeof model.with === 'object') self.with = new _CallHTTPWith(model.with);
    }
    getLifecycleHook('CallHTTP')?.constructor?.(this);
  }

  validate() {
    const copy = new CallHTTP(this as any) as CallHTTP & Specification.CallHTTP;
    getLifecycleHook('CallHTTP')?.preValidation?.(copy);
    validate('CallHTTP', deepCopy(copy)); // deepCopy prevents potential additional properties error for constructor, validate, normalize
    getLifecycleHook('CallHTTP')?.postValidation?.(copy);
  }

  normalize(): CallHTTP & Specification.CallHTTP {
    const copy = new CallHTTP(this as any) as CallHTTP & Specification.CallHTTP;
    return getLifecycleHook('CallHTTP')?.normalize?.(copy) || copy;
  }
}

export const _CallHTTP = CallHTTP as {
  new (model?: Partial<Specification.CallHTTP>): CallHTTP & Specification.CallHTTP;
};
