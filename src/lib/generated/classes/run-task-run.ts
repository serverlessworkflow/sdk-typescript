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

import { _RunTaskRunContainer } from './run-task-run-container';
import { _RunTaskRunShell } from './run-task-run-shell';
import { _RunTaskRunWorkflow } from './run-task-run-workflow';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHook } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { deepCopy, isObject } from '../../utils';

class RunTaskRun extends ObjectHydrator<Specification.RunTaskRun> {
  constructor(model?: Partial<Specification.RunTaskRun>) {
    super(model);
    const self = this as unknown as Specification.RunTaskRun & object;
    if (isObject(model)) {
      if (typeof model.container === 'object')
        self.container = new _RunTaskRunContainer(model.container as Specification.RunTaskRunContainer);
      if (typeof model.shell === 'object')
        self.shell = new _RunTaskRunShell(model.shell as Specification.RunTaskRunShell);
      if (typeof model.workflow === 'object')
        self.workflow = new _RunTaskRunWorkflow(model.workflow as Specification.RunTaskRunWorkflow);
    }
    getLifecycleHook('RunTaskRun')?.constructor?.(this);
  }

  validate() {
    const copy = new RunTaskRun(this as any) as RunTaskRun & Specification.RunTaskRun;
    getLifecycleHook('RunTaskRun')?.preValidation?.(copy);
    validate('RunTaskRun', deepCopy(copy)); // deepCopy prevents potential additional properties error for constructor, validate, normalize
    getLifecycleHook('RunTaskRun')?.postValidation?.(copy);
  }

  normalize(): RunTaskRun & Specification.RunTaskRun {
    const copy = new RunTaskRun(this as any) as RunTaskRun & Specification.RunTaskRun;
    return getLifecycleHook('RunTaskRun')?.normalize?.(copy) || copy;
  }
}

export const _RunTaskRun = RunTaskRun as {
  new (model?: Partial<Specification.RunTaskRun>): RunTaskRun & Specification.RunTaskRun;
};
