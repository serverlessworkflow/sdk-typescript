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

import { _Error } from './error';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the RaiseTaskRaise class and type
 */
export type RaiseTaskRaiseIntersection = RaiseTaskRaise & Specification.RaiseTaskRaise;

/**
 * Represents a constructor for the intersection of the RaiseTaskRaise class and type
 */
export interface RaiseTaskRaiseConstructor {
  new (model?: Partial<Specification.RaiseTaskRaise>): RaiseTaskRaiseIntersection;
}

/**
 * Represents a RaiseTaskRaise with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class RaiseTaskRaise extends ObjectHydrator<Specification.RaiseTaskRaise> {
  /**
   * Instanciates a new instance of the RaiseTaskRaise class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the RaiseTaskRaise.
   */
  constructor(model?: Partial<Specification.RaiseTaskRaise>) {
    super(model);
    const self = this as unknown as Specification.RaiseTaskRaise & object;
    if (isObject(model)) {
      if (typeof model.error === 'object') self.error = new _Error(model.error);
    }
    getLifecycleHooks('RaiseTaskRaise')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the RaiseTaskRaise.
   * Throws if invalid.
   */
  validate() {
    const copy = new RaiseTaskRaise(this as any) as RaiseTaskRaiseIntersection;
    validate('RaiseTaskRaise', copy);
  }

  /**
   * Normalizes the current instance of the RaiseTaskRaise.
   * Creates a copy of the RaiseTaskRaise, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the RaiseTaskRaise instance.
   */
  normalize(): RaiseTaskRaise & Specification.RaiseTaskRaise {
    const copy = new RaiseTaskRaise(this as any) as RaiseTaskRaiseIntersection;
    return getLifecycleHooks('RaiseTaskRaise')?.normalize?.(copy) || copy;
  }
}

export const _RaiseTaskRaise = RaiseTaskRaise as RaiseTaskRaiseConstructor;
