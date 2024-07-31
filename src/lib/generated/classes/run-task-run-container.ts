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
 * Represents the intersection between the RunTaskRunContainer class and type
 */
export type RunTaskRunContainerIntersection = RunTaskRunContainer & Specification.RunTaskRunContainer;

/**
 * Represents a constructor for the intersection of the RunTaskRunContainer class and type
 */
export interface RunTaskRunContainerConstructor {
  new (model?: Partial<Specification.RunTaskRunContainer>): RunTaskRunContainerIntersection;
}

/**
 * Represents a RunTaskRunContainer with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class RunTaskRunContainer extends ObjectHydrator<Specification.RunTaskRunContainer> {
  /**
   * Instanciates a new instance of the RunTaskRunContainer class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the RunTaskRunContainer.
   */
  constructor(model?: Partial<Specification.RunTaskRunContainer>) {
    super(model);

    getLifecycleHooks('RunTaskRunContainer')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the RunTaskRunContainer.
   * Throws if invalid.
   */
  validate() {
    const copy = new RunTaskRunContainer(this as any) as RunTaskRunContainerIntersection;
    validate('RunTaskRunContainer', copy);
  }

  /**
   * Normalizes the current instance of the RunTaskRunContainer.
   * Creates a copy of the RunTaskRunContainer, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the RunTaskRunContainer instance.
   */
  normalize(): RunTaskRunContainer & Specification.RunTaskRunContainer {
    const copy = new RunTaskRunContainer(this as any) as RunTaskRunContainerIntersection;
    return getLifecycleHooks('RunTaskRunContainer')?.normalize?.(copy) || copy;
  }
}

export const _RunTaskRunContainer = RunTaskRunContainer as RunTaskRunContainerConstructor;
