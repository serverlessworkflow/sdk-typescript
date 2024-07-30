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

import { _EventFilterWith } from './event-filter-with';
import { _EventFilterCorrelate } from './event-filter-correlate';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHook } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { deepCopy, isObject } from '../../utils';

class EventFilter extends ObjectHydrator<Specification.EventFilter> {
  constructor(model?: Partial<Specification.EventFilter>) {
    super(model);
    const self = this as unknown as Specification.EventFilter & object;
    if (isObject(model)) {
      if (typeof model.with === 'object') self.with = new _EventFilterWith(model.with);
      if (typeof model.correlate === 'object') self.correlate = new _EventFilterCorrelate(model.correlate);
    }
    getLifecycleHook('EventFilter')?.constructor?.(this);
  }

  validate() {
    const copy = new EventFilter(this as any) as EventFilter & Specification.EventFilter;
    getLifecycleHook('EventFilter')?.preValidation?.(copy);
    validate('EventFilter', deepCopy(copy)); // deepCopy prevents potential additional properties error for constructor, validate, normalize
    getLifecycleHook('EventFilter')?.postValidation?.(copy);
  }

  normalize(): EventFilter & Specification.EventFilter {
    const copy = new EventFilter(this as any) as EventFilter & Specification.EventFilter;
    return getLifecycleHook('EventFilter')?.normalize?.(copy) || copy;
  }
}

export const _EventFilter = EventFilter as {
  new (model?: Partial<Specification.EventFilter>): EventFilter & Specification.EventFilter;
};
