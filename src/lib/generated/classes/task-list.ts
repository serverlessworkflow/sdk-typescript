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

import { Specification } from '../definitions';

class TaskList extends Array<{ [k: string]: Specification.Task }> {
  constructor(model?: Array<{ [k: string]: Specification.Task }>) {
    super(...(model || []));
    if (model != null && !Array.isArray(model)) {
      throw new Error('The provided model should be an array');
    }
    Object.setPrototypeOf(this, Object.create(TaskList.prototype));
  }
}

export const _TaskList = TaskList; // could be exported directly, but it makes the job of building the index more straightforward as it's consistant with "object" classes
