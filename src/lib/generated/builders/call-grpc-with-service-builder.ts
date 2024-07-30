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

import { builder, Builder } from '../../builder';
import { validate } from '../../validation';
import { Classes } from '../classes';
import { Specification } from '../definitions';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.CallGRPCWithService} model The underlying object
 * @returns {Specification.CallGRPCWithService} The validated underlying object
 */
function buildingFn(model: Specification.CallGRPCWithService): Specification.CallGRPCWithService {
  const instance = new Classes.CallGRPCWithService(model);
  validate('CallGRPCWithService', instance);
  return instance as Specification.CallGRPCWithService;
}

/**
 * A factory to create a builder proxy for the type `Specification.CallGRPCWithService`
 * @returns {Builder<Specification.CallGRPCWithService>} A builder for `Specification.CallGRPCWithService`
 */
export const callGRPCWithServiceBuilder = (
  model?: Partial<Specification.CallGRPCWithService>,
): Builder<Specification.CallGRPCWithService> => builder<Specification.CallGRPCWithService>(model, buildingFn);
