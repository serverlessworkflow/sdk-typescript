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
import {
  cleanSourceModelProperty,
  normalizeEventRef,
  normalizeFunctionRef,
  normalizeSubFlowRef,
  overwriteActionDataFilter,
  overwriteEventRef,
  overwriteFunctionRef,
  overwriteSleep,
  overwriteSubFlowRef,
} from './utils';
import { Subflowref } from './subflowref';
import { Sleep } from './sleep';

export class Action {
  sourceModel?: Action;
  /**
   * Unique action definition name
   */
  name?: string;
  functionRef?: string | Functionref;
  eventRef?: /* Event References */ Eventref;
  subFlowRef?: string | Subflowref;
  sleep?: Sleep;
  /**
   * References a defined workflow retry definition. If not defined the default retry policy is assumed
   */
  retryRef?: string;
  /**
   * List of unique references to defined workflow errors for which the action should not be retried. Used only when `autoRetries` is set to `true`
   */
  nonRetryableErrors?: [string, ...string[]];
  /**
   * List of unique references to defined workflow errors for which the action should be retried. Used only when `autoRetries` is set to `false`
   */
  retryableErrors?: [string, ...string[]];
  actionDataFilter?: Actiondatafilter;
  /**
   * Expression, if defined, must evaluate to true for this action to be performed. If false, action is disregarded
   */
  condition?: string;

  constructor(model: any) {
    this.sourceModel = Object.assign({}, model);

    Object.assign(this, model);

    overwriteFunctionRef(this);
    overwriteEventRef(this);
    overwriteSubFlowRef(this);
    overwriteSleep(this);
    overwriteActionDataFilter(this);
  }

  /**
   * Normalize the value of each property by recursively deleting properties whose value is equal to its default value. Does not modify the object state.
   * @returns {Specification.Action} without deleted properties.
   */
  normalize = (): Action => {
    const clone = new Action(this);

    normalizeSubFlowRef(clone);
    normalizeEventRef(clone);
    normalizeFunctionRef(clone);

    cleanSourceModelProperty(clone);

    return clone;
  };
}
