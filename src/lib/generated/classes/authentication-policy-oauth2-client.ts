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
 * Represents the intersection between the AuthenticationPolicyOauth2Client class and type
 */
export type AuthenticationPolicyOauth2ClientIntersection = AuthenticationPolicyOauth2Client &
  Specification.AuthenticationPolicyOauth2Client;

/**
 * Represents a constructor for the intersection of the AuthenticationPolicyOauth2Client class and type
 */
export interface AuthenticationPolicyOauth2ClientConstructor {
  new (model?: Partial<Specification.AuthenticationPolicyOauth2Client>): AuthenticationPolicyOauth2ClientIntersection;
}

/**
 * Represents a AuthenticationPolicyOauth2Client with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class AuthenticationPolicyOauth2Client extends ObjectHydrator<Specification.AuthenticationPolicyOauth2Client> {
  /**
   * Instanciates a new instance of the AuthenticationPolicyOauth2Client class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the AuthenticationPolicyOauth2Client.
   */
  constructor(model?: Partial<Specification.AuthenticationPolicyOauth2Client>) {
    super(model);

    getLifecycleHooks('AuthenticationPolicyOauth2Client')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the AuthenticationPolicyOauth2Client.
   * Throws if invalid.
   */
  validate() {
    const copy = new AuthenticationPolicyOauth2Client(this as any) as AuthenticationPolicyOauth2ClientIntersection;
    validate('AuthenticationPolicyOauth2Client', copy);
  }

  /**
   * Normalizes the current instance of the AuthenticationPolicyOauth2Client.
   * Creates a copy of the AuthenticationPolicyOauth2Client, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the AuthenticationPolicyOauth2Client instance.
   */
  normalize(): AuthenticationPolicyOauth2Client & Specification.AuthenticationPolicyOauth2Client {
    const copy = new AuthenticationPolicyOauth2Client(this as any) as AuthenticationPolicyOauth2ClientIntersection;
    return getLifecycleHooks('AuthenticationPolicyOauth2Client')?.normalize?.(copy) || copy;
  }
}

export const _AuthenticationPolicyOauth2Client =
  AuthenticationPolicyOauth2Client as AuthenticationPolicyOauth2ClientConstructor;
