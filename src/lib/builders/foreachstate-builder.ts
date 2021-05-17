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

import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Foreachstate} data The underlying object
 * @returns {Specification.Foreachstate} The validated underlying object
 */
function foreachstateBuildingFn(data: Specification.Foreachstate): () => Specification.Foreachstate {
  return () => {
    data.type = 'foreach';

    //FIXME https://github.com/serverlessworkflow/sdk-typescript/issues/95

    data.usedForCompensation = false;
    const validate = validators.get('Foreachstate');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Foreachstate is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Foreachstate`
 * @returns {Specification.Foreachstate} A builder for `Specification.Foreachstate`
 */
export function foreachstateBuilder(): Builder<Specification.Foreachstate> {
  return builder<Specification.Foreachstate>(foreachstateBuildingFn);
}
