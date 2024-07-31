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
 * Represents the intersection between the RetryPolicyLimitAttempt class and type
 */
export type RetryPolicyLimitAttemptIntersection = RetryPolicyLimitAttempt & Specification.RetryPolicyLimitAttempt;

/**
 * Represents a constructor for the intersection of the RetryPolicyLimitAttempt class and type
 */
export interface RetryPolicyLimitAttemptConstructor {
  new (model?: Partial<Specification.RetryPolicyLimitAttempt>): RetryPolicyLimitAttemptIntersection;
}

/**
 * Represents a RetryPolicyLimitAttempt with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class RetryPolicyLimitAttempt extends ObjectHydrator<Specification.RetryPolicyLimitAttempt> {
  /**
   * Instanciates a new instance of the RetryPolicyLimitAttempt class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the RetryPolicyLimitAttempt.
   */
  constructor(model?: Partial<Specification.RetryPolicyLimitAttempt>) {
    super(model);
    const self = this as unknown as Specification.RetryPolicyLimitAttempt & object;
    if (isObject(model)) {
      if (typeof model.duration === 'object') self.duration = new _Duration(model.duration);
    }
    getLifecycleHooks('RetryPolicyLimitAttempt')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the RetryPolicyLimitAttempt.
   * Throws if invalid.
   */
  validate() {
    const copy = new RetryPolicyLimitAttempt(this as any) as RetryPolicyLimitAttemptIntersection;
    validate('RetryPolicyLimitAttempt', copy);
  }

  /**
   * Normalizes the current instance of the RetryPolicyLimitAttempt.
   * Creates a copy of the RetryPolicyLimitAttempt, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the RetryPolicyLimitAttempt instance.
   */
  normalize(): RetryPolicyLimitAttempt & Specification.RetryPolicyLimitAttempt {
    const copy = new RetryPolicyLimitAttempt(this as any) as RetryPolicyLimitAttemptIntersection;
    return getLifecycleHooks('RetryPolicyLimitAttempt')?.normalize?.(copy) || copy;
  }
}

export const _RetryPolicyLimitAttempt = RetryPolicyLimitAttempt as RetryPolicyLimitAttemptConstructor;
