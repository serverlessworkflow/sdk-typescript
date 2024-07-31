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

import { _AuthenticationPolicy } from './authentication-policy';
import { _AuthenticationPolicyBasic } from './authentication-policy-basic';
import { _AuthenticationPolicyBearer } from './authentication-policy-bearer';
import { _AuthenticationPolicyOauth2 } from './authentication-policy-oauth2';
import { _AuthenticationPolicyOauth2Client } from './authentication-policy-oauth2-client';
import { _CallAsyncAPI } from './call-async-api';
import { _CallAsyncAPIWith } from './call-async-api-with';
import { _CallAsyncAPIWithAuthentication } from './call-async-api-with-authentication';
import { _CallFunction } from './call-function';
import { _CallFunctionWith } from './call-function-with';
import { _CallGRPC } from './call-grpc';
import { _CallGRPCWith } from './call-grpc-with';
import { _CallGRPCWithArguments } from './call-grpc-with-arguments';
import { _CallGRPCWithService } from './call-grpc-with-service';
import { _CallGRPCWithServiceAuthentication } from './call-grpc-with-service-authentication';
import { _CallHTTP } from './call-http';
import { _CallHTTPWith } from './call-http-with';
import { _CallHTTPWithEndpoint } from './call-http-with-endpoint';
import { _CallOpenAPI } from './call-open-api';
import { _CallOpenAPIWith } from './call-open-api-with';
import { _CallOpenAPIWithAuthentication } from './call-open-api-with-authentication';
import { _CallOpenAPIWithParameters } from './call-open-api-with-parameters';
import { _CallTask } from './call-task';
import { _Document } from './document';
import { _DocumentTags } from './document-tags';
import { _DoTask } from './do-task';
import { _Duration } from './duration';
import { _EmitTask } from './emit-task';
import { _EmitTaskEmit } from './emit-task-emit';
import { _EmitTaskEmitEvent } from './emit-task-emit-event';
import { _Endpoint } from './endpoint';
import { _EndpointAuthentication } from './endpoint-authentication';
import { _Error } from './error';
import { _EventConsumptionStrategy } from './event-consumption-strategy';
import { _EventConsumptionStrategyAll } from './event-consumption-strategy-all';
import { _EventConsumptionStrategyAny } from './event-consumption-strategy-any';
import { _EventFilter } from './event-filter';
import { _EventFilterCorrelate } from './event-filter-correlate';
import { _EventFilterWith } from './event-filter-with';
import { _Export } from './export';
import { _Extension } from './extension';
import { _ExternalResource } from './external-resource';
import { _ExternalResourceAuthentication } from './external-resource-authentication';
import { _FlowDirective } from './flow-directive';
import { _ForkTask } from './fork-task';
import { _ForkTaskFork } from './fork-task-fork';
import { _ForTask } from './for-task';
import { _ForTaskFor } from './for-task-for';
import { _Input } from './input';
import { _ListenTask } from './listen-task';
import { _ListenTaskListen } from './listen-task-listen';
import { _Oauth2Token } from './oauth2-token';
import { _Output } from './output';
import { _RaiseTask } from './raise-task';
import { _RaiseTaskRaise } from './raise-task-raise';
import { _RetryPolicy } from './retry-policy';
import { _RetryPolicyBackoff } from './retry-policy-backoff';
import { _RetryPolicyJitter } from './retry-policy-jitter';
import { _RetryPolicyLimit } from './retry-policy-limit';
import { _RetryPolicyLimitAttempt } from './retry-policy-limit-attempt';
import { _RunTask } from './run-task';
import { _RunTaskRun } from './run-task-run';
import { _RunTaskRunContainer } from './run-task-run-container';
import { _RunTaskRunScript } from './run-task-run-script';
import { _RunTaskRunShell } from './run-task-run-shell';
import { _RunTaskRunShellArguments } from './run-task-run-shell-arguments';
import { _RunTaskRunShellEnvironment } from './run-task-run-shell-environment';
import { _RunTaskRunWorkflow } from './run-task-run-workflow';
import { _RunTaskRunWorkflowInput } from './run-task-run-workflow-input';
import { _Schedule } from './schedule';
import { _Schema } from './schema';
import { _SetTask } from './set-task';
import { _SetTaskSet } from './set-task-set';
import { _SwitchTask } from './switch-task';
import { _SwitchTaskSwitch } from './switch-task-switch';
import { _SwitchTaskSwitchCase } from './switch-task-switch-case';
import { _Task } from './task';
import { _TaskBase } from './task-base';
import { _TaskList } from './task-list';
import { _Timeout } from './timeout';
import { _TryTask } from './try-task';
import { _TryTaskCatch } from './try-task-catch';
import { _Use } from './use';
import { _UseAuthentications } from './use-authentications';
import { _UseErrors } from './use-errors';
import { _UseExtensions } from './use-extensions';
import { _UseFunctions } from './use-functions';
import { _UseRetries } from './use-retries';
import { _WaitTask } from './wait-task';
import { _Workflow } from './workflow';

export const Classes = {
  AuthenticationPolicy: _AuthenticationPolicy,
  AuthenticationPolicyBasic: _AuthenticationPolicyBasic,
  AuthenticationPolicyBearer: _AuthenticationPolicyBearer,
  AuthenticationPolicyOauth2: _AuthenticationPolicyOauth2,
  AuthenticationPolicyOauth2Client: _AuthenticationPolicyOauth2Client,
  CallAsyncAPI: _CallAsyncAPI,
  CallAsyncAPIWith: _CallAsyncAPIWith,
  CallAsyncAPIWithAuthentication: _CallAsyncAPIWithAuthentication,
  CallFunction: _CallFunction,
  CallFunctionWith: _CallFunctionWith,
  CallGRPC: _CallGRPC,
  CallGRPCWith: _CallGRPCWith,
  CallGRPCWithArguments: _CallGRPCWithArguments,
  CallGRPCWithService: _CallGRPCWithService,
  CallGRPCWithServiceAuthentication: _CallGRPCWithServiceAuthentication,
  CallHTTP: _CallHTTP,
  CallHTTPWith: _CallHTTPWith,
  CallHTTPWithEndpoint: _CallHTTPWithEndpoint,
  CallOpenAPI: _CallOpenAPI,
  CallOpenAPIWith: _CallOpenAPIWith,
  CallOpenAPIWithAuthentication: _CallOpenAPIWithAuthentication,
  CallOpenAPIWithParameters: _CallOpenAPIWithParameters,
  CallTask: _CallTask,
  Document: _Document,
  DocumentTags: _DocumentTags,
  DoTask: _DoTask,
  Duration: _Duration,
  EmitTask: _EmitTask,
  EmitTaskEmit: _EmitTaskEmit,
  EmitTaskEmitEvent: _EmitTaskEmitEvent,
  Endpoint: _Endpoint,
  EndpointAuthentication: _EndpointAuthentication,
  Error: _Error,
  EventConsumptionStrategy: _EventConsumptionStrategy,
  EventConsumptionStrategyAll: _EventConsumptionStrategyAll,
  EventConsumptionStrategyAny: _EventConsumptionStrategyAny,
  EventFilter: _EventFilter,
  EventFilterCorrelate: _EventFilterCorrelate,
  EventFilterWith: _EventFilterWith,
  Export: _Export,
  Extension: _Extension,
  ExternalResource: _ExternalResource,
  ExternalResourceAuthentication: _ExternalResourceAuthentication,
  FlowDirective: _FlowDirective,
  ForkTask: _ForkTask,
  ForkTaskFork: _ForkTaskFork,
  ForTask: _ForTask,
  ForTaskFor: _ForTaskFor,
  Input: _Input,
  ListenTask: _ListenTask,
  ListenTaskListen: _ListenTaskListen,
  Oauth2Token: _Oauth2Token,
  Output: _Output,
  RaiseTask: _RaiseTask,
  RaiseTaskRaise: _RaiseTaskRaise,
  RetryPolicy: _RetryPolicy,
  RetryPolicyBackoff: _RetryPolicyBackoff,
  RetryPolicyJitter: _RetryPolicyJitter,
  RetryPolicyLimit: _RetryPolicyLimit,
  RetryPolicyLimitAttempt: _RetryPolicyLimitAttempt,
  RunTask: _RunTask,
  RunTaskRun: _RunTaskRun,
  RunTaskRunContainer: _RunTaskRunContainer,
  RunTaskRunScript: _RunTaskRunScript,
  RunTaskRunShell: _RunTaskRunShell,
  RunTaskRunShellArguments: _RunTaskRunShellArguments,
  RunTaskRunShellEnvironment: _RunTaskRunShellEnvironment,
  RunTaskRunWorkflow: _RunTaskRunWorkflow,
  RunTaskRunWorkflowInput: _RunTaskRunWorkflowInput,
  Schedule: _Schedule,
  Schema: _Schema,
  SetTask: _SetTask,
  SetTaskSet: _SetTaskSet,
  SwitchTask: _SwitchTask,
  SwitchTaskSwitch: _SwitchTaskSwitch,
  SwitchTaskSwitchCase: _SwitchTaskSwitchCase,
  Task: _Task,
  TaskBase: _TaskBase,
  TaskList: _TaskList,
  Timeout: _Timeout,
  TryTask: _TryTask,
  TryTaskCatch: _TryTaskCatch,
  Use: _Use,
  UseAuthentications: _UseAuthentications,
  UseErrors: _UseErrors,
  UseExtensions: _UseExtensions,
  UseFunctions: _UseFunctions,
  UseRetries: _UseRetries,
  WaitTask: _WaitTask,
  Workflow: _Workflow,
};
