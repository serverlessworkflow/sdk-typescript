import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
import { Expose, Transform } from 'class-transformer';
import { Branch } from './branch';
import { End } from './end';
import { Error } from './error';
import { Metadata } from './metadata';
import { Statedatafilter } from './statedatafilter';
import { Transition } from './transition';
export class Parallelstate {
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
  @Transform(() => 'parallel', {})
  @Expose({ name: 'type' })
  type?: 'parallel';
  /**
   * State end definition
   */
  end?: boolean | End;
  /**
   * State data filter
   */
  stateDataFilter?: Statedatafilter;
  /**
   * Branch Definitions
   */
  branches?: /* Branch Definition */ Branch[];
  /**
   * Option types on how to complete branch execution.
   */
  completionType?: 'and' | 'xor' | 'n_of_m';
  /**
   * Used when completionType is set to 'n_of_m' to specify the 'N' value
   */
  n?: number | string;
  /**
   * States error handling and retries definitions
   */
  onErrors?: Error[];
  /**
   * Next transition of the workflow after all branches have completed execution
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

  static builder(): Builder<Parallelstate> {
    return builder<Parallelstate>(Parallelstate.fn);
  }

  static fromSource(value: string): Parallelstate {
    return plainToClass(Parallelstate, yaml.load(value));
  }

  private static fn(data: Parallelstate): () => Parallelstate {
    return () => {
      Object.assign(data, classToPlain(new Parallelstate()));

      validate('Parallelstate', data);

      return data;
    };
  }
}
