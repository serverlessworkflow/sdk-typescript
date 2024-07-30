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
import { _EmitTaskEmit } from './emit-task-emit';
import { _ForTaskFor } from './for-task-for';
import { _ListenTaskListen } from './listen-task-listen';
import { _RaiseTaskRaise } from './raise-task-raise';
import { _SetTaskSet } from './set-task-set';
import { _SwitchTaskSwitch } from './switch-task-switch';
import { _TaskList } from './task-list';
import { _TryTaskCatch } from './try-task-catch';
import { _Duration } from './duration';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHook } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { deepCopy, isObject } from '../../utils';

class Task extends ObjectHydrator<Specification.Task> {
  constructor(model?: Partial<Specification.Task>) {
    super(model);
    const self = this as unknown as Specification.Task & object;
    if (isObject(model)) {
      if (typeof model.input === 'object') self.input = new _Input(model.input as Specification.Input);
      if (typeof model.output === 'object') self.output = new _Output(model.output as Specification.Output);
      if (typeof model.export === 'object') self.export = new _Export(model.export as Specification.Export);
      if (typeof model.timeout === 'object') self.timeout = new _Timeout(model.timeout as Specification.Timeout);
      if (typeof model.fork === 'object') self.fork = new _ForkTaskFork(model.fork as Specification.ForkTaskFork);
      if (typeof model.emit === 'object') self.emit = new _EmitTaskEmit(model.emit as Specification.EmitTaskEmit);
      if (typeof model.for === 'object') self.for = new _ForTaskFor(model.for as Specification.ForTaskFor);
      if (typeof model.listen === 'object')
        self.listen = new _ListenTaskListen(model.listen as Specification.ListenTaskListen);
      if (typeof model.raise === 'object')
        self.raise = new _RaiseTaskRaise(model.raise as Specification.RaiseTaskRaise);
      if (typeof model.set === 'object') self.set = new _SetTaskSet(model.set as Specification.SetTaskSet);
      if (typeof model.switch === 'object')
        self.switch = new _SwitchTaskSwitch(
          model.switch as Specification.SwitchTaskSwitch,
        ) as unknown as Specification.SwitchTaskSwitch;
      if (typeof model.try === 'object') self.try = new _TaskList(model.try as Specification.TaskList);
      if (typeof model.catch === 'object') self.catch = new _TryTaskCatch(model.catch as Specification.TryTaskCatch);
      if (typeof model.wait === 'object') self.wait = new _Duration(model.wait as Specification.Duration);
    }
    getLifecycleHook('Task')?.constructor?.(this);
  }

  validate() {
    const copy = new Task(this as any) as Task & Specification.Task;
    getLifecycleHook('Task')?.preValidation?.(copy);
    validate('Task', deepCopy(copy)); // deepCopy prevents potential additional properties error for constructor, validate, normalize
    getLifecycleHook('Task')?.postValidation?.(copy);
  }

  normalize(): Task & Specification.Task {
    const copy = new Task(this as any) as Task & Specification.Task;
    return getLifecycleHook('Task')?.normalize?.(copy) || copy;
  }
}

export const _Task = Task as {
  new (model?: Partial<Specification.Task>): Task & Specification.Task;
};
