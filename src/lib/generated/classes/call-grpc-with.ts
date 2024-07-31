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

import { _CallGRPCWithService } from './call-grpc-with-service';
import { _CallGRPCWithArguments } from './call-grpc-with-arguments';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the CallGRPCWith class and type
 */
export type CallGRPCWithIntersection = CallGRPCWith & Specification.CallGRPCWith;

/**
 * Represents a constructor for the intersection of the CallGRPCWith class and type
 */
export interface CallGRPCWithConstructor {
  new (model?: Partial<Specification.CallGRPCWith>): CallGRPCWithIntersection;
}

/**
 * Represents a CallGRPCWith with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class CallGRPCWith extends ObjectHydrator<Specification.CallGRPCWith> {
  /**
   * Instanciates a new instance of the CallGRPCWith class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the CallGRPCWith.
   */
  constructor(model?: Partial<Specification.CallGRPCWith>) {
    super(model);
    const self = this as unknown as Specification.CallGRPCWith & object;
    if (isObject(model)) {
      if (typeof model.service === 'object') self.service = new _CallGRPCWithService(model.service);
      if (typeof model.arguments === 'object') self.arguments = new _CallGRPCWithArguments(model.arguments);
    }
    getLifecycleHooks('CallGRPCWith')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the CallGRPCWith.
   * Throws if invalid.
   */
  validate() {
    const copy = new CallGRPCWith(this as any) as CallGRPCWithIntersection;
    validate('CallGRPCWith', copy);
  }

  /**
   * Normalizes the current instance of the CallGRPCWith.
   * Creates a copy of the CallGRPCWith, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the CallGRPCWith instance.
   */
  normalize(): CallGRPCWith & Specification.CallGRPCWith {
    const copy = new CallGRPCWith(this as any) as CallGRPCWithIntersection;
    return getLifecycleHooks('CallGRPCWith')?.normalize?.(copy) || copy;
  }
}

export const _CallGRPCWith = CallGRPCWith as CallGRPCWithConstructor;
