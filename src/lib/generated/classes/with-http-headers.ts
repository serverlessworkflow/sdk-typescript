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

/*****************************************************************************************
 *
 * /!\ This file is computer generated. Any manual modification can and will be lost. /!\
 *
 *****************************************************************************************/

import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';

/**
 * Represents the intersection between the WithHTTPHeaders class and type
 */
export type WithHTTPHeadersIntersection = WithHTTPHeaders & Specification.WithHTTPHeaders;

/**
 * Represents a constructor for the intersection of the WithHTTPHeaders class and type
 */
export interface WithHTTPHeadersConstructor {
  new (model?: Partial<Specification.WithHTTPHeaders>): WithHTTPHeadersIntersection;
}

/**
 * Represents a WithHTTPHeaders with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class WithHTTPHeaders extends ObjectHydrator<Specification.WithHTTPHeaders> {
  /**
   * Instanciates a new instance of the WithHTTPHeaders class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the WithHTTPHeaders.
   */
  constructor(model?: Partial<Specification.WithHTTPHeaders>) {
    super(model);

    getLifecycleHooks('WithHTTPHeaders')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the WithHTTPHeaders.
   * Throws if invalid.
   */
  validate() {
    const copy = new WithHTTPHeaders(this as any) as WithHTTPHeadersIntersection;
    validate('WithHTTPHeaders', copy);
  }

  /**
   * Normalizes the current instance of the WithHTTPHeaders.
   * Creates a copy of the WithHTTPHeaders, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the WithHTTPHeaders instance.
   */
  normalize(): WithHTTPHeaders & Specification.WithHTTPHeaders {
    const copy = new WithHTTPHeaders(this as any) as WithHTTPHeadersIntersection;
    return getLifecycleHooks('WithHTTPHeaders')?.normalize?.(copy) || copy;
  }
}

export const _WithHTTPHeaders = WithHTTPHeaders as WithHTTPHeadersConstructor;
