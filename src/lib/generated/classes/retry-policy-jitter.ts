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

import { _Duration } from './duration';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHook } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { deepCopy, isObject } from '../../utils';

class RetryPolicyJitter extends ObjectHydrator<Specification.RetryPolicyJitter> {
  constructor(model?: Partial<Specification.RetryPolicyJitter>) {
    super(model);
    const self = this as unknown as Specification.RetryPolicyJitter & object;
    if (isObject(model)) {
      if (typeof model.from === 'object') self.from = new _Duration(model.from);
      if (typeof model.to === 'object') self.to = new _Duration(model.to);
    }
    getLifecycleHook('RetryPolicyJitter')?.constructor?.(this);
  }

  validate() {
    const copy = new RetryPolicyJitter(this as any) as RetryPolicyJitter & Specification.RetryPolicyJitter;
    getLifecycleHook('RetryPolicyJitter')?.preValidation?.(copy);
    validate('RetryPolicyJitter', deepCopy(copy)); // deepCopy prevents potential additional properties error for constructor, validate, normalize
    getLifecycleHook('RetryPolicyJitter')?.postValidation?.(copy);
  }

  normalize(): RetryPolicyJitter & Specification.RetryPolicyJitter {
    const copy = new RetryPolicyJitter(this as any) as RetryPolicyJitter & Specification.RetryPolicyJitter;
    return getLifecycleHook('RetryPolicyJitter')?.normalize?.(copy) || copy;
  }
}

export const _RetryPolicyJitter = RetryPolicyJitter as {
  new (model?: Partial<Specification.RetryPolicyJitter>): RetryPolicyJitter & Specification.RetryPolicyJitter;
};
