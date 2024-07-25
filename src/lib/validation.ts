import Ajv, { ValidateFunction } from 'ajv/dist/2020';
import addFormats from 'ajv-formats';
import workflowSchema from './generated/schema/workflow.json';
import internalWorkflowSchema from './generated/schema/__internal_workflow.json';
import { validationPointers } from './generated/validation';

const ajv = new Ajv({
  schemas: [workflowSchema],
  strict: false,
});
addFormats(ajv);

// uses an altered version of the JSON Schema, might introduce unwanted results
const __internal_ajv = new Ajv({
  schemas: [internalWorkflowSchema],
  strict: false,
});
addFormats(__internal_ajv);

/**
 * A Map of validation functions, where the key is the name of the schema to validate with
 */
export const validators: Map<string, ValidateFunction> = new Map<string, ValidateFunction>(
  Object.entries(validationPointers).map(([typeName, jsonPointer]) => {
    if (!jsonPointer) throw `No JSON pointer provided for type '${typeName}'`;
    let validate = ajv.getSchema(jsonPointer);
    if (!validate) validate = __internal_ajv.getSchema(jsonPointer);
    if (!validate) throw `Unable to find schema '${jsonPointer}' for type '${typeName}'`;
    return [typeName, validate as ValidateFunction];
  }),
);

/**
 * Validates the provided data or throws an error
 * @param typeName The data type to validate
 * @param data The data to validate
 * @returns True if valid, throws if invalid
 */
export const validate = <T>(typeName: string, data: T): boolean => {
  const validateFn: ValidateFunction | undefined = validators.get(typeName);
  if (!validateFn) {
    throw Error(`Unable to find a validation function for '${typeName}'`);
  }
  if (!validateFn(JSON.parse(JSON.stringify(data)))) {
    throw new Error(
      `'${typeName}' is invalid:
${validateFn.errors?.reduce((acc, error) => acc + `- ${error.instancePath} | ${error.schemaPath} | ${error.message}\n`, '') ?? ''}

data: ${JSON.stringify(data, null, 4)}`,
    );
  }
  return true;
};
