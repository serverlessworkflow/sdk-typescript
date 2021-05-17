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
import { builder } from '../builder';
import { validators } from '../validators';
/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Exectimeout} data The underlying object
 * @returns {Specification.Exectimeout} The validated underlying object
 */
function exectimeoutBuildingFn(data) {
    return function () {
        var validate = validators.get('Exectimeout');
        // TODO: ignore validation if no validator or throw ?
        if (!validate)
            return data;
        if (!validate(data)) {
            console.warn(validate.errors);
            var firstError = validate.errors[0];
            throw new Error("Exectimeout is invalid: " + firstError.message);
        }
        return data;
    };
}
/**
 * A factory to create a builder proxy for the type `Specification.Exectimeout`
 * @returns {Specification.Exectimeout} A builder for `Specification.Exectimeout`
 */
export function exectimeoutBuilder() {
    return builder(exectimeoutBuildingFn);
}
//# sourceMappingURL=exectimeout-builder.js.map