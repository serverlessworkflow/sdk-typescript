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

/**
 * A map of type names and their corresponding schema
 */
export const validatorsPaths: [string, string][] = [
  ['Workflow', 'https://serverlessworkflow.io/schemas/0.6/workflow.json'],
  ['Crondef', 'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/crondef'],
  ['Exectimeout', 'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/exectimeout'],
  ['Transition', 'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/transition'],
  ['Error', 'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/error'],
  ['Onevents', 'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/onevents'],
  ['Action', 'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/action'],
  ['Functionref', 'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/functionref'],
  ['Eventref', 'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/eventref'],
  ['Branch', 'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/branch'],
  ['Delaystate', 'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/delaystate'],
  ['Eventstate', 'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/eventstate'],
  ['Operationstate', 'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/operationstate'],
  ['Parallelstate', 'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/parallelstate'],
  ['Switchstate', 'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/switchstate'],
  ['Eventbasedswitch', 'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/eventbasedswitch'],
  ['Databasedswitch', 'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/databasedswitch'],
  ['Defaultdef', 'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/defaultdef'],
  ['Eventcondition', 'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/eventcondition'],
  [
    'Transitioneventcondition',
    'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/transitioneventcondition',
  ],
  ['Enddeventcondition', 'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/enddeventcondition'],
  ['Datacondition', 'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/datacondition'],
  [
    'Transitiondatacondition',
    'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/transitiondatacondition',
  ],
  ['Enddatacondition', 'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/enddatacondition'],
  ['Subflowstate', 'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/subflowstate'],
  ['Injectstate', 'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/injectstate'],
  ['Foreachstate', 'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/foreachstate'],
  ['Callbackstate', 'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/callbackstate'],
  ['Startdef', 'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/startdef'],
  ['Schedule', 'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/schedule'],
  ['End', 'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/end'],
  ['Produceeventdef', 'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/produceeventdef'],
  ['Statedatafilter', 'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/statedatafilter'],
  ['Eventdatafilter', 'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/eventdatafilter'],
  ['Actiondatafilter', 'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/actiondatafilter'],
  ['Repeat', 'https://serverlessworkflow.io/schemas/0.6/workflow.json#/definitions/repeat'],
  ['Metadata', 'https://serverlessworkflow.io/schemas/0.6/common.json#/definitions/metadata'],
  ['Function', 'https://serverlessworkflow.io/schemas/0.6/functions.json#/definitions/function'],
  ['Retrydef', 'https://serverlessworkflow.io/schemas/0.6/retries.json#/definitions/retrydef'],
  ['Eventdef', 'https://serverlessworkflow.io/schemas/0.6/events.json#/definitions/eventdef'],
  ['CorrelationDef', 'https://serverlessworkflow.io/schemas/0.6/events.json#/definitions/correlationDef'],
  ['Events', 'https://serverlessworkflow.io/schemas/0.6/events.json#/events'],
  ['Functions', 'https://serverlessworkflow.io/schemas/0.6/functions.json#/functions'],
  ['Retries', 'https://serverlessworkflow.io/schemas/0.6/retries.json#/retries'],
];
