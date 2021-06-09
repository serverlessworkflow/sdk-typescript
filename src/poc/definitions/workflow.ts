import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
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

import 'es6-shim';
import 'reflect-metadata';
import { Expose } from 'class-transformer';
import { Function } from './function';
import { Databasedswitch } from './databasedswitch';
import { Transform } from 'class-transformer';
import { Events } from './events';
import { Exectimeout } from './exectimeout';
import { Functions } from './functions';
import { Metadata } from './metadata';
import { Retries } from './retries';
import { Startdef } from './startdef';
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
  @Transform(({ value }) => value || 'jq', { toClassOnly: true })
  @Expose({ name: 'expressionLang' })
  expressionLang?: string;
  execTimeout?: Exectimeout;
  /**
   * If 'true', workflow instances is not terminated when there are no active execution paths. Instance can be terminated via 'terminate end definition' or reaching defined 'execTimeout'
   */
  keepActive?: boolean;
  metadata?: /* Metadata information */ Metadata;
  events?: Events;
  @Transform(({ value }) => {
    if (typeof value === typeof []) {
      return value.map((v: string) => {
        return Function.fromSource(JSON.stringify(v));
      });
    }
    return value;
  })
  functions?: Functions;
  retries?: Retries;
  /**
   * State definitions
   */
  @Transform(({ value }) => {
    return value.map((v: { type: string }) => {
      switch (v.type) {
        case 'inject':
          return Injectstate.fromSource(JSON.stringify(v));
        case 'subflow':
          return Subflowstate.fromSource(JSON.stringify(v));
        case 'switch':
          return Databasedswitch.fromSource(JSON.stringify(v));
        case 'operation':
          return Operationstate.fromSource(JSON.stringify(v));
        default:
          throw new Error(`Unexpected type= ${v.type} `);
      }
    });
  })
  states: [
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

  static builder(): Builder<Workflow> {
    return builder<Workflow>(Workflow.fn);
  }

  static fromSource(value: string): Workflow {
    return plainToClass(Workflow, yaml.load(value));
  }

  private static fn(data: Workflow): () => Workflow {
    return () => {
      Object.assign(data, classToPlain(new Workflow()));

      validate('Workflow', data);

      return data;
    };
  }

  static toJson(workflow: Workflow): string {
    validate('Workflow', workflow);
    return JSON.stringify(workflow);
  }

  static toYaml(workflow: Workflow): string {
    validate('Workflow', workflow);
    return yaml.dump(workflow);
  }
}
