/*
 * Copyright 2021-Present The Serverless Workflow Specification Authors
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { Specification } from '.';
import * as yaml from 'js-yaml';
import { Delaystate } from './delaystate';
import { Eventstate } from './eventstate';
import { Operationstate } from './operationstate';
import { Parallelstate } from './parallelstate';
import { Switchstate } from './switchstate';
import { Callbackstate } from './callbackstate';
import { Foreachstate } from './foreachstate';
import { Injectstate } from './injectstate';
import { Subflowstate } from './subflowstate';

import { validate } from '../utils';
import { Function } from './function';
import { Databasedswitch } from './databasedswitch';
import { Events } from './events';
import { Exectimeout } from './exectimeout';
import { Functions } from './functions';
import { Metadata } from './metadata';
import { Retries } from './retries';
import { Startdef } from './startdef';

type States = [
  (
    | /* Causes the workflow execution to delay for a specified duration */ Delaystate
    | /* This state is used to wait for events from event sources, then consumes them and invoke one or more actions to run in sequence or parallel */ Eventstate
    | /* Defines actions be performed. Does not wait for incoming events */ Operationstate
    | /* Consists of a number of states that are executed in parallel */ Parallelstate
    | Switchstate
    | /* Defines a sub-workflow to be executed */ Subflowstate
    | /* Inject static data into state data. Does not perform any actions */ Injectstate
    | /* Execute a set of defined actions or workflows for each element of a data array */ Foreachstate
    | /* This state performs an action, then waits for the callback event that denotes completion of the action */ Callbackstate
  ),
  ...(
    | /* Causes the workflow execution to delay for a specified duration */ Delaystate
    | /* This state is used to wait for events from event sources, then consumes them and invoke one or more actions to run in sequence or parallel */ Eventstate
    | /* Defines actions be performed. Does not wait for incoming events */ Operationstate
    | /* Consists of a number of states that are executed in parallel */ Parallelstate
    | Switchstate
    | /* Defines a sub-workflow to be executed */ Subflowstate
    | /* Inject static data into state data. Does not perform any actions */ Injectstate
    | /* Execute a set of defined actions or workflows for each element of a data array */ Foreachstate
    | /* This state performs an action, then waits for the callback event that denotes completion of the action */ Callbackstate
  )[]
];

export class Workflow {
  /**
   * Workflow unique identifier
   */
  id: string;
  /**
   * Workflow name
   */
  name: string;
  /**
   * Workflow description
   */
  description?: string;
  /**
   * Workflow version
   */
  version: string;
  start: string | Startdef;
  /**
   * Serverless Workflow schema version
   */
  schemaVersion?: string;
  /**
   * Identifies the expression language used for workflow expressions. Default is 'jq'
   */
  expressionLang?: string;
  execTimeout?: Exectimeout;
  /**
   * If 'true', workflow instances is not terminated when there are no active execution paths. Instance can be terminated via 'terminate end definition' or reaching defined 'execTimeout'
   */
  keepActive?: boolean;
  metadata?: /* Metadata information */ Metadata;
  events?: Events;
  functions?: Functions;
  retries?: Retries;
  /**
   * State definitions
   */
  states: States;

  constructor(model: any) {
    const result = { expressionLang: 'jq' } as Specification.Workflow;
    Object.assign(this, result, model);

    const functions = this.functions;
    if (typeof functions === typeof []) {
      this.functions = (functions as Function[]).map((f) => new Function(JSON.stringify(f))) as Functions;
    }

    const states = this.states;
    this.states = (states as States).map((v) => {
      switch (v.type) {
        case 'inject':
          return new Injectstate(JSON.stringify(v));
        case 'subflow':
          return new Subflowstate(JSON.stringify(v));
        case 'switch':
          return new Databasedswitch(JSON.stringify(v));
        case 'operation':
          return new Operationstate(JSON.stringify(v));
        default:
          throw new Error(`Unexpected type= ${v.type} `);
      }
    }) as States;
  }

  /**
   * Parses the provided string as Workflow
   * @param {string} data The JSON or YAML workflow to parse
   * @returns {Workflow} The parse Workflow
   */
  static fromSource(value: string): Specification.Workflow {
    try {
      return yaml.load(value) as Specification.Workflow;
    } catch (ex) {
      throw new Error('Format not supported');
    }
  }

  /**
   * Stringifies the provided workflow to the JSON format
   * @param {Workflow} workflow The workflow to strigify
   * @returns {string} The workflow as JSON
   */
  static toJson(workflow: Workflow): string {
    validate('Workflow', workflow);
    return JSON.stringify(workflow);
  }

  /**
   * Stringifies the provided workflow to the YAML format
   * @param {Workflow} workflow The workflow to strigify
   * @returns {string} The workflow as YAML
   */
  static toYaml(workflow: Workflow): string {
    validate('Workflow', workflow);
    return yaml.dump(workflow);
  }
}
