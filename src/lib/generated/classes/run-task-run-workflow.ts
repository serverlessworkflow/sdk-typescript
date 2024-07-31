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

import { _RunTaskRunWorkflowInput } from './run-task-run-workflow-input';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the RunTaskRunWorkflow class and type
 */
export type RunTaskRunWorkflowIntersection = RunTaskRunWorkflow & Specification.RunTaskRunWorkflow;

/**
 * Represents a constructor for the intersection of the RunTaskRunWorkflow class and type
 */
export interface RunTaskRunWorkflowConstructor {
  new (model?: Partial<Specification.RunTaskRunWorkflow>): RunTaskRunWorkflowIntersection;
}

/**
 * Represents a RunTaskRunWorkflow with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class RunTaskRunWorkflow extends ObjectHydrator<Specification.RunTaskRunWorkflow> {
  /**
   * Instanciates a new instance of the RunTaskRunWorkflow class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the RunTaskRunWorkflow.
   */
  constructor(model?: Partial<Specification.RunTaskRunWorkflow>) {
    super(model);
    const self = this as unknown as Specification.RunTaskRunWorkflow & object;
    if (isObject(model)) {
      if (typeof model.input === 'object') self.input = new _RunTaskRunWorkflowInput(model.input);
    }
    getLifecycleHooks('RunTaskRunWorkflow')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the RunTaskRunWorkflow.
   * Throws if invalid.
   */
  validate() {
    const copy = new RunTaskRunWorkflow(this as any) as RunTaskRunWorkflowIntersection;
    validate('RunTaskRunWorkflow', copy);
  }

  /**
   * Normalizes the current instance of the RunTaskRunWorkflow.
   * Creates a copy of the RunTaskRunWorkflow, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the RunTaskRunWorkflow instance.
   */
  normalize(): RunTaskRunWorkflow & Specification.RunTaskRunWorkflow {
    const copy = new RunTaskRunWorkflow(this as any) as RunTaskRunWorkflowIntersection;
    return getLifecycleHooks('RunTaskRunWorkflow')?.normalize?.(copy) || copy;
  }
}

export const _RunTaskRunWorkflow = RunTaskRunWorkflow as RunTaskRunWorkflowConstructor;
