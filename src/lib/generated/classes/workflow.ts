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

import { _Document } from './document';
import { _Input } from './input';
import { _Use } from './use';
import { _TaskList } from './task-list';
import { _Timeout } from './timeout';
import { _Output } from './output';
import { _Schedule } from './schedule';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHook } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { deepCopy, isObject } from '../../utils';

class Workflow extends ObjectHydrator<Specification.Workflow> {
  constructor(model?: Partial<Specification.Workflow>) {
    super(model);
    const self = this as unknown as Specification.Workflow & object;
    if (isObject(model)) {
      if (typeof model.document === 'object') self.document = new _Document(model.document);
      if (typeof model.input === 'object') self.input = new _Input(model.input);
      if (typeof model.use === 'object') self.use = new _Use(model.use);
      if (typeof model.do === 'object') self.do = new _TaskList(model.do);
      if (typeof model.timeout === 'object') self.timeout = new _Timeout(model.timeout);
      if (typeof model.output === 'object') self.output = new _Output(model.output);
      if (typeof model.schedule === 'object') self.schedule = new _Schedule(model.schedule);
    }
    getLifecycleHook('Workflow')?.constructor?.(this);
  }

  validate() {
    const copy = new Workflow(this as any) as Workflow & Specification.Workflow;
    getLifecycleHook('Workflow')?.preValidation?.(copy);
    validate('Workflow', deepCopy(copy)); // deepCopy prevents potential additional properties error for constructor, validate, normalize
    getLifecycleHook('Workflow')?.postValidation?.(copy);
  }

  normalize(): Workflow & Specification.Workflow {
    const copy = new Workflow(this as any) as Workflow & Specification.Workflow;
    return getLifecycleHook('Workflow')?.normalize?.(copy) || copy;
  }
}

export const _Workflow = Workflow as {
  new (model?: Partial<Specification.Workflow>): Workflow & Specification.Workflow;
};
