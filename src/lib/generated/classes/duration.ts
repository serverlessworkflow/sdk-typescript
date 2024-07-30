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

class Duration extends ObjectHydrator<Specification.Duration> {
  constructor(model?: Partial<Specification.Duration>) {
    super(model);

    getLifecycleHook('Duration')?.constructor?.(this);
  }

  validate() {
    const copy = new Duration(this as any) as Duration & Specification.Duration;
    getLifecycleHook('Duration')?.preValidation?.(copy);
    validate('Duration', deepCopy(copy)); // deepCopy prevents potential additional properties error for constructor, validate, normalize
    getLifecycleHook('Duration')?.postValidation?.(copy);
  }

  normalize(): Duration & Specification.Duration {
    const copy = new Duration(this as any) as Duration & Specification.Duration;
    return getLifecycleHook('Duration')?.normalize?.(copy) || copy;
  }
}

export const _Duration = Duration as {
  new (model?: Partial<Specification.Duration>): Duration & Specification.Duration;
};
