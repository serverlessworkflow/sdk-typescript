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

import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validate } from '../utils';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Startdef} data The underlying object
 * @returns {Specification.Startdef} The validated underlying object
 */
function startdefBuildingFn(data: Specification.Startdef): () => Specification.Startdef {
  return () => {
    const model = new Specification.Startdef(data);

    validate('Startdef', model.normalize());
    return model;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Startdef`
 * @returns {Specification.Startdef} A builder for `Specification.Startdef`
 */
export function startdefBuilder(): Builder<Specification.Startdef> {
  return builder<Specification.Startdef>(startdefBuildingFn);
}
