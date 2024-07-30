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
import { getLifecycleHook } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { deepCopy } from '../../utils';

class AuthenticationPolicyOauth2Client extends ObjectHydrator<Specification.AuthenticationPolicyOauth2Client> {
  constructor(model?: Partial<Specification.AuthenticationPolicyOauth2Client>) {
    super(model);

    getLifecycleHook('AuthenticationPolicyOauth2Client')?.constructor?.(this);
  }

  validate() {
    const copy = new AuthenticationPolicyOauth2Client(this as any) as AuthenticationPolicyOauth2Client &
      Specification.AuthenticationPolicyOauth2Client;
    getLifecycleHook('AuthenticationPolicyOauth2Client')?.preValidation?.(copy);
    validate('AuthenticationPolicyOauth2Client', deepCopy(copy)); // deepCopy prevents potential additional properties error for constructor, validate, normalize
    getLifecycleHook('AuthenticationPolicyOauth2Client')?.postValidation?.(copy);
  }

  normalize(): AuthenticationPolicyOauth2Client & Specification.AuthenticationPolicyOauth2Client {
    const copy = new AuthenticationPolicyOauth2Client(this as any) as AuthenticationPolicyOauth2Client &
      Specification.AuthenticationPolicyOauth2Client;
    return getLifecycleHook('AuthenticationPolicyOauth2Client')?.normalize?.(copy) || copy;
  }
}

export const _AuthenticationPolicyOauth2Client = AuthenticationPolicyOauth2Client as {
  new (
    model?: Partial<Specification.AuthenticationPolicyOauth2Client>,
  ): AuthenticationPolicyOauth2Client & Specification.AuthenticationPolicyOauth2Client;
};
