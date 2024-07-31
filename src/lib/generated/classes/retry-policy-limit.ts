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

import { _RetryPolicyLimitAttempt } from './retry-policy-limit-attempt';
import { _Duration } from './duration';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the RetryPolicyLimit class and type
 */
export type RetryPolicyLimitIntersection = RetryPolicyLimit & Specification.RetryPolicyLimit;

/**
 * Represents a constructor for the intersection of the RetryPolicyLimit class and type
 */
export interface RetryPolicyLimitConstructor {
  new (model?: Partial<Specification.RetryPolicyLimit>): RetryPolicyLimitIntersection;
}

/**
 * Represents a RetryPolicyLimit with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class RetryPolicyLimit extends ObjectHydrator<Specification.RetryPolicyLimit> {
  /**
   * Instanciates a new instance of the RetryPolicyLimit class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the RetryPolicyLimit.
   */
  constructor(model?: Partial<Specification.RetryPolicyLimit>) {
    super(model);
    const self = this as unknown as Specification.RetryPolicyLimit & object;
    if (isObject(model)) {
      if (typeof model.attempt === 'object') self.attempt = new _RetryPolicyLimitAttempt(model.attempt);
      if (typeof model.duration === 'object') self.duration = new _Duration(model.duration);
    }
    getLifecycleHooks('RetryPolicyLimit')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the RetryPolicyLimit.
   * Throws if invalid.
   */
  validate() {
    const copy = new RetryPolicyLimit(this as any) as RetryPolicyLimitIntersection;
    validate('RetryPolicyLimit', copy);
  }

  /**
   * Normalizes the current instance of the RetryPolicyLimit.
   * Creates a copy of the RetryPolicyLimit, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the RetryPolicyLimit instance.
   */
  normalize(): RetryPolicyLimit & Specification.RetryPolicyLimit {
    const copy = new RetryPolicyLimit(this as any) as RetryPolicyLimitIntersection;
    return getLifecycleHooks('RetryPolicyLimit')?.normalize?.(copy) || copy;
  }
}

export const _RetryPolicyLimit = RetryPolicyLimit as RetryPolicyLimitConstructor;
