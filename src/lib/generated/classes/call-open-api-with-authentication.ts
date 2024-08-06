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
 * Represents the intersection between the CallOpenAPIWithAuthentication class and type
 */
export type CallOpenAPIWithAuthenticationIntersection = CallOpenAPIWithAuthentication &
  Specification.CallOpenAPIWithAuthentication;

/**
 * Represents a constructor for the intersection of the CallOpenAPIWithAuthentication class and type
 */
export interface CallOpenAPIWithAuthenticationConstructor {
  new (model?: Partial<Specification.CallOpenAPIWithAuthentication>): CallOpenAPIWithAuthenticationIntersection;
}

/**
 * Represents a CallOpenAPIWithAuthentication with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class CallOpenAPIWithAuthentication extends ObjectHydrator<Specification.CallOpenAPIWithAuthentication> {
  /**
   * Instanciates a new instance of the CallOpenAPIWithAuthentication class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the CallOpenAPIWithAuthentication.
   */
  constructor(model?: Partial<Specification.CallOpenAPIWithAuthentication>) {
    super(model);
    const self = this as unknown as Specification.CallOpenAPIWithAuthentication & object;
    if (isObject(model)) {
      if (typeof (model as { [k: string]: unknown; basic: Specification.AuthenticationPolicyBasic }).basic === 'object')
        (self as { [k: string]: unknown; basic: Specification.AuthenticationPolicyBasic }).basic =
          new _AuthenticationPolicyBasic(
            (model as { [k: string]: unknown; basic: Specification.AuthenticationPolicyBasic })
              .basic as Specification.AuthenticationPolicyBasic,
          );
      if (
        typeof (model as { [k: string]: unknown; bearer: Specification.AuthenticationPolicyBearer }).bearer === 'object'
      )
        (self as { [k: string]: unknown; bearer: Specification.AuthenticationPolicyBearer }).bearer =
          new _AuthenticationPolicyBearer(
            (model as { [k: string]: unknown; bearer: Specification.AuthenticationPolicyBearer })
              .bearer as Specification.AuthenticationPolicyBearer,
          );
      if (
        typeof (model as { [k: string]: unknown; oauth2: Specification.AuthenticationPolicyOauth2 }).oauth2 === 'object'
      )
        (self as { [k: string]: unknown; oauth2: Specification.AuthenticationPolicyOauth2 }).oauth2 =
          new _AuthenticationPolicyOauth2(
            (model as { [k: string]: unknown; oauth2: Specification.AuthenticationPolicyOauth2 })
              .oauth2 as Specification.AuthenticationPolicyOauth2,
          );
    }
    getLifecycleHooks('CallOpenAPIWithAuthentication')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the CallOpenAPIWithAuthentication.
   * Throws if invalid.
   */
  validate() {
    const copy = new CallOpenAPIWithAuthentication(this as any) as CallOpenAPIWithAuthenticationIntersection;
    validate('CallOpenAPIWithAuthentication', copy);
  }

  /**
   * Normalizes the current instance of the CallOpenAPIWithAuthentication.
   * Creates a copy of the CallOpenAPIWithAuthentication, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the CallOpenAPIWithAuthentication instance.
   */
  normalize(): CallOpenAPIWithAuthentication & Specification.CallOpenAPIWithAuthentication {
    const copy = new CallOpenAPIWithAuthentication(this as any) as CallOpenAPIWithAuthenticationIntersection;
    return getLifecycleHooks('CallOpenAPIWithAuthentication')?.normalize?.(copy) || copy;
  }
}

export const _CallOpenAPIWithAuthentication = CallOpenAPIWithAuthentication as CallOpenAPIWithAuthenticationConstructor;
