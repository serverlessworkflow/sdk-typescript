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

import { builder, Builder, BuildOptions } from '../../builder';
import { Classes } from '../classes';
import { Specification } from '../definitions';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.WorkflowMetadata} model The proxied object
 * @param {BuildOptions} options The build options to use
 * @returns {Specification.WorkflowMetadata} The built object
 */
function buildingFn(model: Specification.WorkflowMetadata, options: BuildOptions): Specification.WorkflowMetadata {
  const instance = new Classes.WorkflowMetadata(model);
  if (options.validate) instance.validate();
  return (options.normalize ? instance.normalize() : instance) as Specification.WorkflowMetadata;
}

/**
 * A factory to create a builder proxy for the type `Specification.WorkflowMetadata`
 * @returns {Builder<Specification.WorkflowMetadata>} A builder for `Specification.WorkflowMetadata`
 */
export const workflowMetadataBuilder = (
  model?: Partial<Specification.WorkflowMetadata>,
): Builder<Specification.WorkflowMetadata> => builder<Specification.WorkflowMetadata>(model, buildingFn);
