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
import { _TaskBaseTimeout } from './task-base-timeout';
import { _TaskMetadata } from './task-metadata';
import { _ForkTaskConfiguration } from './fork-task-configuration';
import { _EmitTaskConfiguration } from './emit-task-configuration';
import { _ForTaskConfiguration } from './for-task-configuration';
import { _ListenTaskConfiguration } from './listen-task-configuration';
import { _RaiseTaskConfiguration } from './raise-task-configuration';
import { _RunTaskConfiguration } from './run-task-configuration';
import { _SetTaskConfiguration } from './set-task-configuration';
import { _SwitchTaskConfiguration } from './switch-task-configuration';
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
        (self as Specification.TaskBase).timeout = new _TaskBaseTimeout(
          (model as Specification.TaskBase).timeout as Specification.TaskBaseTimeout,
        );
      if (typeof (model as Specification.TaskBase).metadata === 'object')
        (self as Specification.TaskBase).metadata = new _TaskMetadata(
          (model as Specification.TaskBase).metadata as Specification.TaskMetadata,
        );
      if (typeof (model as { [k: string]: unknown; fork?: Specification.ForkTaskConfiguration }).fork === 'object')
        (self as { [k: string]: unknown; fork?: Specification.ForkTaskConfiguration }).fork =
          new _ForkTaskConfiguration(
            (model as { [k: string]: unknown; fork?: Specification.ForkTaskConfiguration })
              .fork as Specification.ForkTaskConfiguration,
          );
      if (typeof (model as { [k: string]: unknown; emit?: Specification.EmitTaskConfiguration }).emit === 'object')
        (self as { [k: string]: unknown; emit?: Specification.EmitTaskConfiguration }).emit =
          new _EmitTaskConfiguration(
            (model as { [k: string]: unknown; emit?: Specification.EmitTaskConfiguration })
              .emit as Specification.EmitTaskConfiguration,
          );
      if (
        typeof (
          model as {
            [k: string]: unknown;
            for?: Specification.ForTaskConfiguration;
            while?: string;
            do?: Specification.TaskList;
          }
        ).for === 'object'
      )
        (
          self as {
            [k: string]: unknown;
            for?: Specification.ForTaskConfiguration;
            while?: string;
            do?: Specification.TaskList;
          }
        ).for = new _ForTaskConfiguration(
          (
            model as {
              [k: string]: unknown;
              for?: Specification.ForTaskConfiguration;
              while?: string;
              do?: Specification.TaskList;
            }
          ).for as Specification.ForTaskConfiguration,
        );
      if (
        typeof (model as { [k: string]: unknown; listen?: Specification.ListenTaskConfiguration }).listen === 'object'
      )
        (self as { [k: string]: unknown; listen?: Specification.ListenTaskConfiguration }).listen =
          new _ListenTaskConfiguration(
            (model as { [k: string]: unknown; listen?: Specification.ListenTaskConfiguration })
              .listen as Specification.ListenTaskConfiguration,
          );
      if (typeof (model as { [k: string]: unknown; raise?: Specification.RaiseTaskConfiguration }).raise === 'object')
        (self as { [k: string]: unknown; raise?: Specification.RaiseTaskConfiguration }).raise =
          new _RaiseTaskConfiguration(
            (model as { [k: string]: unknown; raise?: Specification.RaiseTaskConfiguration })
              .raise as Specification.RaiseTaskConfiguration,
          );
      if (typeof (model as { [k: string]: unknown; run?: Specification.RunTaskConfiguration }).run === 'object')
        (self as { [k: string]: unknown; run?: Specification.RunTaskConfiguration }).run = new _RunTaskConfiguration(
          (model as { [k: string]: unknown; run?: Specification.RunTaskConfiguration })
            .run as Specification.RunTaskConfiguration,
        );
      if (typeof (model as { [k: string]: unknown; set?: Specification.SetTaskConfiguration }).set === 'object')
        (self as { [k: string]: unknown; set?: Specification.SetTaskConfiguration }).set = new _SetTaskConfiguration(
          (model as { [k: string]: unknown; set?: Specification.SetTaskConfiguration })
            .set as Specification.SetTaskConfiguration,
        );
      if (
        typeof (model as { [k: string]: unknown; switch?: Specification.SwitchTaskConfiguration }).switch === 'object'
      )
        (self as { [k: string]: unknown; switch?: Specification.SwitchTaskConfiguration }).switch =
          new _SwitchTaskConfiguration(
            (model as { [k: string]: unknown; switch?: Specification.SwitchTaskConfiguration })
              .switch as Specification.SwitchTaskConfiguration,
          ) as unknown as Specification.SwitchTaskConfiguration;
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
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new Task(this as any) as TaskIntersection;
    validate('Task', copy, workflow);
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
