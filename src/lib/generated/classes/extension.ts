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
import { _TaskList } from './task-list';
import { Specification } from '../definitions';
import { isObject } from '../../utils';

class Extension extends ObjectHydrator<Specification.Extension> {
  constructor(model?: Partial<Specification.Extension>) {
    super(model);
    const self = this as unknown as Specification.Extension & object;
    if (isObject(model)) {
      if (typeof model.before === 'object') self.before = new _TaskList(model.before);
      if (typeof model.after === 'object') self.after = new _TaskList(model.after);
    }
  }
}

export const _Extension = Extension as {
  new (model?: Partial<Specification.Extension>): Extension & Specification.Extension;
};
