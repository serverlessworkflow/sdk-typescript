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

import Ajv, { ValidateFunction } from 'ajv';
import authSchema from './schema/auth.json';
import commonSchema from './schema/common.json';
import errorsSchema from './schema/errors.json';
import eventsSchema from './schema/events.json';
import functionsSchema from './schema/functions.json';
import retriesSchema from './schema/retries.json';
import secretsSchema from './schema/secrets.json';
import timeoutsSchema from './schema/timeouts.json';
import odataSchema from './schema/odata.json';
import workflowSchema from './schema/workflow.json';
import workflowExtensionsSchema from './schema/workflowextensions.json';
import { validatorsPaths } from './validation/validators-paths';

const schemas: any[] = [
  authSchema,
  commonSchema,
  eventsSchema,
  errorsSchema,
  functionsSchema,
  odataSchema,
  retriesSchema,
  secretsSchema,
  timeoutsSchema,
  workflowSchema,
  workflowExtensionsSchema,
];
const strict: boolean = false;
const ajv = new Ajv({ schemas, strict });
ajv.addFormat('uri', (): boolean => true);
/**
 * A Map of validation functions, where the key is the name of the schema to validate with
 */
export const validators: Map<string, ValidateFunction> = new Map<string, ValidateFunction>(
  validatorsPaths.map(([dataType, schemaPath]) => {
    const validate = ajv.getSchema(schemaPath);
    if (!validate) throw `Unable to find schema '${schemaPath}' for type '${dataType}'`;
    return [dataType, validate as ValidateFunction];
  })
);
