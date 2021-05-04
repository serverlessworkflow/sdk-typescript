import Ajv, { ValidateFunction } from 'ajv';
import commonSchema from './schema/common.json';
import eventsChema from './schema/events.json';
import functionsSchema from './schema/functions.json';
import retriesSchema from './schema/retries.json';
import workflowSchema from './schema/workflow.json';
import { validatorsPaths } from './validation/validators-paths';

const schemas: any[] = [
  commonSchema,
  eventsChema,
  functionsSchema,
  retriesSchema,
  workflowSchema
];
const strict: boolean = false;
const ajv = new Ajv({ schemas, strict });
export const validators: Map<string, ValidateFunction> = new Map<string, ValidateFunction>(
  validatorsPaths.map(([dataType, schemaPath]) => {
    const validate = ajv.getSchema(schemaPath);
    if (!validate) throw `Unable to find schema '${schemaPath}' for type '${dataType}'`;
    return [ dataType, validate as ValidateFunction ];
  })
);