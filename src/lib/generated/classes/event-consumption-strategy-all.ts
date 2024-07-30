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

import { _EventFilter } from './event-filter';
import { Specification } from '../definitions';
import { ArrayHydrator } from '../../hydrator';
import { getLifecycleHook } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { deepCopy } from '../../utils';

class EventConsumptionStrategyAll extends ArrayHydrator<Specification.EventFilter> {
  constructor(model?: Array<Specification.EventFilter> | number) {
    super(model);
    if (Array.isArray(model)) {
      if (model?.length) {
        this.splice(0, this.length);
        model.forEach((item) => this.push(new _EventFilter(item)));
      }
    }
    Object.setPrototypeOf(this, Object.create(EventConsumptionStrategyAll.prototype));
    getLifecycleHook('EventConsumptionStrategyAll')?.constructor?.(this);
  }

  validate() {
    const copy = new EventConsumptionStrategyAll(this);
    getLifecycleHook('EventConsumptionStrategyAll')?.preValidation?.(copy);
    validate('EventConsumptionStrategyAll', deepCopy(copy)); // deepCopy prevents potential additional properties error for constructor, validate, normalize
    getLifecycleHook('EventConsumptionStrategyAll')?.postValidation?.(copy);
  }

  normalize(): EventConsumptionStrategyAll {
    const copy = new EventConsumptionStrategyAll(this);
    return getLifecycleHook('EventConsumptionStrategyAll')?.normalize?.(copy) || copy;
  }
}

export const _EventConsumptionStrategyAll = EventConsumptionStrategyAll; // could be exported directly, but it makes the job of building the index more straightforward as it's consistant with "object" classes
