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
import { _Duration } from './duration';
import { _RetryPolicyLimit } from './retry-policy-limit';
import { _RetryPolicyJitter } from './retry-policy-jitter';
import { Specification } from '../definitions';
import { isObject } from '../../utils';

class RetryPolicy extends ObjectHydrator<Specification.RetryPolicy> {
  constructor(model?: Partial<Specification.RetryPolicy>) {
    super(model);
    const self = this as unknown as Specification.RetryPolicy & object;
    if (isObject(model)) {
      if (typeof model.delay === 'object') self.delay = new _Duration(model.delay);
      if (typeof model.limit === 'object') self.limit = new _RetryPolicyLimit(model.limit);
      if (typeof model.jitter === 'object') self.jitter = new _RetryPolicyJitter(model.jitter);
    }
  }
}

export const _RetryPolicy = RetryPolicy as {
  new (model?: Partial<Specification.RetryPolicy>): RetryPolicy & Specification.RetryPolicy;
};
