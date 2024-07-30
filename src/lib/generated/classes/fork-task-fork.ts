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

import { _TaskList } from './task-list';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHook } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { deepCopy, isObject } from '../../utils';

class ForkTaskFork extends ObjectHydrator<Specification.ForkTaskFork> {
  constructor(model?: Partial<Specification.ForkTaskFork>) {
    super(model);
    const self = this as unknown as Specification.ForkTaskFork & object;
    if (isObject(model)) {
      if (typeof model.branches === 'object') self.branches = new _TaskList(model.branches);
    }
    getLifecycleHook('ForkTaskFork')?.constructor?.(this);
  }

  validate() {
    const copy = new ForkTaskFork(this as any) as ForkTaskFork & Specification.ForkTaskFork;
    getLifecycleHook('ForkTaskFork')?.preValidation?.(copy);
    validate('ForkTaskFork', deepCopy(copy)); // deepCopy prevents potential additional properties error for constructor, validate, normalize
    getLifecycleHook('ForkTaskFork')?.postValidation?.(copy);
  }

  normalize(): ForkTaskFork & Specification.ForkTaskFork {
    const copy = new ForkTaskFork(this as any) as ForkTaskFork & Specification.ForkTaskFork;
    return getLifecycleHook('ForkTaskFork')?.normalize?.(copy) || copy;
  }
}

export const _ForkTaskFork = ForkTaskFork as {
  new (model?: Partial<Specification.ForkTaskFork>): ForkTaskFork & Specification.ForkTaskFork;
};
