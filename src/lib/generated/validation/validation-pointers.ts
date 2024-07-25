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
export const validationPointers = {
  Workflow: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#',
  AuthenticationPolicy: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/authenticationPolicy',
  AuthenticationPolicyBasic:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/authenticationPolicy/oneOf/0/properties/basic',
  AuthenticationPolicyBearer:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/authenticationPolicy/oneOf/1/properties/bearer',
  AuthenticationPolicyOauth2:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/authenticationPolicy/oneOf/2/properties/oauth2',
  AuthenticationPolicyOauth2Client:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/authenticationPolicy/oneOf/2/properties/oauth2/properties/client',
  CallAsyncAPI: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/callTask/oneOf/0',
  CallAsyncAPIWith:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/callTask/oneOf/0/allOf/1/properties/with',
  CallAsyncAPIWithAuthentication:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/callTask/oneOf/0/allOf/1/properties/with/properties/authentication',
  CallFunction: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/callTask/oneOf/4',
  CallFunctionWith:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/callTask/oneOf/4/allOf/1/properties/with',
  CallGRPC: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/callTask/oneOf/1',
  CallGRPCWith:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/callTask/oneOf/1/allOf/1/properties/with',
  CallGRPCWithArguments:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/callTask/oneOf/1/allOf/1/properties/with/properties/arguments',
  CallGRPCWithService:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/callTask/oneOf/1/allOf/1/properties/with/properties/service',
  CallGRPCWithServiceAuthentication:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/callTask/oneOf/1/allOf/1/properties/with/properties/service/properties/authentication',
  CallHTTP: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/callTask/oneOf/2',
  CallHTTPWith:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/callTask/oneOf/2/allOf/1/properties/with',
  CallHTTPWithEndpoint:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/callTask/oneOf/2/allOf/1/properties/with/properties/endpoint',
  CallOpenAPI: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/callTask/oneOf/3',
  CallOpenAPIWith:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/callTask/oneOf/3/allOf/1/properties/with',
  CallOpenAPIWithAuthentication:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/callTask/oneOf/3/allOf/1/properties/with/properties/authentication',
  CallOpenAPIWithParameters:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/callTask/oneOf/3/allOf/1/properties/with/properties/parameters',
  CallTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/callTask',
  Document: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/properties/document',
  DocumentTags: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/properties/document/properties/tags',
  DoTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/doTask',
  Duration: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/duration',
  EmitTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/emitTask',
  EmitTaskEmit:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/emitTask/allOf/1/properties/emit',
  EmitTaskEmitEvent:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/emitTask/allOf/1/properties/emit/properties/event',
  Endpoint: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/endpoint',
  EndpointAuthentication:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/endpoint/properties/authentication',
  Error: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/error',
  EventConsumptionStrategy:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/eventConsumptionStrategy',
  EventConsumptionStrategyAll:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/eventConsumptionStrategy/oneOf/0/properties/all',
  EventConsumptionStrategyAny:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/eventConsumptionStrategy/oneOf/1/properties/any',
  EventFilter: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/eventFilter',
  EventFilterCorrelate:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/eventFilter/properties/correlate',
  EventFilterWith:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/eventFilter/properties/with',
  Export: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/export',
  Extension: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/extension',
  ExternalResource: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/externalResource',
  ExternalResourceAuthentication:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/externalResource/oneOf/1/properties/authentication',
  FlowDirective: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/flowDirective',
  ForkTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/forkTask',
  ForkTaskFork:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/forkTask/allOf/1/properties/fork',
  ForTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/forTask',
  ForTaskFor: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/forTask/allOf/1/properties/for',
  Input: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/input',
  ListenTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/listenTask',
  ListenTaskListen:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/listenTask/allOf/1/properties/listen',
  Oauth2Token: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/oauth2Token',
  Output: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/output',
  RaiseTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/raiseTask',
  RaiseTaskRaise:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/raiseTask/allOf/1/properties/raise',
  RetryPolicy: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/retryPolicy',
  RetryPolicyBackoff:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/retryPolicy/properties/backoff',
  RetryPolicyJitter:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/retryPolicy/properties/jitter',
  RetryPolicyLimit:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/retryPolicy/properties/limit',
  RetryPolicyLimitAttempt:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/retryPolicy/properties/limit/properties/attempt',
  RunTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/runTask',
  RunTaskRun: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/runTask/allOf/1/properties/run',
  RunTaskRunContainer:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/runTask/allOf/1/properties/run/oneOf/0/properties/container',
  RunTaskRunScript:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/runTask/allOf/1/properties/run/oneOf/1/properties/script',
  RunTaskRunShell:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/runTask/allOf/1/properties/run/oneOf/2/properties/shell',
  RunTaskRunShellArguments:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/runTask/allOf/1/properties/run/oneOf/2/properties/shell/properties/arguments',
  RunTaskRunShellEnvironment:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/runTask/allOf/1/properties/run/oneOf/2/properties/shell/properties/environment',
  RunTaskRunWorkflow:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/runTask/allOf/1/properties/run/oneOf/3/properties/workflow',
  RunTaskRunWorkflowInput:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/runTask/allOf/1/properties/run/oneOf/3/properties/workflow/properties/input',
  Schedule: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/properties/schedule',
  Schema: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/schema',
  SetTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/setTask',
  SetTaskSet: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/setTask/allOf/1/properties/set',
  SwitchTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/switchTask',
  SwitchTaskSwitch:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/switchTask/allOf/1/properties/switch',
  Task: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/task',
  TaskBase: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/taskBase',
  TaskList: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/taskList',
  Timeout: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/timeout',
  TryTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/tryTask',
  TryTaskCatch:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/tryTask/allOf/1/properties/catch',
  Use: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/properties/use',
  UseExtensions:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/properties/use/properties/extensions',
  WaitTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha2/workflow.json#/$defs/waitTask',
};
