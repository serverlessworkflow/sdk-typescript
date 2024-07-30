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

class Oauth2Token extends ObjectHydrator<Specification.Oauth2Token> {
  constructor(model?: Partial<Specification.Oauth2Token>) {
    super(model);

    getLifecycleHook('Oauth2Token')?.constructor?.(this);
  }

  validate() {
    const copy = new Oauth2Token(this as any) as Oauth2Token & Specification.Oauth2Token;
    getLifecycleHook('Oauth2Token')?.preValidation?.(copy);
    validate('Oauth2Token', deepCopy(copy)); // deepCopy prevents potential additional properties error for constructor, validate, normalize
    getLifecycleHook('Oauth2Token')?.postValidation?.(copy);
  }

  normalize(): Oauth2Token & Specification.Oauth2Token {
    const copy = new Oauth2Token(this as any) as Oauth2Token & Specification.Oauth2Token;
    return getLifecycleHook('Oauth2Token')?.normalize?.(copy) || copy;
  }
}

export const _Oauth2Token = Oauth2Token as {
  new (model?: Partial<Specification.Oauth2Token>): Oauth2Token & Specification.Oauth2Token;
};
