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

import { _RunTaskRunShellArguments } from './run-task-run-shell-arguments';
import { _RunTaskRunShellEnvironment } from './run-task-run-shell-environment';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the RunTaskRunShell class and type
 */
export type RunTaskRunShellIntersection = RunTaskRunShell & Specification.RunTaskRunShell;

/**
 * Represents a constructor for the intersection of the RunTaskRunShell class and type
 */
export interface RunTaskRunShellConstructor {
  new (model?: Partial<Specification.RunTaskRunShell>): RunTaskRunShellIntersection;
}

/**
 * Represents a RunTaskRunShell with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class RunTaskRunShell extends ObjectHydrator<Specification.RunTaskRunShell> {
  /**
   * Instanciates a new instance of the RunTaskRunShell class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the RunTaskRunShell.
   */
  constructor(model?: Partial<Specification.RunTaskRunShell>) {
    super(model);
    const self = this as unknown as Specification.RunTaskRunShell & object;
    if (isObject(model)) {
      if (typeof model.arguments === 'object') self.arguments = new _RunTaskRunShellArguments(model.arguments);
      if (typeof model.environment === 'object') self.environment = new _RunTaskRunShellEnvironment(model.environment);
    }
    getLifecycleHooks('RunTaskRunShell')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the RunTaskRunShell.
   * Throws if invalid.
   */
  validate() {
    const copy = new RunTaskRunShell(this as any) as RunTaskRunShellIntersection;
    validate('RunTaskRunShell', copy);
  }

  /**
   * Normalizes the current instance of the RunTaskRunShell.
   * Creates a copy of the RunTaskRunShell, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the RunTaskRunShell instance.
   */
  normalize(): RunTaskRunShell & Specification.RunTaskRunShell {
    const copy = new RunTaskRunShell(this as any) as RunTaskRunShellIntersection;
    return getLifecycleHooks('RunTaskRunShell')?.normalize?.(copy) || copy;
  }
}

export const _RunTaskRunShell = RunTaskRunShell as RunTaskRunShellConstructor;
