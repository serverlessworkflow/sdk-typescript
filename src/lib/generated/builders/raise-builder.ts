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

import { builder, Builder } from '../../builder';
import { validate } from '../../validation';
import { Classes } from '../classes';
import { Specification } from '../definitions';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Raise} data The underlying object
 * @returns {Specification.Raise} The validated underlying object
 */
function buildingFn(data: Specification.Raise): () => Specification.Raise {
  return () => {
    const model = new Classes.Raise();
    Object.assign(model, data);

    validate('Raise', model);
    return model as Specification.Raise;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Raise`
 * @returns {Specification.Raise} A builder for `Specification.Raise`
 */
export function raiseBuilder(): Builder<Specification.Raise> {
  return builder<Specification.Raise>(buildingFn);
}
