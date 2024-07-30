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

import { _AuthenticationPolicyOauth2Client } from './authentication-policy-oauth2-client';
import { _Oauth2Token } from './oauth2-token';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHook } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { deepCopy, isObject } from '../../utils';

class AuthenticationPolicyOauth2 extends ObjectHydrator<Specification.AuthenticationPolicyOauth2> {
  constructor(model?: Partial<Specification.AuthenticationPolicyOauth2>) {
    super(model);
    const self = this as unknown as Specification.AuthenticationPolicyOauth2 & object;
    if (isObject(model)) {
      if (typeof model.client === 'object') self.client = new _AuthenticationPolicyOauth2Client(model.client);
      if (typeof model.subject === 'object') self.subject = new _Oauth2Token(model.subject);
      if (typeof model.actor === 'object') self.actor = new _Oauth2Token(model.actor);
    }
    getLifecycleHook('AuthenticationPolicyOauth2')?.constructor?.(this);
  }

  validate() {
    const copy = new AuthenticationPolicyOauth2(this as any) as AuthenticationPolicyOauth2 &
      Specification.AuthenticationPolicyOauth2;
    getLifecycleHook('AuthenticationPolicyOauth2')?.preValidation?.(copy);
    validate('AuthenticationPolicyOauth2', deepCopy(copy)); // deepCopy prevents potential additional properties error for constructor, validate, normalize
    getLifecycleHook('AuthenticationPolicyOauth2')?.postValidation?.(copy);
  }

  normalize(): AuthenticationPolicyOauth2 & Specification.AuthenticationPolicyOauth2 {
    const copy = new AuthenticationPolicyOauth2(this as any) as AuthenticationPolicyOauth2 &
      Specification.AuthenticationPolicyOauth2;
    return getLifecycleHook('AuthenticationPolicyOauth2')?.normalize?.(copy) || copy;
  }
}

export const _AuthenticationPolicyOauth2 = AuthenticationPolicyOauth2 as {
  new (
    model?: Partial<Specification.AuthenticationPolicyOauth2>,
  ): AuthenticationPolicyOauth2 & Specification.AuthenticationPolicyOauth2;
};
