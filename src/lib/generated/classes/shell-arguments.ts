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
 * Represents the intersection between the ShellArguments class and type
 */
export type ShellArgumentsIntersection = ShellArguments & Specification.ShellArguments;

/**
 * Represents a constructor for the intersection of the ShellArguments class and type
 */
export interface ShellArgumentsConstructor {
  new (model?: Partial<Specification.ShellArguments>): ShellArgumentsIntersection;
}

/**
 * Represents a ShellArguments with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class ShellArguments extends ObjectHydrator<Specification.ShellArguments> {
  /**
   * Instanciates a new instance of the ShellArguments class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the ShellArguments.
   */
  constructor(model?: Partial<Specification.ShellArguments>) {
    super(model);

    getLifecycleHooks('ShellArguments')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the ShellArguments.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new ShellArguments(this as any) as ShellArgumentsIntersection;
    validate('ShellArguments', copy, workflow);
  }

  /**
   * Normalizes the current instance of the ShellArguments.
   * Creates a copy of the ShellArguments, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the ShellArguments instance.
   */
  normalize(): ShellArguments & Specification.ShellArguments {
    const copy = new ShellArguments(this as any) as ShellArgumentsIntersection;
    return getLifecycleHooks('ShellArguments')?.normalize?.(copy) || copy;
  }
}

export const _ShellArguments = ShellArguments as ShellArgumentsConstructor;
