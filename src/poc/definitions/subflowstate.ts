import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
import 'es6-shim';
import 'reflect-metadata';
import { Expose, Transform } from 'class-transformer';
import { End } from './end';
import { Error } from './error';
import { Metadata } from './metadata';
import { Repeat } from './repeat';
import { Statedatafilter } from './statedatafilter';
import { Transition } from './transition';
export class Subflowstate {
  /**
   * Unique state id
   */
  id?: string;
  /**
   * State name
   */
  name?: string;
  /**
   * State type
   */
  @Transform(() => 'subflow', {})
  @Expose({ name: 'type' })
  type?: 'subflow';
  /**
   * State end definition
   */
  end?: boolean | End;
  /**
   * Workflow execution must wait for sub-workflow to finish before continuing
   */
  waitForCompletion?: boolean;
  /**
   * Sub-workflow unique id
   */
  workflowId?: string;
  /**
   * SubFlow state repeat exec definition
   */
  repeat?: Repeat;
  /**
   * State data filter
   */
  stateDataFilter?: Statedatafilter;
  /**
   * States error handling and retries definitions
   */
  onErrors?: Error[];
  /**
   * Next transition of the workflow after SubFlow has completed execution
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

  static builder(): Builder<Subflowstate> {
    return builder<Subflowstate>(Subflowstate.fn);
  }

  static fromSource(value: string): Subflowstate {
    return plainToClass(Subflowstate, yaml.load(value));
  }

  private static fn(data: Subflowstate): () => Subflowstate {
    return () => {
      Object.assign(data, classToPlain(new Subflowstate()));

      if (!data.end && !data.transition) {
        data.end = true;
      }

      validate('Subflowstate', data);

      return data;
    };
  }
}
