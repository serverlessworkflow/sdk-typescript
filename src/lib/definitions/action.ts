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
import { Actiondatafilter } from './actiondatafilter';
import { Eventref } from './eventref';
import { Functionref } from './functionref';
import { overwriteActionDataFilterValue, overwriteEventRefValue, overwriteFunctionRefValue } from './utils';

export class Action {
  constructor(model: any) {
    Object.assign(this, model);

    overwriteFunctionRefValue(this);
    overwriteEventRefValue(this);
    overwriteActionDataFilterValue(this);
  }

  /**
   * Unique action definition name
   */
  name?: string;
  functionRef: string | Functionref;
  eventRef?: /* Event References */ Eventref;
  /**
   * Time period to wait for function execution to complete
   */
  timeout?: string;
  actionDataFilter?: Actiondatafilter;
}
