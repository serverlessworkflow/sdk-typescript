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
 * @param {Specification.Callbackstate} data The underlying object
 * @returns {Specification.Callbackstate} The validated underlying object
 */
function callbackstateBuildingFn(data: Specification.Callbackstate): () => Specification.Callbackstate {
  return () => {
    data.type = 'callback';
    validate('Callbackstate', data);
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Callbackstate`
 * @returns {Specification.Callbackstate} A builder for `Specification.Callbackstate`
 */
export function callbackstateBuilder(): Builder<Specification.Callbackstate> {
  return builder<Specification.Callbackstate>(callbackstateBuildingFn);
}
