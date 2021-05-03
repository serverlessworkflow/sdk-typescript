import Ajv, { ValidateFunction } from 'ajv';
import commonSchema from './schema/common.json';
import eventsChema from './schema/events.json';
import functionsSchema from './schema/functions.json';
import retriesSchema from './schema/retries.json';
import workflowSchema from './schema/workflow.json';

const schemas: any[] = [
  commonSchema,
  eventsChema,
  functionsSchema,
  retriesSchema,
  workflowSchema
];
const strict: boolean = false;
const ajv = new Ajv({ schemas, strict });
const validatorsInfo: [string, string][] = [
  ["Workflow", "https://serverlessworkflow.org/core/workflow.json"],
  ["Action", "https://serverlessworkflow.org/core/workflow.json#/definitions/action"],
  ["Actiondatafilter", "https://serverlessworkflow.org/core/workflow.json#/definitions/actiondatafilter"],
  ["Branch", "https://serverlessworkflow.org/core/workflow.json#/definitions/branch"],
  ["Callbackstate", "https://serverlessworkflow.org/core/workflow.json#/definitions/callbackstate"],
  ["CorrelationDef", "https://serverlessworkflow.org/core/events.json#/definitions/correlationDef"],
  ["Crondef", "https://serverlessworkflow.org/core/workflow.json#/definitions/crondef"],
  ["Databasedswitch", "https://serverlessworkflow.org/core/workflow.json#/definitions/databasedswitch"],
  ["Datacondition", "https://serverlessworkflow.org/core/workflow.json#/definitions/datacondition"],
  ["Defaultconditiondef", "https://serverlessworkflow.org/core/workflow.json#/definitions/defaultconditiondef"],
  ["Delaystate", "https://serverlessworkflow.org/core/workflow.json#/definitions/delaystate"],
  ["End", "https://serverlessworkflow.org/core/workflow.json#/definitions/end"],
  ["Enddatacondition", "https://serverlessworkflow.org/core/workflow.json#/definitions/enddatacondition"],
  ["Enddeventcondition", "https://serverlessworkflow.org/core/workflow.json#/definitions/enddeventcondition"],
  ["Error", "https://serverlessworkflow.org/core/workflow.json#/definitions/error"],
  ["Eventbasedswitch", "https://serverlessworkflow.org/core/workflow.json#/definitions/eventbasedswitch"],
  ["Eventcondition", "https://serverlessworkflow.org/core/workflow.json#/definitions/eventcondition"],
  ["Eventdatafilter", "https://serverlessworkflow.org/core/workflow.json#/definitions/eventdatafilter"],
  ["Eventdef", "https://serverlessworkflow.org/core/events.json#/definitions/eventdef"],
  ["Eventref", "https://serverlessworkflow.org/core/workflow.json#/definitions/eventref"],
  ["Events", "https://serverlessworkflow.org/core/events.json#/events"],
  ["Eventstate", "https://serverlessworkflow.org/core/workflow.json#/definitions/eventstate"],
  ["Exectimeout", "https://serverlessworkflow.org/core/workflow.json#/definitions/exectimeout"],
  ["Foreachstate", "https://serverlessworkflow.org/core/workflow.json#/definitions/foreachstate"],
  ["Function", "https://serverlessworkflow.org/core/functions.json#/definitions/function"],
  ["Functions", "https://serverlessworkflow.org/core/functions.json#/functions"],
  ["Injectstate", "https://serverlessworkflow.org/core/workflow.json#/definitions/injectstate"],
  ["Metadata", "https://serverlessworkflow.org/core/common.json#/definitions/metadata"],
  ["Onevents", "https://serverlessworkflow.org/core/workflow.json#/definitions/onevents"],
  ["Operationstate", "https://serverlessworkflow.org/core/workflow.json#/definitions/operationstate"],
  ["Parallelstate", "https://serverlessworkflow.org/core/workflow.json#/definitions/parallelstate"],
  ["Produceeventdef", "https://serverlessworkflow.org/core/workflow.json#/definitions/produceeventdef"],
  ["Retries", "https://serverlessworkflow.org/core/retries.json#/retries"],
  ["Retrydef", "https://serverlessworkflow.org/core/retries.json#/definitions/retrydef"],
  ["Schedule", "https://serverlessworkflow.org/core/workflow.json#/definitions/schedule"],
  ["Startdef", "https://serverlessworkflow.org/core/workflow.json#/definitions/startdef"],
  ["Statedatafilter", "https://serverlessworkflow.org/core/workflow.json#/definitions/statedatafilter"],
  ["Subflowref", "https://serverlessworkflow.org/core/workflow.json#/definitions/subflowref"],
  ["Switchstate", "https://serverlessworkflow.org/core/workflow.json#/definitions/switchstate"],
  ["Transition", "https://serverlessworkflow.org/core/workflow.json#/definitions/transition"],
  ["Transitiondatacondition", "https://serverlessworkflow.org/core/workflow.json#/definitions/transitiondatacondition"],
  ["Transitioneventcondition", "https://serverlessworkflow.org/core/workflow.json#/definitions/transitioneventcondition"]
];
export const validators: Map<string, ValidateFunction> = new Map<string, ValidateFunction>(
  validatorsInfo.map(([type, schemaPath]) => {
    const validate = ajv.getSchema(schemaPath);
    if (!validate) throw `Unable to find schema '${schemaPath}' for type '${type}'`;
    return [ type, validate as ValidateFunction ];
  })
);