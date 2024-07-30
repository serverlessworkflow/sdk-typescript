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

class RetryPolicyLimitAttempt extends ObjectHydrator<Specification.RetryPolicyLimitAttempt> {
  constructor(model?: Partial<Specification.RetryPolicyLimitAttempt>) {
    super(model);
    const self = this as unknown as Specification.RetryPolicyLimitAttempt & object;
    if (isObject(model)) {
      if (typeof model.duration === 'object') self.duration = new _Duration(model.duration);
    }
    getLifecycleHook('RetryPolicyLimitAttempt')?.constructor?.(this);
  }

  validate() {
    const copy = new RetryPolicyLimitAttempt(this as any) as RetryPolicyLimitAttempt &
      Specification.RetryPolicyLimitAttempt;
    getLifecycleHook('RetryPolicyLimitAttempt')?.preValidation?.(copy);
    validate('RetryPolicyLimitAttempt', deepCopy(copy)); // deepCopy prevents potential additional properties error for constructor, validate, normalize
    getLifecycleHook('RetryPolicyLimitAttempt')?.postValidation?.(copy);
  }

  normalize(): RetryPolicyLimitAttempt & Specification.RetryPolicyLimitAttempt {
    const copy = new RetryPolicyLimitAttempt(this as any) as RetryPolicyLimitAttempt &
      Specification.RetryPolicyLimitAttempt;
    return getLifecycleHook('RetryPolicyLimitAttempt')?.normalize?.(copy) || copy;
  }
}

export const _RetryPolicyLimitAttempt = RetryPolicyLimitAttempt as {
  new (
    model?: Partial<Specification.RetryPolicyLimitAttempt>,
  ): RetryPolicyLimitAttempt & Specification.RetryPolicyLimitAttempt;
};
