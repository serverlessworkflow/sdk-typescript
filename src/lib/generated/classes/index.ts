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

import { Schema } from './schema';
import { ExternalResource } from './external-resource';
import { ReferenceableAuthenticationPolicy } from './referenceable-authentication-policy';
import { ReferencedAuthenticationPolicy } from './referenced-authentication-policy';
import { InputFrom } from './input-from';
import { AuthenticationPolicy } from './authentication-policy';
import { Task } from './task';
import { CallTask } from './call-task';
import { CallHTTPWithEndpoint } from './call-http-with-endpoint';
import { OutputAs } from './output-as';
import { ExportAs } from './export-as';
import { FlowDirective } from './flow-directive';
import { FlowDirectiveEnum } from './flow-directive-enum';
import { EventConsumptionStrategy } from './event-consumption-strategy';
import { EventConsumptionStrategyAll } from './event-consumption-strategy-all';
import { EventConsumptionStrategyAny } from './event-consumption-strategy-any';
import { Run } from './run';
import { Script } from './script';
import { Switch } from './switch';
import { RetryPolicyBackoff } from './retry-policy-backoff';
import { TaskList } from './task-list';
import { WorkflowExtensions } from './workflow-extensions';
import { WorkflowSecrets } from './workflow-secrets';
import { Workflow } from './workflow';
import { WorkflowDocument } from './workflow-document';
import { WorkflowTags } from './workflow-tags';
import { Input } from './input';
import { SchemaInline } from './schema-inline';
import { SchemaExternal } from './schema-external';
import { ExternalResourceURI } from './external-resource-u-r-i';
import { AuthenticationPolicyReference } from './authentication-policy-reference';
import { BasicAuthenticationPolicy } from './basic-authentication-policy';
import { ExplicitBasicAuthenticationPolicy } from './explicit-basic-authentication-policy';
import { SecretBasedAuthenticationPolicy } from './secret-based-authentication-policy';
import { BearerAuthenticationPolicy } from './bearer-authentication-policy';
import { ExplicitBearerAuthenticationPolicy } from './explicit-bearer-authentication-policy';
import { OAuth2AuthenticationPolicy } from './o-auth2-authentication-policy';
import { ExplicitOAuth2AuthenticationPolicy } from './explicit-o-auth2-authentication-policy';
import { Oauth2Token } from './oauth2-token';
import { WorkflowComponents } from './workflow-components';
import { WorkflowAuthentications } from './workflow-authentications';
import { WorkflowErrors } from './workflow-errors';
import { Error } from './error';
import { ExtensionItem } from './extension-item';
import { Extension } from './extension';
import { TaskItem } from './task-item';
import { CallAsyncAPI } from './call-async-api';
import { CallAsyncAPIWith } from './call-async-api-with';
import { CallGRPC } from './call-grpc';
import { CallGRPCWith } from './call-grpc-with';
import { CallGRPCWithService } from './call-grpc-with-service';
import { CallGRPCWithArguments } from './call-grpc-with-arguments';
import { CallHTTP } from './call-http';
import { CallHTTPWith } from './call-http-with';
import { Endpoint } from './endpoint';
import { CallHTTPWithHeaders } from './call-http-with-headers';
import { CallHTTPWithBody } from './call-http-with-body';
import { CallOpenAPI } from './call-open-api';
import { CallOpenAPIWith } from './call-open-api-with';
import { CallOpenAPIWithParameters } from './call-open-api-with-parameters';
import { CallFunction } from './call-function';
import { CallFunctionWith } from './call-function-with';
import { DoTask } from './do-task';
import { ForkTask } from './fork-task';
import { Fork } from './fork';
import { TaskBase } from './task-base';
import { Output } from './output';
import { Export } from './export';
import { Timeout } from './timeout';
import { Duration } from './duration';
import { EmitTask } from './emit-task';
import { Emit } from './emit';
import { EmitEvent } from './emit-event';
import { ForTask } from './for-task';
import { For } from './for';
import { ListenTask } from './listen-task';
import { Listen } from './listen';
import { AllEventConsumptionStrategy } from './all-event-consumption-strategy';
import { EventFilter } from './event-filter';
import { WithEvent } from './with-event';
import { Correlate } from './correlate';
import { AnyEventConsumptionStrategy } from './any-event-consumption-strategy';
import { OneEventConsumptionStrategy } from './one-event-consumption-strategy';
import { RaiseTask } from './raise-task';
import { Raise } from './raise';
import { RunTask } from './run-task';
import { RunContainer } from './run-container';
import { Container } from './container';
import { ContainerEnvironment } from './container-environment';
import { RunScript } from './run-script';
import { ScriptInline } from './script-inline';
import { ScriptExternal } from './script-external';
import { RunShell } from './run-shell';
import { Shell } from './shell';
import { ShellArguments } from './shell-arguments';
import { ShellEnvironment } from './shell-environment';
import { RunWokflow } from './run-wokflow';
import { RunWorkflowDescriptor } from './run-workflow-descriptor';
import { WorkflowInput } from './workflow-input';
import { SetTask } from './set-task';
import { Set } from './set';
import { SwitchTask } from './switch-task';
import { SwitchItem } from './switch-item';
import { SwitchCase } from './switch-case';
import { TryTask } from './try-task';
import { Catch } from './catch';
import { CatchErrors } from './catch-errors';
import { RetryPolicy } from './retry-policy';
import { ConstantBackoff } from './constant-backoff';
import { ExponentialBackOff } from './exponential-back-off';
import { LinearBackoff } from './linear-backoff';
import { RetryPolicyLimit } from './retry-policy-limit';
import { RetryPolicyAttempt } from './retry-policy-attempt';
import { RetryPolicyJitter } from './retry-policy-jitter';
import { WaitTask } from './wait-task';
import { WorkflowFunctions } from './workflow-functions';
import { WorkflowRetries } from './workflow-retries';
import { WorkflowSchedule } from './workflow-schedule';

export const Classes = {
  Schema,
  ExternalResource,
  ReferenceableAuthenticationPolicy,
  ReferencedAuthenticationPolicy,
  InputFrom,
  AuthenticationPolicy,
  Task,
  CallTask,
  CallHTTPWithEndpoint,
  OutputAs,
  ExportAs,
  FlowDirective,
  FlowDirectiveEnum,
  EventConsumptionStrategy,
  EventConsumptionStrategyAll,
  EventConsumptionStrategyAny,
  Run,
  Script,
  Switch,
  RetryPolicyBackoff,
  TaskList,
  WorkflowExtensions,
  WorkflowSecrets,
  Workflow,
  WorkflowDocument,
  WorkflowTags,
  Input,
  SchemaInline,
  SchemaExternal,
  ExternalResourceURI,
  AuthenticationPolicyReference,
  BasicAuthenticationPolicy,
  ExplicitBasicAuthenticationPolicy,
  SecretBasedAuthenticationPolicy,
  BearerAuthenticationPolicy,
  ExplicitBearerAuthenticationPolicy,
  OAuth2AuthenticationPolicy,
  ExplicitOAuth2AuthenticationPolicy,
  Oauth2Token,
  WorkflowComponents,
  WorkflowAuthentications,
  WorkflowErrors,
  Error,
  ExtensionItem,
  Extension,
  TaskItem,
  CallAsyncAPI,
  CallAsyncAPIWith,
  CallGRPC,
  CallGRPCWith,
  CallGRPCWithService,
  CallGRPCWithArguments,
  CallHTTP,
  CallHTTPWith,
  Endpoint,
  CallHTTPWithHeaders,
  CallHTTPWithBody,
  CallOpenAPI,
  CallOpenAPIWith,
  CallOpenAPIWithParameters,
  CallFunction,
  CallFunctionWith,
  DoTask,
  ForkTask,
  Fork,
  TaskBase,
  Output,
  Export,
  Timeout,
  Duration,
  EmitTask,
  Emit,
  EmitEvent,
  ForTask,
  For,
  ListenTask,
  Listen,
  AllEventConsumptionStrategy,
  EventFilter,
  WithEvent,
  Correlate,
  AnyEventConsumptionStrategy,
  OneEventConsumptionStrategy,
  RaiseTask,
  Raise,
  RunTask,
  RunContainer,
  Container,
  ContainerEnvironment,
  RunScript,
  ScriptInline,
  ScriptExternal,
  RunShell,
  Shell,
  ShellArguments,
  ShellEnvironment,
  RunWokflow,
  RunWorkflowDescriptor,
  WorkflowInput,
  SetTask,
  Set,
  SwitchTask,
  SwitchItem,
  SwitchCase,
  TryTask,
  Catch,
  CatchErrors,
  RetryPolicy,
  ConstantBackoff,
  ExponentialBackOff,
  LinearBackoff,
  RetryPolicyLimit,
  RetryPolicyAttempt,
  RetryPolicyJitter,
  WaitTask,
  WorkflowFunctions,
  WorkflowRetries,
  WorkflowSchedule,
};
