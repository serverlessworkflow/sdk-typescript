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
import { ICorrelationDef } from './correlationDef';
import { ITransitiondatacondition } from './transitiondatacondition';
import { IEnddatacondition } from './enddatacondition';
import { IRetrydef } from './retrydef';
import { IFunction } from './function';
import { IDatabasedswitchstate } from './databasedswitchstate';
import { IEventbasedswitchstate } from './eventbasedswitchstate';
import { ITransitioneventcondition } from './transitioneventcondition';
import { IEnddeventcondition } from './enddeventcondition';
import { IEventstate } from './eventstate';
import { IOperationstate } from './operationstate';
import { IParallelstate } from './parallelstate';
import { IInjectstate } from './injectstate';
import { IForeachstate } from './foreachstate';
import { ICallbackstate } from './callbackstate';
import { IEventdef } from './eventdef';
import { ISleepstate } from './sleepstate';
import { IAuthdef } from './authdef';
import { IErrordef } from './errordef';
import { Specification } from './index';

export type CorrelationDefs = [
  /* CloudEvent correlation definition */ ICorrelationDef,
  .../* CloudEvent correlation definition */ ICorrelationDef[],
];

export type Datacondition /* Switch state data based condition */ =
  | ITransitiondatacondition
  | /* Switch state data based condition */ IEnddatacondition;

export type Retries = string /* uri */ | [IRetrydef, ...IRetrydef[]];

export type Functions = string /* uri */ | [IFunction, ...IFunction[]];

export type Switchstate /* Permits transitions to other states based on data conditions */ =
  | IDatabasedswitchstate
  | /* Permits transitions to other states based on events */ IEventbasedswitchstate;

export type Eventcondition /* Switch state data event condition */ =
  | ITransitioneventcondition
  | /* Switch state data event condition */ IEnddeventcondition;

export type States = [
  (
    | /* Causes the workflow execution to sleep for a specified duration */ ISleepstate
    | /* This state is used to wait for events from event sources, then consumes them and invoke one or more actions to run in sequence or parallel */ IEventstate
    | /* Defines actions be performed. Does not wait for incoming events */ IOperationstate
    | /* Consists of a number of states that are executed in parallel */ IParallelstate
    | Switchstate
    | /* Inject static data into state data. Does not perform any actions */ IInjectstate
    | /* Execute a set of defined actions or workflows for each element of a data array */ IForeachstate
    | /* This state performs an action, then waits for the callback event that denotes completion of the action */ ICallbackstate
  ),
  ...(
    | /* Causes the workflow execution to sleep for a specified duration */ ISleepstate
    | /* This state is used to wait for events from event sources, then consumes them and invoke one or more actions to run in sequence or parallel */ IEventstate
    | /* Defines actions be performed. Does not wait for incoming events */ IOperationstate
    | /* Consists of a number of states that are executed in parallel */ IParallelstate
    | Switchstate
    | /* Inject static data into state data. Does not perform any actions */ IInjectstate
    | /* Execute a set of defined actions or workflows for each element of a data array */ IForeachstate
    | /* This state performs an action, then waits for the callback event that denotes completion of the action */ ICallbackstate
  )[],
];

/**
 * Single branch execution timeout duration (ISO 8601 duration format)
 */
export type BranchExecTimeout = string;

/**
 * Single actions definition execution timeout duration (ISO 8601 duration format)
 */
export type ActionExecTimeout = string;

/**
 * Timeout duration to wait for consuming defined events (ISO 8601 duration format)
 */
export type EventTimeout = string;

export type Secrets = string /* uri */ | [string, ...string[]];

export type Events = string /* uri */ | [IEventdef, ...IEventdef[]];

export type Auth = string /* uri */ | [IAuthdef, ...IAuthdef[]];

export type Errors = string /* uri */ | [IErrordef, ...IErrordef[]];

export type Properties = Specification.IBasicpropsdef | Specification.IBearerpropsdef | Specification.IOauth2propsdef;
