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
import { hasProperty } from '../definitions/utils';
import { validate } from '../utils';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.IFunction} data The underlying object
 * @returns {Specification.IFunction} The validated underlying object
 */
function functionBuildingFn(data: Specification.IFunction): () => Specification.IFunction {
  return () => {
    const model = new Specification.Function(data);

    if (hasProperty(model, 'normalize')) {
      validate('Function', (model as any).normalize());
    } else {
      validate('Function', model);
    }

    return model;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Function`
 * @returns {Specification.IFunction} A builder for `Specification.Function`
 */
export function functionBuilder(): Builder<Specification.IFunction> {
  return builder<Specification.IFunction>(functionBuildingFn);
}
