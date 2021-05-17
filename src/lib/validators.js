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
import Ajv from 'ajv';
import commonSchema from './schema/common.json';
import eventsChema from './schema/events.json';
import functionsSchema from './schema/functions.json';
import retriesSchema from './schema/retries.json';
import workflowSchema from './schema/workflow.json';
import { validatorsPaths } from './validation/validators-paths';
var schemas = [commonSchema, eventsChema, functionsSchema, retriesSchema, workflowSchema];
var strict = false;
var ajv = new Ajv({ schemas: schemas, strict: strict });
/**
 * A Map of validation functions, where the key is the name of the schema to validate with
 */
export var validators = new Map(validatorsPaths.map(function (_a) {
    var dataType = _a[0], schemaPath = _a[1];
    var validate = ajv.getSchema(schemaPath);
    if (!validate)
        throw "Unable to find schema '" + schemaPath + "' for type '" + dataType + "'";
    return [dataType, validate];
}));
//# sourceMappingURL=validators.js.map