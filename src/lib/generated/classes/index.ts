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
import { ExternalResourceAuthentication } from './external-resource-authentication';
import { AuthenticationPolicy } from './authentication-policy';
import { Task } from './task';
import { CallTask } from './call-task';
import { CallAsyncAPI } from './call-async-api';
import { FlowDirective } from './flow-directive';
import { CallAsyncAPIWithAuthentication } from './call-async-api-with-authentication';
import { CallGRPC } from './call-grpc';
import { CallGRPCWithServiceAuthentication } from './call-grpc-with-service-authentication';
import { CallHTTP } from './call-http';
import { CallHTTPWithEndpoint } from './call-http-with-endpoint';
import { EndpointAuthentication } from './endpoint-authentication';
import { CallOpenAPI } from './call-open-api';
import { CallOpenAPIWithAuthentication } from './call-open-api-with-authentication';
import { CallFunction } from './call-function';
import { DoTask } from './do-task';
import { ForkTask } from './fork-task';
import { EmitTask } from './emit-task';
import { ForTask } from './for-task';
import { ListenTask } from './listen-task';
import { EventConsumptionStrategy } from './event-consumption-strategy';
import { EventConsumptionStrategyAll } from './event-consumption-strategy-all';
import { EventConsumptionStrategyAny } from './event-consumption-strategy-any';
import { RaiseTask } from './raise-task';
import { RunTask } from './run-task';
import { RunTaskRun } from './run-task-run';
import { RunTaskRunScript } from './run-task-run-script';
import { SetTask } from './set-task';
import { SwitchTask } from './switch-task';
import { SwitchTaskSwitch } from './switch-task-switch';
import { TryTask } from './try-task';
import { RetryPolicyBackoff } from './retry-policy-backoff';
import { WaitTask } from './wait-task';
import { TaskList } from './task-list';
import { UseExtensions } from './use-extensions';
import { Workflow } from './workflow';
import { Document } from './document';
import { DocumentTags } from './document-tags';
import { Input } from './input';
import { AuthenticationPolicyBasic } from './authentication-policy-basic';
import { AuthenticationPolicyBearer } from './authentication-policy-bearer';
import { AuthenticationPolicyOauth2 } from './authentication-policy-oauth2';
import { AuthenticationPolicyOauth2Client } from './authentication-policy-oauth2-client';
import { Oauth2Token } from './oauth2-token';
import { Use } from './use';
import { Error } from './error';
import { Extension } from './extension';
import { TaskBase } from './task-base';
import { Output } from './output';
import { Export } from './export';
import { Timeout } from './timeout';
import { Duration } from './duration';
import { CallAsyncAPIWith } from './call-async-api-with';
import { CallGRPCWith } from './call-grpc-with';
import { CallGRPCWithService } from './call-grpc-with-service';
import { CallGRPCWithArguments } from './call-grpc-with-arguments';
import { CallHTTPWith } from './call-http-with';
import { Endpoint } from './endpoint';
import { CallOpenAPIWith } from './call-open-api-with';
import { CallOpenAPIWithParameters } from './call-open-api-with-parameters';
import { CallFunctionWith } from './call-function-with';
import { ForkTaskFork } from './fork-task-fork';
import { EmitTaskEmit } from './emit-task-emit';
import { EmitTaskEmitEvent } from './emit-task-emit-event';
import { ForTaskFor } from './for-task-for';
import { ListenTaskListen } from './listen-task-listen';
import { EventFilter } from './event-filter';
import { EventFilterWith } from './event-filter-with';
import { EventFilterCorrelate } from './event-filter-correlate';
import { RaiseTaskRaise } from './raise-task-raise';
import { RunTaskRunContainer } from './run-task-run-container';
import { RunTaskRunShell } from './run-task-run-shell';
import { RunTaskRunShellArguments } from './run-task-run-shell-arguments';
import { RunTaskRunShellEnvironment } from './run-task-run-shell-environment';
import { RunTaskRunWorkflow } from './run-task-run-workflow';
import { RunTaskRunWorkflowInput } from './run-task-run-workflow-input';
import { SetTaskSet } from './set-task-set';
import { TryTaskCatch } from './try-task-catch';
import { RetryPolicy } from './retry-policy';
import { RetryPolicyLimit } from './retry-policy-limit';
import { RetryPolicyLimitAttempt } from './retry-policy-limit-attempt';
import { RetryPolicyJitter } from './retry-policy-jitter';
import { Schedule } from './schedule';

export const Classes = {
  Schema,
  ExternalResource,
  ExternalResourceAuthentication,
  AuthenticationPolicy,
  Task,
  CallTask,
  CallAsyncAPI,
  FlowDirective,
  CallAsyncAPIWithAuthentication,
  CallGRPC,
  CallGRPCWithServiceAuthentication,
  CallHTTP,
  CallHTTPWithEndpoint,
  EndpointAuthentication,
  CallOpenAPI,
  CallOpenAPIWithAuthentication,
  CallFunction,
  DoTask,
  ForkTask,
  EmitTask,
  ForTask,
  ListenTask,
  EventConsumptionStrategy,
  EventConsumptionStrategyAll,
  EventConsumptionStrategyAny,
  RaiseTask,
  RunTask,
  RunTaskRun,
  RunTaskRunScript,
  SetTask,
  SwitchTask,
  SwitchTaskSwitch,
  TryTask,
  RetryPolicyBackoff,
  WaitTask,
  TaskList,
  UseExtensions,
  Workflow,
  Document,
  DocumentTags,
  Input,
  AuthenticationPolicyBasic,
  AuthenticationPolicyBearer,
  AuthenticationPolicyOauth2,
  AuthenticationPolicyOauth2Client,
  Oauth2Token,
  Use,
  Error,
  Extension,
  TaskBase,
  Output,
  Export,
  Timeout,
  Duration,
  CallAsyncAPIWith,
  CallGRPCWith,
  CallGRPCWithService,
  CallGRPCWithArguments,
  CallHTTPWith,
  Endpoint,
  CallOpenAPIWith,
  CallOpenAPIWithParameters,
  CallFunctionWith,
  ForkTaskFork,
  EmitTaskEmit,
  EmitTaskEmitEvent,
  ForTaskFor,
  ListenTaskListen,
  EventFilter,
  EventFilterWith,
  EventFilterCorrelate,
  RaiseTaskRaise,
  RunTaskRunContainer,
  RunTaskRunShell,
  RunTaskRunShellArguments,
  RunTaskRunShellEnvironment,
  RunTaskRunWorkflow,
  RunTaskRunWorkflowInput,
  SetTaskSet,
  TryTaskCatch,
  RetryPolicy,
  RetryPolicyLimit,
  RetryPolicyLimitAttempt,
  RetryPolicyJitter,
  Schedule,
};
