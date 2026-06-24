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

import { LifecycleHooks } from '../lifecycle-hooks';
import { Specification } from '../generated/definitions';

import { schemaVersion } from '../../../package.json';

const compareVersions = (a: string, b: string) => a.localeCompare(b, undefined, { numeric: true });

export const WorkflowHooks = {
  preValidation(instance) {
    /* The SDK supports dsl releases from 1.0.0 up to and including the `schemaVersion` it is built against */
    const minSupportDsl = '1.0.0';
    const dsl = instance?.document?.dsl;
    const isSupportedDsl =
      typeof dsl === 'string' && compareVersions(dsl, minSupportDsl) >= 0 && compareVersions(dsl, schemaVersion) <= 0;

    if (!isSupportedDsl) {
      throw new Error(
        `'Workflow' is invalid - The DSL version of the workflow '${dsl}' doesn't match the supported version of the SDK '${schemaVersion}'.`,
      );
    }
    return;
  },
} as LifecycleHooks<Specification.Workflow>;
