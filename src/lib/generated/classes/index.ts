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

import { _Schema } from './schema';
import { _ExternalResource } from './external-resource';
import { _ExternalResourceAuthentication } from './external-resource-authentication';
import { _AuthenticationPolicy } from './authentication-policy';
import { _Task } from './task';
import { _CallTask } from './call-task';
import { _CallAsyncAPI } from './call-async-api';
import { _FlowDirective } from './flow-directive';
import { _CallAsyncAPIWithAuthentication } from './call-async-api-with-authentication';
import { _CallGRPC } from './call-grpc';
import { _CallGRPCWithServiceAuthentication } from './call-grpc-with-service-authentication';
import { _CallHTTP } from './call-http';
import { _CallHTTPWithEndpoint } from './call-http-with-endpoint';
import { _EndpointAuthentication } from './endpoint-authentication';
import { _CallOpenAPI } from './call-open-api';
import { _CallOpenAPIWithAuthentication } from './call-open-api-with-authentication';
import { _CallFunction } from './call-function';
import { _DoTask } from './do-task';
import { _ForkTask } from './fork-task';
import { _EmitTask } from './emit-task';
import { _ForTask } from './for-task';
import { _ListenTask } from './listen-task';
import { _EventConsumptionStrategy } from './event-consumption-strategy';
import { _EventConsumptionStrategyAll } from './event-consumption-strategy-all';
import { _EventConsumptionStrategyAny } from './event-consumption-strategy-any';
import { _RaiseTask } from './raise-task';
import { _RunTask } from './run-task';
import { _RunTaskRun } from './run-task-run';
import { _RunTaskRunScript } from './run-task-run-script';
import { _SetTask } from './set-task';
import { _SwitchTask } from './switch-task';
import { _SwitchTaskSwitch } from './switch-task-switch';
import { _TryTask } from './try-task';
import { _RetryPolicyBackoff } from './retry-policy-backoff';
import { _WaitTask } from './wait-task';
import { _TaskList } from './task-list';
import { _UseExtensions } from './use-extensions';
import { _Workflow } from './workflow';
import { _Document } from './document';
import { _DocumentTags } from './document-tags';
import { _Input } from './input';
import { _AuthenticationPolicyBasic } from './authentication-policy-basic';
import { _AuthenticationPolicyBearer } from './authentication-policy-bearer';
import { _AuthenticationPolicyOauth2 } from './authentication-policy-oauth2';
import { _AuthenticationPolicyOauth2Client } from './authentication-policy-oauth2-client';
import { _Oauth2Token } from './oauth2-token';
import { _Use } from './use';
import { _UseAuthentications } from './use-authentications';
import { _UseErrors } from './use-errors';
import { _Error } from './error';
import { _Extension } from './extension';
import { _TaskBase } from './task-base';
import { _Output } from './output';
import { _Export } from './export';
import { _Timeout } from './timeout';
import { _Duration } from './duration';
import { _CallAsyncAPIWith } from './call-async-api-with';
import { _CallGRPCWith } from './call-grpc-with';
import { _CallGRPCWithService } from './call-grpc-with-service';
import { _CallGRPCWithArguments } from './call-grpc-with-arguments';
import { _CallHTTPWith } from './call-http-with';
import { _Endpoint } from './endpoint';
import { _CallOpenAPIWith } from './call-open-api-with';
import { _CallOpenAPIWithParameters } from './call-open-api-with-parameters';
import { _CallFunctionWith } from './call-function-with';
import { _ForkTaskFork } from './fork-task-fork';
import { _EmitTaskEmit } from './emit-task-emit';
import { _EmitTaskEmitEvent } from './emit-task-emit-event';
import { _ForTaskFor } from './for-task-for';
import { _ListenTaskListen } from './listen-task-listen';
import { _EventFilter } from './event-filter';
import { _EventFilterWith } from './event-filter-with';
import { _EventFilterCorrelate } from './event-filter-correlate';
import { _RaiseTaskRaise } from './raise-task-raise';
import { _RunTaskRunContainer } from './run-task-run-container';
import { _RunTaskRunShell } from './run-task-run-shell';
import { _RunTaskRunShellArguments } from './run-task-run-shell-arguments';
import { _RunTaskRunShellEnvironment } from './run-task-run-shell-environment';
import { _RunTaskRunWorkflow } from './run-task-run-workflow';
import { _RunTaskRunWorkflowInput } from './run-task-run-workflow-input';
import { _SetTaskSet } from './set-task-set';
import { _SwitchTaskSwitchCase } from './switch-task-switch-case';
import { _TryTaskCatch } from './try-task-catch';
import { _RetryPolicy } from './retry-policy';
import { _RetryPolicyLimit } from './retry-policy-limit';
import { _RetryPolicyLimitAttempt } from './retry-policy-limit-attempt';
import { _RetryPolicyJitter } from './retry-policy-jitter';
import { _UseFunctions } from './use-functions';
import { _UseRetries } from './use-retries';
import { _Schedule } from './schedule';

export const Classes = {
  Schema: _Schema,
  ExternalResource: _ExternalResource,
  ExternalResourceAuthentication: _ExternalResourceAuthentication,
  AuthenticationPolicy: _AuthenticationPolicy,
  Task: _Task,
  CallTask: _CallTask,
  CallAsyncAPI: _CallAsyncAPI,
  FlowDirective: _FlowDirective,
  CallAsyncAPIWithAuthentication: _CallAsyncAPIWithAuthentication,
  CallGRPC: _CallGRPC,
  CallGRPCWithServiceAuthentication: _CallGRPCWithServiceAuthentication,
  CallHTTP: _CallHTTP,
  CallHTTPWithEndpoint: _CallHTTPWithEndpoint,
  EndpointAuthentication: _EndpointAuthentication,
  CallOpenAPI: _CallOpenAPI,
  CallOpenAPIWithAuthentication: _CallOpenAPIWithAuthentication,
  CallFunction: _CallFunction,
  DoTask: _DoTask,
  ForkTask: _ForkTask,
  EmitTask: _EmitTask,
  ForTask: _ForTask,
  ListenTask: _ListenTask,
  EventConsumptionStrategy: _EventConsumptionStrategy,
  EventConsumptionStrategyAll: _EventConsumptionStrategyAll,
  EventConsumptionStrategyAny: _EventConsumptionStrategyAny,
  RaiseTask: _RaiseTask,
  RunTask: _RunTask,
  RunTaskRun: _RunTaskRun,
  RunTaskRunScript: _RunTaskRunScript,
  SetTask: _SetTask,
  SwitchTask: _SwitchTask,
  SwitchTaskSwitch: _SwitchTaskSwitch,
  TryTask: _TryTask,
  RetryPolicyBackoff: _RetryPolicyBackoff,
  WaitTask: _WaitTask,
  TaskList: _TaskList,
  UseExtensions: _UseExtensions,
  Workflow: _Workflow,
  Document: _Document,
  DocumentTags: _DocumentTags,
  Input: _Input,
  AuthenticationPolicyBasic: _AuthenticationPolicyBasic,
  AuthenticationPolicyBearer: _AuthenticationPolicyBearer,
  AuthenticationPolicyOauth2: _AuthenticationPolicyOauth2,
  AuthenticationPolicyOauth2Client: _AuthenticationPolicyOauth2Client,
  Oauth2Token: _Oauth2Token,
  Use: _Use,
  UseAuthentications: _UseAuthentications,
  UseErrors: _UseErrors,
  Error: _Error,
  Extension: _Extension,
  TaskBase: _TaskBase,
  Output: _Output,
  Export: _Export,
  Timeout: _Timeout,
  Duration: _Duration,
  CallAsyncAPIWith: _CallAsyncAPIWith,
  CallGRPCWith: _CallGRPCWith,
  CallGRPCWithService: _CallGRPCWithService,
  CallGRPCWithArguments: _CallGRPCWithArguments,
  CallHTTPWith: _CallHTTPWith,
  Endpoint: _Endpoint,
  CallOpenAPIWith: _CallOpenAPIWith,
  CallOpenAPIWithParameters: _CallOpenAPIWithParameters,
  CallFunctionWith: _CallFunctionWith,
  ForkTaskFork: _ForkTaskFork,
  EmitTaskEmit: _EmitTaskEmit,
  EmitTaskEmitEvent: _EmitTaskEmitEvent,
  ForTaskFor: _ForTaskFor,
  ListenTaskListen: _ListenTaskListen,
  EventFilter: _EventFilter,
  EventFilterWith: _EventFilterWith,
  EventFilterCorrelate: _EventFilterCorrelate,
  RaiseTaskRaise: _RaiseTaskRaise,
  RunTaskRunContainer: _RunTaskRunContainer,
  RunTaskRunShell: _RunTaskRunShell,
  RunTaskRunShellArguments: _RunTaskRunShellArguments,
  RunTaskRunShellEnvironment: _RunTaskRunShellEnvironment,
  RunTaskRunWorkflow: _RunTaskRunWorkflow,
  RunTaskRunWorkflowInput: _RunTaskRunWorkflowInput,
  SetTaskSet: _SetTaskSet,
  SwitchTaskSwitchCase: _SwitchTaskSwitchCase,
  TryTaskCatch: _TryTaskCatch,
  RetryPolicy: _RetryPolicy,
  RetryPolicyLimit: _RetryPolicyLimit,
  RetryPolicyLimitAttempt: _RetryPolicyLimitAttempt,
  RetryPolicyJitter: _RetryPolicyJitter,
  UseFunctions: _UseFunctions,
  UseRetries: _UseRetries,
  Schedule: _Schedule,
};
