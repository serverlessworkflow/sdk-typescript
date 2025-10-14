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

import { IMetadata, Metadata } from './metadata';
import { ITransition, Transition } from './transition';
import { cleanSourceModelProperty, normalizeTransition, overwriteMetadata, overwriteTransition } from './utils';
import toPlainObject from 'lodash.toplainobject';

export interface ITransitiondatacondition {
  sourceModel?: ITransitiondatacondition;
  name?: string;
  condition: string;
  transition: string | ITransition;
  metadata?: IMetadata;

  normalize(): ITransitiondatacondition;
}

export class Transitiondatacondition implements ITransitiondatacondition {
  sourceModel?: ITransitiondatacondition;
  /**
   * Data condition name
   */
  name?: string;
  /**
   * Workflow expression evaluated against state data. Must evaluate to true or false
   */
  condition: string;
  /**
   * Workflow transition if condition is evaluated to true
   */
  transition: string | Transition;
  metadata?: /* Metadata information */ Metadata;

  constructor(model: any) {
    this.sourceModel = Object.assign({}, model);

    Object.assign(this, model);

    overwriteTransition(this);
    overwriteMetadata(this);
  }

  /**
   * Normalize the value of each property by recursively deleting properties whose value is equal to its default value. Does not modify the object state.
   * @returns {Specification.ITransitiondatacondition} without deleted properties.
   */
  normalize(): ITransitiondatacondition {
    const clone = new Transitiondatacondition(this);

    normalizeTransition(clone);

    cleanSourceModelProperty(clone);

    return toPlainObject(clone);
  }
}
