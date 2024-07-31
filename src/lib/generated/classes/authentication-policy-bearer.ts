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
 * Represents the intersection between the AuthenticationPolicyBearer class and type
 */
export type AuthenticationPolicyBearerIntersection = AuthenticationPolicyBearer &
  Specification.AuthenticationPolicyBearer;

/**
 * Represents a constructor for the intersection of the AuthenticationPolicyBearer class and type
 */
export interface AuthenticationPolicyBearerConstructor {
  new (model?: Partial<Specification.AuthenticationPolicyBearer>): AuthenticationPolicyBearerIntersection;
}

/**
 * Represents a AuthenticationPolicyBearer with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class AuthenticationPolicyBearer extends ObjectHydrator<Specification.AuthenticationPolicyBearer> {
  /**
   * Instanciates a new instance of the AuthenticationPolicyBearer class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the AuthenticationPolicyBearer.
   */
  constructor(model?: Partial<Specification.AuthenticationPolicyBearer>) {
    super(model);

    getLifecycleHooks('AuthenticationPolicyBearer')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the AuthenticationPolicyBearer.
   * Throws if invalid.
   */
  validate() {
    const copy = new AuthenticationPolicyBearer(this as any) as AuthenticationPolicyBearerIntersection;
    validate('AuthenticationPolicyBearer', copy);
  }

  /**
   * Normalizes the current instance of the AuthenticationPolicyBearer.
   * Creates a copy of the AuthenticationPolicyBearer, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the AuthenticationPolicyBearer instance.
   */
  normalize(): AuthenticationPolicyBearer & Specification.AuthenticationPolicyBearer {
    const copy = new AuthenticationPolicyBearer(this as any) as AuthenticationPolicyBearerIntersection;
    return getLifecycleHooks('AuthenticationPolicyBearer')?.normalize?.(copy) || copy;
  }
}

export const _AuthenticationPolicyBearer = AuthenticationPolicyBearer as AuthenticationPolicyBearerConstructor;
