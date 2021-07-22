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

/**
 * A map of type names and their corresponding schema
 */
export const validatorsPaths: [string, string][] = [
  ['Workflow', 'https://serverlessworkflow.io/schemas/0.7/workflow.json'],
  ['Crondef', 'https://serverlessworkflow.io/schemas/0.7/workflow.json#/definitions/crondef'],
  ['Transition', 'https://serverlessworkflow.io/schemas/0.7/workflow.json#/definitions/transition'],
  ['Error', 'https://serverlessworkflow.io/schemas/0.7/workflow.json#/definitions/error'],
  ['Onevents', 'https://serverlessworkflow.io/schemas/0.7/workflow.json#/definitions/onevents'],
  ['Action', 'https://serverlessworkflow.io/schemas/0.7/workflow.json#/definitions/action'],
  ['Functionref', 'https://serverlessworkflow.io/schemas/0.7/workflow.json#/definitions/functionref'],
  ['Eventref', 'https://serverlessworkflow.io/schemas/0.7/workflow.json#/definitions/eventref'],
  ['Subflowref', 'https://serverlessworkflow.io/schemas/0.7/workflow.json#/definitions/subflowref'],
  ['Branch', 'https://serverlessworkflow.io/schemas/0.7/workflow.json#/definitions/branch'],
  ['Delaystate', 'https://serverlessworkflow.io/schemas/0.7/workflow.json#/definitions/delaystate'],
  ['Eventstate', 'https://serverlessworkflow.io/schemas/0.7/workflow.json#/definitions/eventstate'],
  ['Operationstate', 'https://serverlessworkflow.io/schemas/0.7/workflow.json#/definitions/operationstate'],
  ['Parallelstate', 'https://serverlessworkflow.io/schemas/0.7/workflow.json#/definitions/parallelstate'],
  ['Switchstate', 'https://serverlessworkflow.io/schemas/0.7/workflow.json#/definitions/switchstate'],
  ['Eventbasedswitch', 'https://serverlessworkflow.io/schemas/0.7/workflow.json#/definitions/eventbasedswitch'],
  ['Databasedswitch', 'https://serverlessworkflow.io/schemas/0.7/workflow.json#/definitions/databasedswitch'],
  ['Defaultconditiondef', 'https://serverlessworkflow.io/schemas/0.7/workflow.json#/definitions/defaultconditiondef'],
  ['Eventcondition', 'https://serverlessworkflow.io/schemas/0.7/workflow.json#/definitions/eventcondition'],
  [
    'Transitioneventcondition',
    'https://serverlessworkflow.io/schemas/0.7/workflow.json#/definitions/transitioneventcondition',
  ],
  ['Enddeventcondition', 'https://serverlessworkflow.io/schemas/0.7/workflow.json#/definitions/enddeventcondition'],
  ['Datacondition', 'https://serverlessworkflow.io/schemas/0.7/workflow.json#/definitions/datacondition'],
  [
    'Transitiondatacondition',
    'https://serverlessworkflow.io/schemas/0.7/workflow.json#/definitions/transitiondatacondition',
  ],
  ['Enddatacondition', 'https://serverlessworkflow.io/schemas/0.7/workflow.json#/definitions/enddatacondition'],
  ['Injectstate', 'https://serverlessworkflow.io/schemas/0.7/workflow.json#/definitions/injectstate'],
  ['Foreachstate', 'https://serverlessworkflow.io/schemas/0.7/workflow.json#/definitions/foreachstate'],
  ['Callbackstate', 'https://serverlessworkflow.io/schemas/0.7/workflow.json#/definitions/callbackstate'],
  ['Startdef', 'https://serverlessworkflow.io/schemas/0.7/workflow.json#/definitions/startdef'],
  ['Schedule', 'https://serverlessworkflow.io/schemas/0.7/workflow.json#/definitions/schedule'],
  ['End', 'https://serverlessworkflow.io/schemas/0.7/workflow.json#/definitions/end'],
  ['Produceeventdef', 'https://serverlessworkflow.io/schemas/0.7/workflow.json#/definitions/produceeventdef'],
  ['Statedatafilter', 'https://serverlessworkflow.io/schemas/0.7/workflow.json#/definitions/statedatafilter'],
  ['Eventdatafilter', 'https://serverlessworkflow.io/schemas/0.7/workflow.json#/definitions/eventdatafilter'],
  ['Actiondatafilter', 'https://serverlessworkflow.io/schemas/0.7/workflow.json#/definitions/actiondatafilter'],
  ['WorkflowExecTimeout', 'https://serverlessworkflow.io/schemas/0.7/timeouts.json#/definitions/workflowExecTimeout'],
  ['StateExecTimeout', 'https://serverlessworkflow.io/schemas/0.7/timeouts.json#/definitions/stateExecTimeout'],
  ['ActionExecTimeout', 'https://serverlessworkflow.io/schemas/0.7/timeouts.json#/definitions/actionExecTimeout'],
  ['BranchExecTimeout', 'https://serverlessworkflow.io/schemas/0.7/timeouts.json#/definitions/branchExecTimeout'],
  ['EventTimeout', 'https://serverlessworkflow.io/schemas/0.7/timeouts.json#/definitions/eventTimeout'],
  ['Function', 'https://serverlessworkflow.io/schemas/0.7/functions.json#/definitions/function'],
  ['Metadata', 'https://serverlessworkflow.io/schemas/0.7/common.json#/definitions/metadata'],
  ['Eventdef', 'https://serverlessworkflow.io/schemas/0.7/events.json#/definitions/eventdef'],
  ['CorrelationDef', 'https://serverlessworkflow.io/schemas/0.7/events.json#/definitions/correlationDef'],
  ['Retrydef', 'https://serverlessworkflow.io/schemas/0.7/retries.json#/definitions/retrydef'],
  ['Secrets', 'https://serverlessworkflow.io/schemas/0.7/secrets.json#/secrets'],
  ['Timeouts', 'https://serverlessworkflow.io/schemas/0.7/timeouts.json#/timeouts'],
  ['Events', 'https://serverlessworkflow.io/schemas/0.7/events.json#/events'],
  ['Functions', 'https://serverlessworkflow.io/schemas/0.7/functions.json#/functions'],
  ['Retries', 'https://serverlessworkflow.io/schemas/0.7/retries.json#/retries'],
];
