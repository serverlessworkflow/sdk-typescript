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
 * oUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validate } from '../utils';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Injectstate} data The underlying object
 * @returns {Specification.Injectstate} The validated underlying object
 */
function injectstateBuildingFn(data: Specification.Injectstate): () => Specification.Injectstate {
  return () => {
    data.type = 'inject';
    data.usedForCompensation = data.usedForCompensation || false;
    validate('Injectstate', data);
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Injectstate`
 * @returns {Specification.Injectstate} A builder for `Specification.Injectstate`
 */
export function injectstateBuilder(): Builder<Specification.Injectstate> {
  return builder<Specification.Injectstate>(injectstateBuildingFn);
}
