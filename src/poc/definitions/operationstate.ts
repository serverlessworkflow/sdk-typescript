import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
import 'es6-shim';
import 'reflect-metadata';
import { Expose, Transform } from 'class-transformer';
import { Action } from './action';
import { End } from './end';
import { Error } from './error';
import { Metadata } from './metadata';
import { Statedatafilter } from './statedatafilter';
import { Transition } from './transition';
export class Operationstate {
  /**
   * Unique State id
   */
  id?: string;
  /**
   * State name
   */
  name?: string;
  /**
   * State type
   */
  @Transform(() => 'operation', {})
  @Expose({ name: 'type' })
  type?: 'operation';
  /**
   * State end definition
   */
  end?: boolean | End;
  /**
   * State data filter
   */
  stateDataFilter?: Statedatafilter;
  /**
   * Specifies whether actions are performed in sequence or in parallel
   */
  actionMode?: 'sequential' | 'parallel';
  /**
   * Actions to be performed
   */
  actions?: Action[];
  /**
   * States error handling and retries definitions
   */
  onErrors?: Error[];
  /**
   * Next transition of the workflow after all the actions have been performed
   */
  transition?: string | Transition;
  /**
   * Unique Name of a workflow state which is responsible for compensation of this state
   */
  compensatedBy?: string;
  /**
   * If true, this state is used to compensate another state. Default is false
   */
  @Transform(({ value }) => value || false, { toClassOnly: true })
  @Expose({ name: 'usedForCompensation' })
  usedForCompensation?: boolean;
  metadata?: /* Metadata information */ Metadata;

  static builder(): Builder<Operationstate> {
    return builder<Operationstate>(Operationstate.fn);
  }

  static fromSource(value: string): Operationstate {
    return plainToClass(Operationstate, yaml.load(value));
  }

  private static fn(data: Operationstate): () => Operationstate {
    return () => {
      Object.assign(data, classToPlain(new Operationstate()));

      if (!data.end && !data.transition) {
        data.end = true;
      }

      validate('Operationstate', data);

      return data;
    };
  }
}
