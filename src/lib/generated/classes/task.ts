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
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the Task class and type
 */
export type TaskIntersection = Task & Specification.Task;

/**
 * Represents a constructor for the intersection of the Task class and type
 */
export interface TaskConstructor {
  new (model?: Partial<Specification.Task>): TaskIntersection;
}

/**
 * Represents a Task with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class Task extends ObjectHydrator<Specification.Task> {
  /**
   * Instanciates a new instance of the Task class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the Task.
   */
  constructor(model?: Partial<Specification.Task>) {
    super(model);
    const self = this as unknown as Specification.Task & object;
    if (isObject(model)) {
      if (typeof (model as Specification.TaskBase).input === 'object')
        (self as Specification.TaskBase).input = new _Input(
          (model as Specification.TaskBase).input as Specification.Input,
        );
      if (typeof (model as Specification.TaskBase).output === 'object')
        (self as Specification.TaskBase).output = new _Output(
          (model as Specification.TaskBase).output as Specification.Output,
        );
      if (typeof (model as Specification.TaskBase).export === 'object')
        (self as Specification.TaskBase).export = new _Export(
          (model as Specification.TaskBase).export as Specification.Export,
        );
      if (typeof (model as Specification.TaskBase).timeout === 'object')
        (self as Specification.TaskBase).timeout = new _Timeout(
          (model as Specification.TaskBase).timeout as Specification.Timeout,
        );
      if (typeof (model as { [k: string]: unknown; fork?: Specification.ForkTaskFork }).fork === 'object')
        (self as { [k: string]: unknown; fork?: Specification.ForkTaskFork }).fork = new _ForkTaskFork(
          (model as { [k: string]: unknown; fork?: Specification.ForkTaskFork }).fork as Specification.ForkTaskFork,
        );
      if (typeof (model as { [k: string]: unknown; emit?: Specification.EmitTaskEmit }).emit === 'object')
        (self as { [k: string]: unknown; emit?: Specification.EmitTaskEmit }).emit = new _EmitTaskEmit(
          (model as { [k: string]: unknown; emit?: Specification.EmitTaskEmit }).emit as Specification.EmitTaskEmit,
        );
      if (
        typeof (
          model as { [k: string]: unknown; for?: Specification.ForTaskFor; while?: string; do?: Specification.TaskList }
        ).for === 'object'
      )
        (
          self as { [k: string]: unknown; for?: Specification.ForTaskFor; while?: string; do?: Specification.TaskList }
        ).for = new _ForTaskFor(
          (
            model as {
              [k: string]: unknown;
              for?: Specification.ForTaskFor;
              while?: string;
              do?: Specification.TaskList;
            }
          ).for as Specification.ForTaskFor,
        );
      if (typeof (model as { [k: string]: unknown; listen?: Specification.ListenTaskListen }).listen === 'object')
        (self as { [k: string]: unknown; listen?: Specification.ListenTaskListen }).listen = new _ListenTaskListen(
          (model as { [k: string]: unknown; listen?: Specification.ListenTaskListen })
            .listen as Specification.ListenTaskListen,
        );
      if (typeof (model as { [k: string]: unknown; raise?: Specification.RaiseTaskRaise }).raise === 'object')
        (self as { [k: string]: unknown; raise?: Specification.RaiseTaskRaise }).raise = new _RaiseTaskRaise(
          (model as { [k: string]: unknown; raise?: Specification.RaiseTaskRaise })
            .raise as Specification.RaiseTaskRaise,
        );
      if (typeof (model as { [k: string]: unknown; set?: Specification.SetTaskSet }).set === 'object')
        (self as { [k: string]: unknown; set?: Specification.SetTaskSet }).set = new _SetTaskSet(
          (model as { [k: string]: unknown; set?: Specification.SetTaskSet }).set as Specification.SetTaskSet,
        );
      if (typeof (model as { [k: string]: unknown; switch?: Specification.SwitchTaskSwitch }).switch === 'object')
        (self as { [k: string]: unknown; switch?: Specification.SwitchTaskSwitch }).switch = new _SwitchTaskSwitch(
          (model as { [k: string]: unknown; switch?: Specification.SwitchTaskSwitch })
            .switch as Specification.SwitchTaskSwitch,
        ) as unknown as Specification.SwitchTaskSwitch;
      if (
        typeof (model as { [k: string]: unknown; try?: Specification.TaskList; catch?: Specification.TryTaskCatch })
          .try === 'object'
      )
        (self as { [k: string]: unknown; try?: Specification.TaskList; catch?: Specification.TryTaskCatch }).try =
          new _TaskList(
            (model as { [k: string]: unknown; try?: Specification.TaskList; catch?: Specification.TryTaskCatch })
              .try as Specification.TaskList,
          );
      if (
        typeof (model as { [k: string]: unknown; try?: Specification.TaskList; catch?: Specification.TryTaskCatch })
          .catch === 'object'
      )
        (self as { [k: string]: unknown; try?: Specification.TaskList; catch?: Specification.TryTaskCatch }).catch =
          new _TryTaskCatch(
            (model as { [k: string]: unknown; try?: Specification.TaskList; catch?: Specification.TryTaskCatch })
              .catch as Specification.TryTaskCatch,
          );
      if (typeof (model as { [k: string]: unknown; wait?: Specification.Duration }).wait === 'object')
        (self as { [k: string]: unknown; wait?: Specification.Duration }).wait = new _Duration(
          (model as { [k: string]: unknown; wait?: Specification.Duration }).wait as Specification.Duration,
        );
    }
    getLifecycleHooks('Task')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the Task.
   * Throws if invalid.
   */
  validate() {
    const copy = new Task(this as any) as TaskIntersection;
    validate('Task', copy);
  }

  /**
   * Normalizes the current instance of the Task.
   * Creates a copy of the Task, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the Task instance.
   */
  normalize(): Task & Specification.Task {
    const copy = new Task(this as any) as TaskIntersection;
    return getLifecycleHooks('Task')?.normalize?.(copy) || copy;
  }
}

export const _Task = Task as TaskConstructor;
