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

/*****************************************************************************************
 *
 * /!\ This file is computer generated. Any manual modification can and will be lost. /!\
 *
 *****************************************************************************************/

/**
 * A map of type names and their corresponding schema
 */
export const validationPointers = {
  Workflow: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#',
  AllEventConsumptionStrategy:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/eventConsumptionStrategy/oneOf/0',
  AllEventConsumptionStrategyConfiguration:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/eventConsumptionStrategy/oneOf/0/properties/all',
  AnyEventConsumptionStrategy:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/eventConsumptionStrategy/oneOf/1',
  AnyEventConsumptionStrategyConfiguration:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/eventConsumptionStrategy/oneOf/1/properties/any',
  AsyncApiArguments:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/callTask/oneOf/0/properties/with',
  AuthenticationPolicy: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/authenticationPolicy',
  AuthenticationPolicyReference:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/referenceableAuthenticationPolicy/oneOf/0',
  BasicAuthenticationPolicy:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/authenticationPolicy/oneOf/0',
  BasicAuthenticationPolicyConfiguration:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/authenticationPolicy/oneOf/0/properties/basic',
  BasicAuthenticationProperties:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/authenticationPolicy/oneOf/0/properties/basic/oneOf/0',
  BearerAuthenticationPolicy:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/authenticationPolicy/oneOf/1',
  BearerAuthenticationPolicyConfiguration:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/authenticationPolicy/oneOf/1/properties/bearer',
  BearerAuthenticationProperties:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/authenticationPolicy/oneOf/1/properties/bearer/oneOf/0',
  CallAsyncAPI: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/callTask/oneOf/0',
  CallFunction: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/callTask/oneOf/4',
  CallGRPC: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/callTask/oneOf/1',
  CallHTTP: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/callTask/oneOf/2',
  CallOpenAPI: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/callTask/oneOf/3',
  CallTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/callTask',
  CatchErrors:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/tryTask/properties/catch/properties/errors',
  ConstantBackoff:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/retryPolicy/properties/backoff/oneOf/0',
  Container:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/runTask/properties/run/oneOf/0/properties/container',
  ContainerEnvironment:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/runTask/properties/run/oneOf/0/properties/container/properties/environment',
  ContainerPorts:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/runTask/properties/run/oneOf/0/properties/container/properties/ports',
  ContainerVolumes:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/runTask/properties/run/oneOf/0/properties/container/properties/volumes',
  DigestAuthenticationPolicy:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/authenticationPolicy/oneOf/2',
  DigestAuthenticationPolicyConfiguration:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/authenticationPolicy/oneOf/2/properties/digest',
  DigestAuthenticationProperties:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/authenticationPolicy/oneOf/2/properties/digest/oneOf/0',
  Document: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/properties/document',
  DoTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/doTask',
  Duration: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/duration',
  DurationInline: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/duration/oneOf/0',
  EmitEventDefinition:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/emitTask/properties/emit/properties/event',
  EmitEventWith:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/emitTask/properties/emit/properties/event/properties/with',
  EmitTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/emitTask',
  EmitTaskConfiguration:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/emitTask/properties/emit',
  Endpoint: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/endpoint',
  EndpointConfiguration: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/endpoint/oneOf/2',
  EndpointUri:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/endpoint/oneOf/2/properties/uri',
  Error: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/error',
  ErrorInstance: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/error/properties/instance',
  ErrorType: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/error/properties/type',
  EventConsumptionStrategy:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/eventConsumptionStrategy',
  EventDataschema:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/eventProperties/properties/dataschema',
  EventFilter: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/eventFilter',
  EventFilterCorrelate:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/eventFilter/properties/correlate',
  EventSource:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/eventProperties/properties/source',
  EventTime: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/eventProperties/properties/time',
  ExponentialBackOff:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/retryPolicy/properties/backoff/oneOf/1',
  Export: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/export',
  ExportAs: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/export/properties/as',
  Extension: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/extension',
  ExtensionItem:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/properties/use/properties/extensions/items',
  ExternalResource: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/externalResource',
  ExternalScript:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/runTask/properties/run/oneOf/1/properties/script/oneOf/1',
  FlowDirective: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/flowDirective',
  ForkTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/forkTask',
  ForkTaskConfiguration:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/forkTask/properties/fork',
  ForTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/forTask',
  ForTaskConfiguration:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/forTask/properties/for',
  FunctionArguments:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/callTask/oneOf/4/properties/with',
  GRPCArguments:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/callTask/oneOf/1/properties/with',
  HTTPArguments:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/callTask/oneOf/2/properties/with',
  InlineScript:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/runTask/properties/run/oneOf/1/properties/script/oneOf/0',
  Input: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/properties/input',
  InputFrom: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/input/properties/from',
  LinearBackoff:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/retryPolicy/properties/backoff/oneOf/2',
  ListenTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/listenTask',
  ListenTaskConfiguration:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/listenTask/properties/listen',
  OAuth2AutenthicationData:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/oauth2AuthenticationProperties',
  OAuth2AutenthicationDataAudiences:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/oauth2AuthenticationProperties/properties/audiences',
  OAuth2AutenthicationDataClient:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/oauth2AuthenticationProperties/properties/client',
  OAuth2AutenthicationDataScopes:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/oauth2AuthenticationProperties/properties/scopes',
  OAuth2AuthenticationPolicy:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/authenticationPolicy/oneOf/3',
  OAuth2AuthenticationPolicyConfiguration:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/authenticationPolicy/oneOf/3/properties/oauth2',
  OAuth2AuthenticationPropertiesEndpoints:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/authenticationPolicy/oneOf/3/properties/oauth2/oneOf/0/allOf/1/properties/endpoints',
  OAuth2ConnectAuthenticationProperties:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/authenticationPolicy/oneOf/3/properties/oauth2/oneOf/0',
  OAuth2Issuers:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/oauth2AuthenticationProperties/properties/issuers',
  OAuth2TokenDefinition: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/oauth2Token',
  OAuth2TokenRequest:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/oauth2AuthenticationProperties/properties/request',
  OneEventConsumptionStrategy:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/eventConsumptionStrategy/oneOf/2',
  OpenAPIArguments:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/callTask/oneOf/3/properties/with',
  OpenIdConnectAuthenticationPolicy:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/authenticationPolicy/oneOf/4',
  OpenIdConnectAuthenticationPolicyConfiguration:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/authenticationPolicy/oneOf/4/properties/oidc',
  OpenIdConnectAuthenticationProperties:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/authenticationPolicy/oneOf/4/properties/oidc/oneOf/0',
  Output: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/properties/output',
  OutputAs: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/output/properties/as',
  RaiseTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/raiseTask',
  RaiseTaskConfiguration:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/raiseTask/properties/raise',
  RaiseTaskRaiseError:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/raiseTask/properties/raise/properties/error',
  ReferenceableAuthenticationPolicy:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/referenceableAuthenticationPolicy',
  RetryBackoff:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/retryPolicy/properties/backoff',
  RetryLimit: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/retryPolicy/properties/limit',
  RetryLimitAttempt:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/retryPolicy/properties/limit/properties/attempt',
  RetryPolicy: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/retryPolicy',
  RetryPolicyJitter:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/retryPolicy/properties/jitter',
  RunContainer:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/runTask/properties/run/oneOf/0',
  RunScript: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/runTask/properties/run/oneOf/1',
  RunShell: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/runTask/properties/run/oneOf/2',
  RunTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/runTask',
  RunTaskConfiguration:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/runTask/properties/run',
  RuntimeExpression: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/runtimeExpression',
  RunWorkflow: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/runTask/properties/run/oneOf/3',
  Schedule: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/properties/schedule',
  Schema: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/schema',
  SchemaExternal: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/schema/oneOf/1',
  SchemaInline: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/schema/oneOf/0',
  Script:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/runTask/properties/run/oneOf/1/properties/script',
  SecretBasedAuthenticationPolicy:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/secretBasedAuthenticationPolicy',
  SetTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/setTask',
  SetTaskConfiguration:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/setTask/properties/set',
  Shell:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/runTask/properties/run/oneOf/2/properties/shell',
  ShellArguments:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/runTask/properties/run/oneOf/2/properties/shell/properties/arguments',
  ShellEnvironment:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/runTask/properties/run/oneOf/2/properties/shell/properties/environment',
  SubflowConfiguration:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/runTask/properties/run/oneOf/3/properties/workflow',
  SubflowInput:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/runTask/properties/run/oneOf/3/properties/workflow/properties/input',
  SwitchCase:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/switchTask/properties/switch/items/additionalProperties',
  SwitchItem:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/switchTask/properties/switch/items',
  SwitchTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/switchTask',
  SwitchTaskConfiguration:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/switchTask/properties/switch',
  Task: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/task',
  TaskBase: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/taskBase',
  TaskBaseIf: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/taskBase/properties/if',
  TaskBaseTimeout:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/taskBase/properties/timeout',
  TaskItem: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/taskList/items',
  TaskList: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/taskList',
  TaskMetadata: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/taskBase/properties/metadata',
  Timeout: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/timeout',
  TryTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/tryTask',
  TryTaskCatch: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/tryTask/properties/catch',
  TryTaskCatchRetry:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/tryTask/properties/catch/properties/retry',
  Use: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/properties/use',
  UseAuthentications:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/properties/use/properties/authentications',
  UseErrors: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/properties/use/properties/errors',
  UseExtensions:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/properties/use/properties/extensions',
  UseFunctions: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/properties/use/properties/functions',
  UseRetries: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/properties/use/properties/retries',
  UseSecrets: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/properties/use/properties/secrets',
  UseTimeouts: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/properties/use/properties/timeouts',
  WaitTask: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/waitTask',
  WithAsyncAPIPayload:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/callTask/oneOf/0/properties/with/properties/payload',
  WithEvent: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/eventFilter/properties/with',
  WithGRPCArguments:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/callTask/oneOf/1/properties/with/properties/arguments',
  WithGRPCService:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/callTask/oneOf/1/properties/with/properties/service',
  WithHTTPBody:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/callTask/oneOf/2/properties/with/properties/body',
  WithHTTPHeaders:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/callTask/oneOf/2/properties/with/properties/headers',
  WithHTTPQuery:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/callTask/oneOf/2/properties/with/properties/query',
  WithOpenAPIParameters:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/$defs/callTask/oneOf/3/properties/with/properties/parameters',
  WorkflowMetadata:
    'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/properties/document/properties/metadata',
  WorkflowTags: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/properties/document/properties/tags',
  WorkflowTimeout: 'https://serverlessworkflow.io/schemas/1.0.0-alpha3/workflow.json#/properties/timeout',
};
