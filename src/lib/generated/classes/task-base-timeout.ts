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

import { _Duration } from './duration';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the TaskBaseTimeout class and type
 */
export type TaskBaseTimeoutIntersection = TaskBaseTimeout & Specification.TaskBaseTimeout;

/**
 * Represents a constructor for the intersection of the TaskBaseTimeout class and type
 */
export interface TaskBaseTimeoutConstructor {
  new (model?: Partial<Specification.TaskBaseTimeout>): TaskBaseTimeoutIntersection;
}

/**
 * Represents a TaskBaseTimeout with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class TaskBaseTimeout extends ObjectHydrator<Specification.TaskBaseTimeout> {
  /**
   * Instanciates a new instance of the TaskBaseTimeout class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the TaskBaseTimeout.
   */
  constructor(model?: Partial<Specification.TaskBaseTimeout>) {
    super(model);
    const self = this as unknown as Specification.TaskBaseTimeout & object;
    if (isObject(model)) {
      if (typeof (model as Specification.Timeout).after === 'object')
        (self as Specification.Timeout).after = new _Duration(
          (model as Specification.Timeout).after as Specification.Duration,
        );
    }
    getLifecycleHooks('TaskBaseTimeout')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the TaskBaseTimeout.
   * Throws if invalid.
   */
  validate() {
    const copy = new TaskBaseTimeout(this as any) as TaskBaseTimeoutIntersection;
    validate('TaskBaseTimeout', copy);
  }

  /**
   * Normalizes the current instance of the TaskBaseTimeout.
   * Creates a copy of the TaskBaseTimeout, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the TaskBaseTimeout instance.
   */
  normalize(): TaskBaseTimeout & Specification.TaskBaseTimeout {
    const copy = new TaskBaseTimeout(this as any) as TaskBaseTimeoutIntersection;
    return getLifecycleHooks('TaskBaseTimeout')?.normalize?.(copy) || copy;
  }
}

export const _TaskBaseTimeout = TaskBaseTimeout as TaskBaseTimeoutConstructor;
