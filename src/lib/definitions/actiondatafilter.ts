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

export class Actiondatafilter {
  /**
   * Workflow expression that selects state data that the state action can use
   */
  fromStateData?: string;
  /**
   * If set to false, action data results are not added/merged to state data. In this case 'results' and 'toStateData' should be ignored. Default is true.
   */
  useResults?: boolean;
  /**
   * Workflow expression that filters the actions data results
   */
  results?: string;
  /**
   * Workflow expression that selects a state data element to which the action results should be added/merged into. If not specified, denote, the top-level state data element
   */
  toStateData?: string;

  constructor(model: any) {
    Object.assign(this, model);
  }
}
