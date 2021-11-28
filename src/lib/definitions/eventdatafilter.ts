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

export class Eventdatafilter {
  constructor(model: any) {
    Object.assign(this, model);
  }

  /**
   * If set to false, event payload is not added/merged to state data. In this case 'data' and 'toStateData' should be ignored. Default is true.
   */
  useData?: boolean;
  /**
   * Workflow expression that filters the received event payload (default: '${ . }')
   */
  data?: string;
  /**
   *  Workflow expression that selects a state data element to which the filtered event should be added/merged into. If not specified, denotes, the top-level state data element.
   */
  toStateData?: string;
}
