/*
 * Copyright 2021-Present The Serverless Workflow Specification Authors
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { Branch } from './branch';
import { End } from './end';
import { Error } from './error';
import { Metadata } from './metadata';
import { Statedatafilter } from './statedatafilter';
import { Transition } from './transition';

export class Parallelstate {
  constructor(model: any) {
    const result = { usedForCompensation: false };
    Object.assign(this, result, model);
  }

  /**
   * Unique State id
   */
  id?: string;
  /**
   * State name
   */
  name?: string;
  /**
   * State type
   */
  type?: 'parallel';
  /**
   * State end definition
   */
  end?: boolean | End;
  /**
   * State data filter
   */
  stateDataFilter?: Statedatafilter;
  /**
   * Branch Definitions
   */
  branches?: /* Branch Definition */ Branch[];
  /**
   * Option types on how to complete branch execution.
   */
  completionType?: 'and' | 'xor' | 'n_of_m';
  /**
   * Used when completionType is set to 'n_of_m' to specify the 'N' value
   */
  n?: number | string;
  /**
   * States error handling and retries definitions
   */
  onErrors?: Error[];
  /**
   * Next transition of the workflow after all branches have completed execution
   */
  transition?: string | Transition;
  /**
   * Unique Name of a workflow state which is responsible for compensation of this state
   */
  compensatedBy?: string;
  /**
   * If true, this state is used to compensate another state. Default is false
   */
  usedForCompensation?: boolean;
  metadata?: /* Metadata information */ Metadata;
}
