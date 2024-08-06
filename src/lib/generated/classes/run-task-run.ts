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

import { _RunTaskRunContainer } from './run-task-run-container';
import { _RunTaskRunShell } from './run-task-run-shell';
import { _RunTaskRunWorkflow } from './run-task-run-workflow';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the RunTaskRun class and type
 */
export type RunTaskRunIntersection = RunTaskRun & Specification.RunTaskRun;

/**
 * Represents a constructor for the intersection of the RunTaskRun class and type
 */
export interface RunTaskRunConstructor {
  new (model?: Partial<Specification.RunTaskRun>): RunTaskRunIntersection;
}

/**
 * Represents a RunTaskRun with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class RunTaskRun extends ObjectHydrator<Specification.RunTaskRun> {
  /**
   * Instanciates a new instance of the RunTaskRun class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the RunTaskRun.
   */
  constructor(model?: Partial<Specification.RunTaskRun>) {
    super(model);
    const self = this as unknown as Specification.RunTaskRun & object;
    if (isObject(model)) {
      if (
        typeof (model as { [k: string]: unknown; container: Specification.RunTaskRunContainer }).container === 'object'
      )
        (self as { [k: string]: unknown; container: Specification.RunTaskRunContainer }).container =
          new _RunTaskRunContainer(
            (model as { [k: string]: unknown; container: Specification.RunTaskRunContainer })
              .container as Specification.RunTaskRunContainer,
          );
      if (typeof (model as { [k: string]: unknown; shell: Specification.RunTaskRunShell }).shell === 'object')
        (self as { [k: string]: unknown; shell: Specification.RunTaskRunShell }).shell = new _RunTaskRunShell(
          (model as { [k: string]: unknown; shell: Specification.RunTaskRunShell })
            .shell as Specification.RunTaskRunShell,
        );
      if (typeof (model as { [k: string]: unknown; workflow: Specification.RunTaskRunWorkflow }).workflow === 'object')
        (self as { [k: string]: unknown; workflow: Specification.RunTaskRunWorkflow }).workflow =
          new _RunTaskRunWorkflow(
            (model as { [k: string]: unknown; workflow: Specification.RunTaskRunWorkflow })
              .workflow as Specification.RunTaskRunWorkflow,
          );
    }
    getLifecycleHooks('RunTaskRun')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the RunTaskRun.
   * Throws if invalid.
   */
  validate() {
    const copy = new RunTaskRun(this as any) as RunTaskRunIntersection;
    validate('RunTaskRun', copy);
  }

  /**
   * Normalizes the current instance of the RunTaskRun.
   * Creates a copy of the RunTaskRun, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the RunTaskRun instance.
   */
  normalize(): RunTaskRun & Specification.RunTaskRun {
    const copy = new RunTaskRun(this as any) as RunTaskRunIntersection;
    return getLifecycleHooks('RunTaskRun')?.normalize?.(copy) || copy;
  }
}

export const _RunTaskRun = RunTaskRun as RunTaskRunConstructor;
