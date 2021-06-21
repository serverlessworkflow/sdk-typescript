/*
 * Copyright 2021-Present The Serverless Workflow Specification Authors
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { Eventdatafilter } from './eventdatafilter';
import { Metadata } from './metadata';
import { Transition } from './transition';
import { overwriteEventDataFilterValue, overwriteMetadataValue, overwriteTransitionValueIfObject } from './utils';

export class Transitioneventcondition {
  constructor(model: any) {
    Object.assign(this, model);

    overwriteTransitionValueIfObject(this);
    overwriteEventDataFilterValue(this);
    overwriteMetadataValue(this);
  }

  /**
   * Event condition name
   */
  name?: string;
  /**
   * References an unique event name in the defined workflow events
   */
  eventRef: string;
  /**
   * Next transition of the workflow if there is valid matches
   */
  transition: string | Transition;
  /**
   * Event data filter definition
   */
  eventDataFilter?: Eventdatafilter;
  metadata?: /* Metadata information */ Metadata;
}
