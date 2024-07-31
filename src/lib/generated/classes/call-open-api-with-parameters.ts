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
 * Represents the intersection between the CallOpenAPIWithParameters class and type
 */
export type CallOpenAPIWithParametersIntersection = CallOpenAPIWithParameters & Specification.CallOpenAPIWithParameters;

/**
 * Represents a constructor for the intersection of the CallOpenAPIWithParameters class and type
 */
export interface CallOpenAPIWithParametersConstructor {
  new (model?: Partial<Specification.CallOpenAPIWithParameters>): CallOpenAPIWithParametersIntersection;
}

/**
 * Represents a CallOpenAPIWithParameters with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class CallOpenAPIWithParameters extends ObjectHydrator<Specification.CallOpenAPIWithParameters> {
  /**
   * Instanciates a new instance of the CallOpenAPIWithParameters class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the CallOpenAPIWithParameters.
   */
  constructor(model?: Partial<Specification.CallOpenAPIWithParameters>) {
    super(model);

    getLifecycleHooks('CallOpenAPIWithParameters')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the CallOpenAPIWithParameters.
   * Throws if invalid.
   */
  validate() {
    const copy = new CallOpenAPIWithParameters(this as any) as CallOpenAPIWithParametersIntersection;
    validate('CallOpenAPIWithParameters', copy);
  }

  /**
   * Normalizes the current instance of the CallOpenAPIWithParameters.
   * Creates a copy of the CallOpenAPIWithParameters, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the CallOpenAPIWithParameters instance.
   */
  normalize(): CallOpenAPIWithParameters & Specification.CallOpenAPIWithParameters {
    const copy = new CallOpenAPIWithParameters(this as any) as CallOpenAPIWithParametersIntersection;
    return getLifecycleHooks('CallOpenAPIWithParameters')?.normalize?.(copy) || copy;
  }
}

export const _CallOpenAPIWithParameters = CallOpenAPIWithParameters as CallOpenAPIWithParametersConstructor;
