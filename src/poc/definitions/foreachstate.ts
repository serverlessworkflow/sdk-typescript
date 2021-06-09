import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
import { Expose, Transform } from 'class-transformer';
import { Action } from './action';
import { End } from './end';
import { Error } from './error';
import { Metadata } from './metadata';
import { Statedatafilter } from './statedatafilter';
import { Transition } from './transition';
export class Foreachstate {
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
  @Transform(() => 'foreach', {})
  @Expose({ name: 'type' })
  type?: 'foreach';
  /**
   * State end definition
   */
  end?: boolean | End;
  /**
   * Workflow expression selecting an array element of the states data
   */
  inputCollection?: string;
  /**
   * Workflow expression specifying an array element of the states data to add the results of each iteration
   */
  outputCollection?: string;
  /**
   * Name of the iteration parameter that can be referenced in actions/workflow. For each parallel iteration, this param should contain an unique element of the inputCollection array
   */
  iterationParam?: string;
  /**
   * Specifies how upper bound on how many iterations may run in parallel
   */
  max?: number | string;
  /**
   * Actions to be executed for each of the elements of inputCollection
   */
  actions?: Action[];
  /**
   * Unique Id of a workflow to be executed for each of the elements of inputCollection
   */
  workflowId?: string;
  /**
   * State data filter
   */
  stateDataFilter?: Statedatafilter;
  /**
   * States error handling and retries definitions
   */
  onErrors?: Error[];
  /**
   * Next transition of the workflow after state has completed
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

  static builder(): Builder<Foreachstate> {
    return builder<Foreachstate>(Foreachstate.fn);
  }

  static fromSource(value: string): Foreachstate {
    return plainToClass(Foreachstate, yaml.load(value));
  }

  private static fn(data: Foreachstate): () => Foreachstate {
    return () => {
      Object.assign(data, classToPlain(new Foreachstate()));

      validate('Foreachstate', data);

      return data;
    };
  }
}
