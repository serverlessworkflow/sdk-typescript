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
  Workflow: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#',
  AllEventConsumptionStrategy:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/eventConsumptionStrategy/oneOf/0',
  AnyEventConsumptionStrategy:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/eventConsumptionStrategy/oneOf/1',
  AuthenticationPolicy: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/authenticationPolicy',
  AuthenticationPolicyReference:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/referenceableAuthenticationPolicy/oneOf/0',
  BasicAuthenticationPolicy:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/authenticationPolicy/oneOf/0',
  BearerAuthenticationPolicy:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/authenticationPolicy/oneOf/1',
  CallAsyncAPI: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/callTask/oneOf/0',
  CallAsyncAPIWith:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/callTask/oneOf/0/properties/with',
  CallFunction: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/callTask/oneOf/4',
  CallFunctionWith:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/callTask/oneOf/4/properties/with',
  CallGRPC: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/callTask/oneOf/1',
  CallGRPCWith:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/callTask/oneOf/1/properties/with',
  CallGRPCWithArguments:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/callTask/oneOf/1/properties/with/properties/arguments',
  CallGRPCWithService:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/callTask/oneOf/1/properties/with/properties/service',
  CallHTTP: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/callTask/oneOf/2',
  CallHTTPWith:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/callTask/oneOf/2/properties/with',
  CallHTTPWithBody:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/callTask/oneOf/2/properties/with/properties/body',
  CallHTTPWithEndpoint:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/callTask/oneOf/2/properties/with/properties/endpoint',
  CallHTTPWithHeaders:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/callTask/oneOf/2/properties/with/properties/headers',
  CallOpenAPI: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/callTask/oneOf/3',
  CallOpenAPIWith:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/callTask/oneOf/3/properties/with',
  CallOpenAPIWithParameters:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/callTask/oneOf/3/properties/with/properties/parameters',
  CallTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/callTask',
  Catch: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/tryTask/properties/catch',
  CatchErrors:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/tryTask/properties/catch/properties/errors',
  ConstantBackoff:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/retryPolicy/properties/backoff/oneOf/0',
  Container:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/runTask/properties/run/oneOf/0/properties/container',
  ContainerEnvironment:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/runTask/properties/run/oneOf/0/properties/container/properties/environment',
  Correlate: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/eventFilter/properties/correlate',
  DoTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/doTask',
  Duration: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/duration',
  Emit: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/emitTask/properties/emit',
  EmitEvent:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/emitTask/properties/emit/properties/event',
  EmitTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/emitTask',
  Endpoint: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/endpoint',
  Error: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/error',
  EventConsumptionStrategy:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/eventConsumptionStrategy',
  EventConsumptionStrategyAll:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/eventConsumptionStrategy/oneOf/0/properties/all',
  EventConsumptionStrategyAny:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/eventConsumptionStrategy/oneOf/1/properties/any',
  EventFilter: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/eventFilter',
  ExplicitBasicAuthenticationPolicy:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/authenticationPolicy/oneOf/0/properties/basic/oneOf/0',
  ExplicitBearerAuthenticationPolicy:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/authenticationPolicy/oneOf/1/properties/bearer/oneOf/0',
  ExplicitOAuth2AuthenticationPolicy:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/authenticationPolicy/oneOf/2/properties/oauth2/oneOf/0',
  ExponentialBackOff:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/retryPolicy/properties/backoff/oneOf/1',
  Export: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/export',
  ExportAs: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/export/properties/as',
  Extension: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/extension',
  ExtensionItem:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/properties/use/properties/extensions/items',
  ExternalResource: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/externalResource',
  ExternalResourceURI:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/externalResource/oneOf/1',
  FlowDirective: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/flowDirective',
  FlowDirectiveEnum: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/flowDirective/anyOf/0',
  For: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/forTask/properties/for',
  Fork: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/forkTask/properties/fork',
  ForkTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/forkTask',
  ForTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/forTask',
  Input: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/input',
  InputFrom: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/input/properties/from',
  LinearBackoff:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/retryPolicy/properties/backoff/oneOf/2',
  Listen: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/listenTask/properties/listen',
  ListenTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/listenTask',
  OAuth2AuthenticationPolicy:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/authenticationPolicy/oneOf/2',
  Oauth2Token: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/oauth2Token',
  OneEventConsumptionStrategy:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/eventConsumptionStrategy/oneOf/2',
  Output: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/output',
  OutputAs: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/output/properties/as',
  Raise: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/raiseTask/properties/raise',
  RaiseTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/raiseTask',
  ReferenceableAuthenticationPolicy:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/referenceableAuthenticationPolicy',
  ReferencedAuthenticationPolicy:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/referenceableAuthenticationPolicy/oneOf/1',
  RetryPolicy: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/retryPolicy',
  RetryPolicyAttempt:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/retryPolicy/properties/limit/properties/attempt',
  RetryPolicyBackoff:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/retryPolicy/properties/backoff',
  RetryPolicyJitter:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/retryPolicy/properties/jitter',
  RetryPolicyLimit:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/retryPolicy/properties/limit',
  Run: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/runTask/properties/run',
  RunContainer:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/runTask/properties/run/oneOf/0',
  RunScript: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/runTask/properties/run/oneOf/1',
  RunShell: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/runTask/properties/run/oneOf/2',
  RunTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/runTask',
  RunWokflow: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/runTask/properties/run/oneOf/3',
  RunWorkflowDescriptor:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/runTask/properties/run/oneOf/3/properties/workflow',
  Schema: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/schema',
  SchemaExternal: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/schema/oneOf/1',
  SchemaInline: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/schema/oneOf/0',
  Script:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/runTask/properties/run/oneOf/1/properties/script',
  ScriptExternal:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/runTask/properties/run/oneOf/1/properties/script/oneOf/1',
  ScriptInline:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/runTask/properties/run/oneOf/1/properties/script/oneOf/0',
  SecretBasedAuthenticationPolicy:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/secretBasedAuthenticationPolicy',
  Set: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/setTask/properties/set',
  SetTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/setTask',
  Shell:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/runTask/properties/run/oneOf/2/properties/shell',
  ShellArguments:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/runTask/properties/run/oneOf/2/properties/shell/properties/arguments',
  ShellEnvironment:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/runTask/properties/run/oneOf/2/properties/shell/properties/environment',
  Switch: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/switchTask/properties/switch',
  SwitchCase:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/switchTask/properties/switch/items/additionalProperties',
  SwitchItem:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/switchTask/properties/switch/items',
  SwitchTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/switchTask',
  Task: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/task',
  TaskBase: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/taskBase',
  TaskItem: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/taskList/items',
  TaskList: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/taskList',
  Timeout: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/timeout',
  TryTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/tryTask',
  WaitTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/waitTask',
  WithEvent: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/$defs/eventFilter/properties/with',
  WorkflowAuthentications:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/properties/use/properties/authentications',
  WorkflowComponents: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/properties/use',
  WorkflowDocument: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/properties/document',
  WorkflowErrors: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/properties/use/properties/errors',
  WorkflowExtensions:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/properties/use/properties/extensions',
  WorkflowFunctions:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/properties/use/properties/functions',
  WorkflowInput: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/properties/input',
  WorkflowRetries:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/properties/use/properties/retries',
  WorkflowSchedule: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/properties/schedule',
  WorkflowSecrets:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/properties/use/properties/secrets',
  WorkflowTags: 'https://serverlessworkflow.io/schemas/1.0.0-alpha1/workflow.yaml#/properties/document/properties/tags',
};
