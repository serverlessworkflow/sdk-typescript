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

import { arrayBuilder, ArrayBuilder } from '../../builder';
import { validate } from '../../validation';
import { Classes } from '../classes';
import { Specification } from '../definitions';

/**
 * The internal function used by the builder proxy to validate and return its underlying array
 * @param {Specification.EventConsumptionStrategyAll} model The underlying array
 * @returns {Specification.EventConsumptionStrategyAll} The validated underlying array
 */
function buildingFn(model: Specification.EventConsumptionStrategyAll): Specification.EventConsumptionStrategyAll {
  const instance = new Classes.EventConsumptionStrategyAll(model);
  validate('EventConsumptionStrategyAll', instance);
  return instance as Specification.EventConsumptionStrategyAll;
}

/**
 * A factory to create a builder proxy for the type `Specification.EventConsumptionStrategyAll`
 * @returns {ArrayBuilder<Specification.EventConsumptionStrategyAll>} A builder for `Specification.EventConsumptionStrategyAll`
 */
export const eventConsumptionStrategyAllBuilder = (
  model?: Specification.EventConsumptionStrategyAll,
): ArrayBuilder<Specification.EventFilter> => arrayBuilder<Specification.EventFilter>(model, buildingFn);
