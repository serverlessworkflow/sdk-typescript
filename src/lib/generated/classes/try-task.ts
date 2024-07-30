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
import { _TaskList } from './task-list';
import { _TryTaskCatch } from './try-task-catch';
import { _TaskBase } from './task-base';
import { Specification } from '../definitions';
import { getLifecycleHook } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { deepCopy, isObject } from '../../utils';

class TryTask extends _TaskBase {
  constructor(model?: Partial<Specification.TryTask>) {
    super(model);
    const self = this as unknown as Specification.TryTask & object;
    if (isObject(model)) {
      if (typeof model.input === 'object') self.input = new _Input(model.input);
      if (typeof model.output === 'object') self.output = new _Output(model.output);
      if (typeof model.export === 'object') self.export = new _Export(model.export);
      if (typeof model.timeout === 'object') self.timeout = new _Timeout(model.timeout);
      if (typeof model.try === 'object') self.try = new _TaskList(model.try);
      if (typeof model.catch === 'object') self.catch = new _TryTaskCatch(model.catch);
    }
    getLifecycleHook('TryTask')?.constructor?.(this);
  }

  validate() {
    const copy = new TryTask(this as any) as TryTask & Specification.TryTask;
    getLifecycleHook('TryTask')?.preValidation?.(copy);
    validate('TryTask', deepCopy(copy)); // deepCopy prevents potential additional properties error for constructor, validate, normalize
    getLifecycleHook('TryTask')?.postValidation?.(copy);
  }

  normalize(): TryTask & Specification.TryTask {
    const copy = new TryTask(this as any) as TryTask & Specification.TryTask;
    return getLifecycleHook('TryTask')?.normalize?.(copy) || copy;
  }
}

export const _TryTask = TryTask as {
  new (model?: Partial<Specification.TryTask>): TryTask & Specification.TryTask;
};
