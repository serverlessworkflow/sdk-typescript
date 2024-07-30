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
import { _RunTaskRunShellArguments } from './run-task-run-shell-arguments';
import { _RunTaskRunShellEnvironment } from './run-task-run-shell-environment';
import { Specification } from '../definitions';
import { isObject } from '../../utils';

class RunTaskRunShell extends ObjectHydrator<Specification.RunTaskRunShell> {
  constructor(model?: Partial<Specification.RunTaskRunShell>) {
    super(model);
    const self = this as unknown as Specification.RunTaskRunShell & object;
    if (isObject(model)) {
      if (typeof model.arguments === 'object') self.arguments = new _RunTaskRunShellArguments(model.arguments);
      if (typeof model.environment === 'object') self.environment = new _RunTaskRunShellEnvironment(model.environment);
    }
  }
}

export const _RunTaskRunShell = RunTaskRunShell as {
  new (model?: Partial<Specification.RunTaskRunShell>): RunTaskRunShell & Specification.RunTaskRunShell;
};
