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

import { _EmitTaskEmitEvent } from './emit-task-emit-event';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the EmitTaskEmit class and type
 */
export type EmitTaskEmitIntersection = EmitTaskEmit & Specification.EmitTaskEmit;

/**
 * Represents a constructor for the intersection of the EmitTaskEmit class and type
 */
export interface EmitTaskEmitConstructor {
  new (model?: Partial<Specification.EmitTaskEmit>): EmitTaskEmitIntersection;
}

/**
 * Represents a EmitTaskEmit with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class EmitTaskEmit extends ObjectHydrator<Specification.EmitTaskEmit> {
  /**
   * Instanciates a new instance of the EmitTaskEmit class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the EmitTaskEmit.
   */
  constructor(model?: Partial<Specification.EmitTaskEmit>) {
    super(model);
    const self = this as unknown as Specification.EmitTaskEmit & object;
    if (isObject(model)) {
      if (typeof model.event === 'object') self.event = new _EmitTaskEmitEvent(model.event);
    }
    getLifecycleHooks('EmitTaskEmit')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the EmitTaskEmit.
   * Throws if invalid.
   */
  validate() {
    const copy = new EmitTaskEmit(this as any) as EmitTaskEmitIntersection;
    validate('EmitTaskEmit', copy);
  }

  /**
   * Normalizes the current instance of the EmitTaskEmit.
   * Creates a copy of the EmitTaskEmit, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the EmitTaskEmit instance.
   */
  normalize(): EmitTaskEmit & Specification.EmitTaskEmit {
    const copy = new EmitTaskEmit(this as any) as EmitTaskEmitIntersection;
    return getLifecycleHooks('EmitTaskEmit')?.normalize?.(copy) || copy;
  }
}

export const _EmitTaskEmit = EmitTaskEmit as EmitTaskEmitConstructor;
