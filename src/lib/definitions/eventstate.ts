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
import { End } from './end';
import { Error } from './error';
import { Metadata } from './metadata';
import { Onevents } from './onevents';
import { Statedatafilter } from './statedatafilter';
import { Transition } from './transition';
import {
  setEndValueIfNoTransition,
  overwriteEndValueIfObject,
  overwriteMetadataValue,
  overwriteOnErrorsValue,
  overwriteOnEventsValue,
  overwriteStateDataFilterValue,
  overwriteTransitionValueIfObject,
  normalizeEndProperty,
  normalizeTransitionProperty,
  normalizeOnEventsProperty,
  normalizeOnErrorsProperty,
  normalizeExclusiveProperty,
} from './utils';

export class Eventstate /* This state is used to wait for events from event sources, then consumes them and invoke one or more actions to run in sequence or parallel */ {
  constructor(model: any) {
    const defaultModel = { type: 'event', exclusive: true };
    Object.assign(this, defaultModel, model);

    overwriteOnEventsValue(this);
    overwriteStateDataFilterValue(this);
    overwriteOnErrorsValue(this);
    overwriteTransitionValueIfObject(this);
    overwriteEndValueIfObject(this);
    overwriteMetadataValue(this);
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
  type: 'event';
  /**
   * If true consuming one of the defined events causes its associated actions to be performed. If false all of the defined events must be consumed in order for actions to be performed
   */
  exclusive?: boolean;
  /**
   * Define the events to be consumed and optional actions to be performed
   */
  onEvents: Onevents[];
  /**
   * Time period to wait for incoming events (ISO 8601 format)
   */
  timeout?: string;
  stateDataFilter?: Statedatafilter;
  /**
   * States error handling and retries definitions
   */
  onErrors?: Error[];
  transition?: string | Transition;
  end: boolean | End;
  /**
   * Unique Name of a workflow state which is responsible for compensation of this state
   */
  compensatedBy?: string;
  metadata?: /* Metadata information */ Metadata;

  /**
   * Normalize the value of each property by recursively deleting properties whose value is equal to its default value. Does not modify the object state.
   * @returns {Specification.Eventstate} without deleted properties.
   */
  normalize(): Eventstate {
    const clone = new Eventstate(this);

    normalizeExclusiveProperty(clone);
    normalizeOnEventsProperty(clone);
    normalizeOnErrorsProperty(clone);
    normalizeEndProperty(clone);
    normalizeTransitionProperty(clone);
    setEndValueIfNoTransition(clone);

    return clone;
  }
}
