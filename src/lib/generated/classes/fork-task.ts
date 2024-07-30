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
import { _ForkTaskFork } from './fork-task-fork';
import { _TaskBase } from './task-base';
import { Specification } from '../definitions';
import { getLifecycleHook } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { deepCopy, isObject } from '../../utils';

class ForkTask extends _TaskBase {
  constructor(model?: Partial<Specification.ForkTask>) {
    super(model);
    const self = this as unknown as Specification.ForkTask & object;
    if (isObject(model)) {
      if (typeof model.input === 'object') self.input = new _Input(model.input);
      if (typeof model.output === 'object') self.output = new _Output(model.output);
      if (typeof model.export === 'object') self.export = new _Export(model.export);
      if (typeof model.timeout === 'object') self.timeout = new _Timeout(model.timeout);
      if (typeof model.fork === 'object') self.fork = new _ForkTaskFork(model.fork);
    }
    getLifecycleHook('ForkTask')?.constructor?.(this);
  }

  validate() {
    const copy = new ForkTask(this as any) as ForkTask & Specification.ForkTask;
    getLifecycleHook('ForkTask')?.preValidation?.(copy);
    validate('ForkTask', deepCopy(copy)); // deepCopy prevents potential additional properties error for constructor, validate, normalize
    getLifecycleHook('ForkTask')?.postValidation?.(copy);
  }

  normalize(): ForkTask & Specification.ForkTask {
    const copy = new ForkTask(this as any) as ForkTask & Specification.ForkTask;
    return getLifecycleHook('ForkTask')?.normalize?.(copy) || copy;
  }
}

export const _ForkTask = ForkTask as {
  new (model?: Partial<Specification.ForkTask>): ForkTask & Specification.ForkTask;
};
