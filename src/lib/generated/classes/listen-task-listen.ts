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
 * Represents the intersection between the ListenTaskListen class and type
 */
export type ListenTaskListenIntersection = ListenTaskListen & Specification.ListenTaskListen;

/**
 * Represents a constructor for the intersection of the ListenTaskListen class and type
 */
export interface ListenTaskListenConstructor {
  new (model?: Partial<Specification.ListenTaskListen>): ListenTaskListenIntersection;
}

/**
 * Represents a ListenTaskListen with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class ListenTaskListen extends ObjectHydrator<Specification.ListenTaskListen> {
  /**
   * Instanciates a new instance of the ListenTaskListen class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the ListenTaskListen.
   */
  constructor(model?: Partial<Specification.ListenTaskListen>) {
    super(model);

    getLifecycleHooks('ListenTaskListen')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the ListenTaskListen.
   * Throws if invalid.
   */
  validate() {
    const copy = new ListenTaskListen(this as any) as ListenTaskListenIntersection;
    validate('ListenTaskListen', copy);
  }

  /**
   * Normalizes the current instance of the ListenTaskListen.
   * Creates a copy of the ListenTaskListen, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the ListenTaskListen instance.
   */
  normalize(): ListenTaskListen & Specification.ListenTaskListen {
    const copy = new ListenTaskListen(this as any) as ListenTaskListenIntersection;
    return getLifecycleHooks('ListenTaskListen')?.normalize?.(copy) || copy;
  }
}

export const _ListenTaskListen = ListenTaskListen as ListenTaskListenConstructor;
