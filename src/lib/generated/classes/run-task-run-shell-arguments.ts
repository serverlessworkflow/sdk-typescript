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
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';

/**
 * Represents the intersection between the RunTaskRunShellArguments class and type
 */
export type RunTaskRunShellArgumentsIntersection = RunTaskRunShellArguments & Specification.RunTaskRunShellArguments;

/**
 * Represents a constructor for the intersection of the RunTaskRunShellArguments class and type
 */
export interface RunTaskRunShellArgumentsConstructor {
  new (model?: Partial<Specification.RunTaskRunShellArguments>): RunTaskRunShellArgumentsIntersection;
}

/**
 * Represents a RunTaskRunShellArguments with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class RunTaskRunShellArguments extends ObjectHydrator<Specification.RunTaskRunShellArguments> {
  /**
   * Instanciates a new instance of the RunTaskRunShellArguments class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the RunTaskRunShellArguments.
   */
  constructor(model?: Partial<Specification.RunTaskRunShellArguments>) {
    super(model);

    getLifecycleHooks('RunTaskRunShellArguments')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the RunTaskRunShellArguments.
   * Throws if invalid.
   */
  validate() {
    const copy = new RunTaskRunShellArguments(this as any) as RunTaskRunShellArgumentsIntersection;
    validate('RunTaskRunShellArguments', copy);
  }

  /**
   * Normalizes the current instance of the RunTaskRunShellArguments.
   * Creates a copy of the RunTaskRunShellArguments, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the RunTaskRunShellArguments instance.
   */
  normalize(): RunTaskRunShellArguments & Specification.RunTaskRunShellArguments {
    const copy = new RunTaskRunShellArguments(this as any) as RunTaskRunShellArgumentsIntersection;
    return getLifecycleHooks('RunTaskRunShellArguments')?.normalize?.(copy) || copy;
  }
}

export const _RunTaskRunShellArguments = RunTaskRunShellArguments as RunTaskRunShellArgumentsConstructor;
