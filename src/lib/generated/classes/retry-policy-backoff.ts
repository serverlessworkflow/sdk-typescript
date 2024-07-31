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
 * Represents the intersection between the RetryPolicyBackoff class and type
 */
export type RetryPolicyBackoffIntersection = RetryPolicyBackoff & Specification.RetryPolicyBackoff;

/**
 * Represents a constructor for the intersection of the RetryPolicyBackoff class and type
 */
export interface RetryPolicyBackoffConstructor {
  new (model?: Partial<Specification.RetryPolicyBackoff>): RetryPolicyBackoffIntersection;
}

/**
 * Represents a RetryPolicyBackoff with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class RetryPolicyBackoff extends ObjectHydrator<Specification.RetryPolicyBackoff> {
  /**
   * Instanciates a new instance of the RetryPolicyBackoff class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the RetryPolicyBackoff.
   */
  constructor(model?: Partial<Specification.RetryPolicyBackoff>) {
    super(model);

    getLifecycleHooks('RetryPolicyBackoff')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the RetryPolicyBackoff.
   * Throws if invalid.
   */
  validate() {
    const copy = new RetryPolicyBackoff(this as any) as RetryPolicyBackoffIntersection;
    validate('RetryPolicyBackoff', copy);
  }

  /**
   * Normalizes the current instance of the RetryPolicyBackoff.
   * Creates a copy of the RetryPolicyBackoff, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the RetryPolicyBackoff instance.
   */
  normalize(): RetryPolicyBackoff & Specification.RetryPolicyBackoff {
    const copy = new RetryPolicyBackoff(this as any) as RetryPolicyBackoffIntersection;
    return getLifecycleHooks('RetryPolicyBackoff')?.normalize?.(copy) || copy;
  }
}

export const _RetryPolicyBackoff = RetryPolicyBackoff as RetryPolicyBackoffConstructor;
