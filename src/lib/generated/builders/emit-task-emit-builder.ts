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
 * @param {Specification.EmitTaskEmit} data The underlying object
 * @returns {Specification.EmitTaskEmit} The validated underlying object
 */
function buildingFn(data: Specification.EmitTaskEmit): Specification.EmitTaskEmit {
  const model = new Classes.EmitTaskEmit();
  Object.assign(model, data);

  validate('EmitTaskEmit', model);
  return model as Specification.EmitTaskEmit;
}

/**
 * A factory to create a builder proxy for the type `Specification.EmitTaskEmit`
 * @returns {Specification.EmitTaskEmit} A builder for `Specification.EmitTaskEmit`
 */
export function emitTaskEmitBuilder(): Builder<Specification.EmitTaskEmit> {
  return builder<Specification.EmitTaskEmit>(buildingFn);
}
