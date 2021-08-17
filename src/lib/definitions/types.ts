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
import { CorrelationDef } from './correlationDef';
import { Transitiondatacondition } from './transitiondatacondition';
import { Enddatacondition } from './enddatacondition';
import { Retrydef } from './retrydef';
import { Function } from './function';
import { Databasedswitch } from './databasedswitch';
import { Eventbasedswitch } from './eventbasedswitch';
import { Transitioneventcondition } from './transitioneventcondition';
import { Enddeventcondition } from './enddeventcondition';
import { Eventstate } from './eventstate';
import { Operationstate } from './operationstate';
import { Parallelstate } from './parallelstate';
import { Injectstate } from './injectstate';
import { Foreachstate } from './foreachstate';
import { Callbackstate } from './callbackstate';
import { Eventdef } from './eventdef';
import { Sleepstate } from './sleepstate';
import { Authdef } from './authdef';
import { Errordef } from './errordef';
import { Specification } from './index';

export type CorrelationDefs = [
  /* CloudEvent correlation definition */ CorrelationDef,
  .../* CloudEvent correlation definition */ CorrelationDef[]
];

export type Datacondition /* Switch state data based condition */ =
  | Transitiondatacondition
  | /* Switch state data based condition */ Enddatacondition;

export type Retries = string /* uri */ | [Retrydef, ...Retrydef[]];

export type Functions = string /* uri */ | [Function, ...Function[]];

export type Switchstate /* Permits transitions to other states based on data conditions */ =
  | Databasedswitch
  | /* Permits transitions to other states based on events */ Eventbasedswitch;

export type Eventcondition /* Switch state data event condition */ =
  | Transitioneventcondition
  | /* Switch state data event condition */ Enddeventcondition;

export type States = [
  (
    | /* Causes the workflow execution to sleep for a specified duration */ Sleepstate
    | /* This state is used to wait for events from event sources, then consumes them and invoke one or more actions to run in sequence or parallel */ Eventstate
    | /* Defines actions be performed. Does not wait for incoming events */ Operationstate
    | /* Consists of a number of states that are executed in parallel */ Parallelstate
    | Switchstate
    | /* Inject static data into state data. Does not perform any actions */ Injectstate
    | /* Execute a set of defined actions or workflows for each element of a data array */ Foreachstate
    | /* This state performs an action, then waits for the callback event that denotes completion of the action */ Callbackstate
  ),
  ...(
    | /* Causes the workflow execution to sleep for a specified duration */ Sleepstate
    | /* This state is used to wait for events from event sources, then consumes them and invoke one or more actions to run in sequence or parallel */ Eventstate
    | /* Defines actions be performed. Does not wait for incoming events */ Operationstate
    | /* Consists of a number of states that are executed in parallel */ Parallelstate
    | Switchstate
    | /* Inject static data into state data. Does not perform any actions */ Injectstate
    | /* Execute a set of defined actions or workflows for each element of a data array */ Foreachstate
    | /* This state performs an action, then waits for the callback event that denotes completion of the action */ Callbackstate
  )[]
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

export type Events = string /* uri */ | [Eventdef, ...Eventdef[]];

export type Auth = string /* uri */ | [Authdef, ...Authdef[]];

export type Errors = string /* uri */ | [Errordef, ...Errordef[]];

export type Properties = Specification.Basicpropsdef | Specification.Beareripropsdef | Specification.Oauth2propsdef;
