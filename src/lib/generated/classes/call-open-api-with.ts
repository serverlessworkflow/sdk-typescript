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

import { _CallOpenAPIWithParameters } from './call-open-api-with-parameters';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the CallOpenAPIWith class and type
 */
export type CallOpenAPIWithIntersection = CallOpenAPIWith & Specification.CallOpenAPIWith;

/**
 * Represents a constructor for the intersection of the CallOpenAPIWith class and type
 */
export interface CallOpenAPIWithConstructor {
  new (model?: Partial<Specification.CallOpenAPIWith>): CallOpenAPIWithIntersection;
}

/**
 * Represents a CallOpenAPIWith with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class CallOpenAPIWith extends ObjectHydrator<Specification.CallOpenAPIWith> {
  /**
   * Instanciates a new instance of the CallOpenAPIWith class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the CallOpenAPIWith.
   */
  constructor(model?: Partial<Specification.CallOpenAPIWith>) {
    super(model);
    const self = this as unknown as Specification.CallOpenAPIWith & object;
    if (isObject(model)) {
      if (typeof model.parameters === 'object') self.parameters = new _CallOpenAPIWithParameters(model.parameters);
    }
    getLifecycleHooks('CallOpenAPIWith')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the CallOpenAPIWith.
   * Throws if invalid.
   */
  validate() {
    const copy = new CallOpenAPIWith(this as any) as CallOpenAPIWithIntersection;
    validate('CallOpenAPIWith', copy);
  }

  /**
   * Normalizes the current instance of the CallOpenAPIWith.
   * Creates a copy of the CallOpenAPIWith, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the CallOpenAPIWith instance.
   */
  normalize(): CallOpenAPIWith & Specification.CallOpenAPIWith {
    const copy = new CallOpenAPIWith(this as any) as CallOpenAPIWithIntersection;
    return getLifecycleHooks('CallOpenAPIWith')?.normalize?.(copy) || copy;
  }
}

export const _CallOpenAPIWith = CallOpenAPIWith as CallOpenAPIWithConstructor;
