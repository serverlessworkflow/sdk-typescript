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

import { IEventdatafilter, Eventdatafilter } from './eventdatafilter';
import { IMetadata, Metadata } from './metadata';
import { ITransition, Transition } from './transition';
import {
  cleanSourceModelProperty,
  isPlainObject,
  normalizeTransition,
  overwriteEventDataFilter,
  overwriteMetadata,
  overwriteTransition,
} from './utils';
import toPlainObject from 'lodash.toplainobject';

export interface ITransitioneventcondition {
  sourceModel?: ITransitioneventcondition;
  name?: string;
  eventRef: string;
  transition: string | ITransition;
  eventDataFilter?: IEventdatafilter;
  metadata?: IMetadata;

  normalize(): ITransitioneventcondition;
  asPlainObject(): ITransitioneventcondition;
}

export class Transitioneventcondition implements ITransitioneventcondition {
  sourceModel?: Transitioneventcondition;
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

  constructor(model: any) {
    this.sourceModel = Object.assign({}, model);

    Object.assign(this, model);

    overwriteTransition(this);
    overwriteEventDataFilter(this);
    overwriteMetadata(this);
  }

  /**
   * Normalize the value of each property by recursively deleting properties whose value is equal to its default value. Does not modify the object state.
   * @returns {Specification.ITransitioneventcondition} without deleted properties.
   */
  normalize(): ITransitioneventcondition {
    const clone = new Transitioneventcondition(this);

    normalizeTransition(clone);

    cleanSourceModelProperty(clone);

    if (isPlainObject(this)) {
      return toPlainObject(clone);
    }

    return clone;
  }

  /**
   * Create a shallow copy as plain object
   * @returns {Specification.ITransitioneventcondition} as plain object.
   */
  asPlainObject(): ITransitioneventcondition {
    return toPlainObject(this);
  }
}
