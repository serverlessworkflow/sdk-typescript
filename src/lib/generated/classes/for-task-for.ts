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
 * Represents the intersection between the ForTaskFor class and type
 */
export type ForTaskForIntersection = ForTaskFor & Specification.ForTaskFor;

/**
 * Represents a constructor for the intersection of the ForTaskFor class and type
 */
export interface ForTaskForConstructor {
  new (model?: Partial<Specification.ForTaskFor>): ForTaskForIntersection;
}

/**
 * Represents a ForTaskFor with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class ForTaskFor extends ObjectHydrator<Specification.ForTaskFor> {
  /**
   * Instanciates a new instance of the ForTaskFor class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the ForTaskFor.
   */
  constructor(model?: Partial<Specification.ForTaskFor>) {
    super(model);

    getLifecycleHooks('ForTaskFor')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the ForTaskFor.
   * Throws if invalid.
   */
  validate() {
    const copy = new ForTaskFor(this as any) as ForTaskForIntersection;
    validate('ForTaskFor', copy);
  }

  /**
   * Normalizes the current instance of the ForTaskFor.
   * Creates a copy of the ForTaskFor, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the ForTaskFor instance.
   */
  normalize(): ForTaskFor & Specification.ForTaskFor {
    const copy = new ForTaskFor(this as any) as ForTaskForIntersection;
    return getLifecycleHooks('ForTaskFor')?.normalize?.(copy) || copy;
  }
}

export const _ForTaskFor = ForTaskFor as ForTaskForConstructor;
