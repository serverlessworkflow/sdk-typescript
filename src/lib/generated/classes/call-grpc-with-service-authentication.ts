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

import { _AuthenticationPolicyBasic } from './authentication-policy-basic';
import { _AuthenticationPolicyBearer } from './authentication-policy-bearer';
import { _AuthenticationPolicyOauth2 } from './authentication-policy-oauth2';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the CallGRPCWithServiceAuthentication class and type
 */
export type CallGRPCWithServiceAuthenticationIntersection = CallGRPCWithServiceAuthentication &
  Specification.CallGRPCWithServiceAuthentication;

/**
 * Represents a constructor for the intersection of the CallGRPCWithServiceAuthentication class and type
 */
export interface CallGRPCWithServiceAuthenticationConstructor {
  new (model?: Partial<Specification.CallGRPCWithServiceAuthentication>): CallGRPCWithServiceAuthenticationIntersection;
}

/**
 * Represents a CallGRPCWithServiceAuthentication with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class CallGRPCWithServiceAuthentication extends ObjectHydrator<Specification.CallGRPCWithServiceAuthentication> {
  /**
   * Instanciates a new instance of the CallGRPCWithServiceAuthentication class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the CallGRPCWithServiceAuthentication.
   */
  constructor(model?: Partial<Specification.CallGRPCWithServiceAuthentication>) {
    super(model);
    const self = this as unknown as Specification.CallGRPCWithServiceAuthentication & object;
    if (isObject(model)) {
      if (typeof model.basic === 'object')
        self.basic = new _AuthenticationPolicyBasic(model.basic as Specification.AuthenticationPolicyBasic);
      if (typeof model.bearer === 'object')
        self.bearer = new _AuthenticationPolicyBearer(model.bearer as Specification.AuthenticationPolicyBearer);
      if (typeof model.oauth2 === 'object')
        self.oauth2 = new _AuthenticationPolicyOauth2(model.oauth2 as Specification.AuthenticationPolicyOauth2);
    }
    getLifecycleHooks('CallGRPCWithServiceAuthentication')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the CallGRPCWithServiceAuthentication.
   * Throws if invalid.
   */
  validate() {
    const copy = new CallGRPCWithServiceAuthentication(this as any) as CallGRPCWithServiceAuthenticationIntersection;
    validate('CallGRPCWithServiceAuthentication', copy);
  }

  /**
   * Normalizes the current instance of the CallGRPCWithServiceAuthentication.
   * Creates a copy of the CallGRPCWithServiceAuthentication, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the CallGRPCWithServiceAuthentication instance.
   */
  normalize(): CallGRPCWithServiceAuthentication & Specification.CallGRPCWithServiceAuthentication {
    const copy = new CallGRPCWithServiceAuthentication(this as any) as CallGRPCWithServiceAuthenticationIntersection;
    return getLifecycleHooks('CallGRPCWithServiceAuthentication')?.normalize?.(copy) || copy;
  }
}

export const _CallGRPCWithServiceAuthentication =
  CallGRPCWithServiceAuthentication as CallGRPCWithServiceAuthenticationConstructor;
