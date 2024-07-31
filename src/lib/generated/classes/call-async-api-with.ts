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
 * Represents the intersection between the CallAsyncAPIWith class and type
 */
export type CallAsyncAPIWithIntersection = CallAsyncAPIWith & Specification.CallAsyncAPIWith;

/**
 * Represents a constructor for the intersection of the CallAsyncAPIWith class and type
 */
export interface CallAsyncAPIWithConstructor {
  new (model?: Partial<Specification.CallAsyncAPIWith>): CallAsyncAPIWithIntersection;
}

/**
 * Represents a CallAsyncAPIWith with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class CallAsyncAPIWith extends ObjectHydrator<Specification.CallAsyncAPIWith> {
  /**
   * Instanciates a new instance of the CallAsyncAPIWith class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the CallAsyncAPIWith.
   */
  constructor(model?: Partial<Specification.CallAsyncAPIWith>) {
    super(model);

    getLifecycleHooks('CallAsyncAPIWith')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the CallAsyncAPIWith.
   * Throws if invalid.
   */
  validate() {
    const copy = new CallAsyncAPIWith(this as any) as CallAsyncAPIWithIntersection;
    validate('CallAsyncAPIWith', copy);
  }

  /**
   * Normalizes the current instance of the CallAsyncAPIWith.
   * Creates a copy of the CallAsyncAPIWith, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the CallAsyncAPIWith instance.
   */
  normalize(): CallAsyncAPIWith & Specification.CallAsyncAPIWith {
    const copy = new CallAsyncAPIWith(this as any) as CallAsyncAPIWithIntersection;
    return getLifecycleHooks('CallAsyncAPIWith')?.normalize?.(copy) || copy;
  }
}

export const _CallAsyncAPIWith = CallAsyncAPIWith as CallAsyncAPIWithConstructor;
