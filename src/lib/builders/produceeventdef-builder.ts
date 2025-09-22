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
import { toPlainObject } from 'lodash';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.IProduceeventdef} data The underlying object
 * @returns {Specification.IProduceeventdef} The validated underlying object
 */
function produceeventdefBuildingFn(data: Specification.IProduceeventdef): () => Specification.IProduceeventdef {
  return () => {
    const model = new Specification.Produceeventdef(data);

    if (hasProperty(model, 'normalize')) {
      validate('Produceeventdef', (model as any).normalize());
    } else {
      validate('Produceeventdef', model);
    }

    return toPlainObject(model);
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Produceeventdef`
 * @returns {Specification.IProduceeventdef} A builder for `Specification.Produceeventdef`
 */
export function produceeventdefBuilder(): Builder<Specification.IProduceeventdef> {
  return builder<Specification.IProduceeventdef>(produceeventdefBuildingFn);
}
