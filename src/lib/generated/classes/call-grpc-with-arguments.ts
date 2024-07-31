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
 * Represents the intersection between the CallGRPCWithArguments class and type
 */
export type CallGRPCWithArgumentsIntersection = CallGRPCWithArguments & Specification.CallGRPCWithArguments;

/**
 * Represents a constructor for the intersection of the CallGRPCWithArguments class and type
 */
export interface CallGRPCWithArgumentsConstructor {
  new (model?: Partial<Specification.CallGRPCWithArguments>): CallGRPCWithArgumentsIntersection;
}

/**
 * Represents a CallGRPCWithArguments with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class CallGRPCWithArguments extends ObjectHydrator<Specification.CallGRPCWithArguments> {
  /**
   * Instanciates a new instance of the CallGRPCWithArguments class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the CallGRPCWithArguments.
   */
  constructor(model?: Partial<Specification.CallGRPCWithArguments>) {
    super(model);

    getLifecycleHooks('CallGRPCWithArguments')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the CallGRPCWithArguments.
   * Throws if invalid.
   */
  validate() {
    const copy = new CallGRPCWithArguments(this as any) as CallGRPCWithArgumentsIntersection;
    validate('CallGRPCWithArguments', copy);
  }

  /**
   * Normalizes the current instance of the CallGRPCWithArguments.
   * Creates a copy of the CallGRPCWithArguments, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the CallGRPCWithArguments instance.
   */
  normalize(): CallGRPCWithArguments & Specification.CallGRPCWithArguments {
    const copy = new CallGRPCWithArguments(this as any) as CallGRPCWithArgumentsIntersection;
    return getLifecycleHooks('CallGRPCWithArguments')?.normalize?.(copy) || copy;
  }
}

export const _CallGRPCWithArguments = CallGRPCWithArguments as CallGRPCWithArgumentsConstructor;
