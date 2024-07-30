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
import { _RetryPolicy } from './retry-policy';
import { _TaskList } from './task-list';
import { Specification } from '../definitions';
import { isObject } from '../../utils';

class TryTaskCatch extends ObjectHydrator<Specification.TryTaskCatch> {
  constructor(model?: Partial<Specification.TryTaskCatch>) {
    super(model);
    const self = this as unknown as Specification.TryTaskCatch & object;
    if (isObject(model)) {
      if (typeof model.retry === 'object') self.retry = new _RetryPolicy(model.retry);
      if (typeof model.do === 'object') self.do = new _TaskList(model.do);
    }
  }
}

export const _TryTaskCatch = TryTaskCatch as {
  new (model?: Partial<Specification.TryTaskCatch>): TryTaskCatch & Specification.TryTaskCatch;
};
