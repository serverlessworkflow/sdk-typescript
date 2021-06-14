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
import { Defaultdef } from './defaultdef';
import { Error } from './error';
import { Eventcondition } from './eventcondition';
import { Metadata } from './metadata';
import { Statedatafilter } from './statedatafilter';

export class Eventbasedswitch {
  constructor(model: any) {
    const result = { usedForCompensation: false };
    Object.assign(this, result, model);
  }

  /**
   * Unique State id
   */
  id?: string;
  /**
   * State name
   */
  name: string;
  /**
   * State type
   */
  type: 'switch';
  /**
   * State data filter
   */
  stateDataFilter?: Statedatafilter;
  /**
   * Defines conditions evaluated against events
   */
  eventConditions: Eventcondition[];
  /**
   * States error handling and retries definitions
   */
  onErrors?: Error[];
  /**
   * If eventConditions is used, defines the time period to wait for events (ISO 8601 format)
   */
  eventTimeout?: string;
  /**
   * Default transition of the workflow if there is no matching data conditions. Can include a transition or end definition
   */
  default?: /* Default definition. Can be either a transition or end definition */ Defaultdef;
  /**
   * Unique Name of a workflow state which is responsible for compensation of this state
   */
  compensatedBy?: string;
  /**
   * If true, this state is used to compensate another state. Default is false
   */
  usedForCompensation?: boolean;
  metadata?: /* Metadata information */ Metadata;
}