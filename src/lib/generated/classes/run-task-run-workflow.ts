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

import { _RunTaskRunWorkflowInput } from './run-task-run-workflow-input';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHook } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { deepCopy, isObject } from '../../utils';

class RunTaskRunWorkflow extends ObjectHydrator<Specification.RunTaskRunWorkflow> {
  constructor(model?: Partial<Specification.RunTaskRunWorkflow>) {
    super(model);
    const self = this as unknown as Specification.RunTaskRunWorkflow & object;
    if (isObject(model)) {
      if (typeof model.input === 'object') self.input = new _RunTaskRunWorkflowInput(model.input);
    }
    getLifecycleHook('RunTaskRunWorkflow')?.constructor?.(this);
  }

  validate() {
    const copy = new RunTaskRunWorkflow(this as any) as RunTaskRunWorkflow & Specification.RunTaskRunWorkflow;
    getLifecycleHook('RunTaskRunWorkflow')?.preValidation?.(copy);
    validate('RunTaskRunWorkflow', deepCopy(copy)); // deepCopy prevents potential additional properties error for constructor, validate, normalize
    getLifecycleHook('RunTaskRunWorkflow')?.postValidation?.(copy);
  }

  normalize(): RunTaskRunWorkflow & Specification.RunTaskRunWorkflow {
    const copy = new RunTaskRunWorkflow(this as any) as RunTaskRunWorkflow & Specification.RunTaskRunWorkflow;
    return getLifecycleHook('RunTaskRunWorkflow')?.normalize?.(copy) || copy;
  }
}

export const _RunTaskRunWorkflow = RunTaskRunWorkflow as {
  new (model?: Partial<Specification.RunTaskRunWorkflow>): RunTaskRunWorkflow & Specification.RunTaskRunWorkflow;
};
