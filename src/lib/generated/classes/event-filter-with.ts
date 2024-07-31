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
 * Represents the intersection between the EventFilterWith class and type
 */
export type EventFilterWithIntersection = EventFilterWith & Specification.EventFilterWith;

/**
 * Represents a constructor for the intersection of the EventFilterWith class and type
 */
export interface EventFilterWithConstructor {
  new (model?: Partial<Specification.EventFilterWith>): EventFilterWithIntersection;
}

/**
 * Represents a EventFilterWith with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class EventFilterWith extends ObjectHydrator<Specification.EventFilterWith> {
  /**
   * Instanciates a new instance of the EventFilterWith class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the EventFilterWith.
   */
  constructor(model?: Partial<Specification.EventFilterWith>) {
    super(model);

    getLifecycleHooks('EventFilterWith')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the EventFilterWith.
   * Throws if invalid.
   */
  validate() {
    const copy = new EventFilterWith(this as any) as EventFilterWithIntersection;
    validate('EventFilterWith', copy);
  }

  /**
   * Normalizes the current instance of the EventFilterWith.
   * Creates a copy of the EventFilterWith, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the EventFilterWith instance.
   */
  normalize(): EventFilterWith & Specification.EventFilterWith {
    const copy = new EventFilterWith(this as any) as EventFilterWithIntersection;
    return getLifecycleHooks('EventFilterWith')?.normalize?.(copy) || copy;
  }
}

export const _EventFilterWith = EventFilterWith as EventFilterWithConstructor;
