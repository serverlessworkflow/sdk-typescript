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
import { Metadata } from './metadata';
import { normalizeKindProperty, overwriteCorrelationValue, overwriteMetadataValue } from './utils';
import { CorrelationDefs } from './types';

export class Eventdef {
  constructor(model: any) {
    const defaultModel = {
      kind: 'consumed',
    };
    Object.assign(this, defaultModel, model);

    overwriteMetadataValue(this);
    overwriteCorrelationValue(this);
  }

  /**
   * Unique event name
   */
  name?: string;
  /**
   * CloudEvent source
   */
  source?: string;
  /**
   * CloudEvent type
   */
  type?: string;
  /**
   * Defines the CloudEvent as either 'consumed' or 'produced' by the workflow. Default is 'consumed'
   */
  kind?: 'consumed' | 'produced';
  /**
   * CloudEvent correlation definitions
   */
  correlation?: CorrelationDefs;
  /**
   * Metadata information
   */
  metadata?: /* Metadata information */ Metadata;

  /**
   * Normalize the value of each property by recursively deleting properties whose value is equal to its default value. Does not modify the object state.
   * @returns {Specification.Eventdef} without deleted properties.
   */
  normalize = (): Eventdef => {
    const clone = new Eventdef(this);

    normalizeKindProperty(clone);

    return clone;
  };
}
