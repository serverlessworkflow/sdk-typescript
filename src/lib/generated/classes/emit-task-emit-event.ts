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
 * Represents the intersection between the EmitTaskEmitEvent class and type
 */
export type EmitTaskEmitEventIntersection = EmitTaskEmitEvent & Specification.EmitTaskEmitEvent;

/**
 * Represents a constructor for the intersection of the EmitTaskEmitEvent class and type
 */
export interface EmitTaskEmitEventConstructor {
  new (model?: Partial<Specification.EmitTaskEmitEvent>): EmitTaskEmitEventIntersection;
}

/**
 * Represents a EmitTaskEmitEvent with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class EmitTaskEmitEvent extends ObjectHydrator<Specification.EmitTaskEmitEvent> {
  /**
   * Instanciates a new instance of the EmitTaskEmitEvent class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the EmitTaskEmitEvent.
   */
  constructor(model?: Partial<Specification.EmitTaskEmitEvent>) {
    super(model);

    getLifecycleHooks('EmitTaskEmitEvent')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the EmitTaskEmitEvent.
   * Throws if invalid.
   */
  validate() {
    const copy = new EmitTaskEmitEvent(this as any) as EmitTaskEmitEventIntersection;
    validate('EmitTaskEmitEvent', copy);
  }

  /**
   * Normalizes the current instance of the EmitTaskEmitEvent.
   * Creates a copy of the EmitTaskEmitEvent, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the EmitTaskEmitEvent instance.
   */
  normalize(): EmitTaskEmitEvent & Specification.EmitTaskEmitEvent {
    const copy = new EmitTaskEmitEvent(this as any) as EmitTaskEmitEventIntersection;
    return getLifecycleHooks('EmitTaskEmitEvent')?.normalize?.(copy) || copy;
  }
}

export const _EmitTaskEmitEvent = EmitTaskEmitEvent as EmitTaskEmitEventConstructor;
