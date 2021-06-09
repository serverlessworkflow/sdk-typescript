import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
import { Expose, Transform } from 'class-transformer';
import { End } from './end';
import { Error } from './error';
import { Metadata } from './metadata';
import { Statedatafilter } from './statedatafilter';
import { Transition } from './transition';
export class Delaystate {
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
  @Transform(() => 'delay', {})
  @Expose({ name: 'type' })
  type?: 'delay';
  /**
   * State end definition
   */
  end?: boolean | End;
  /**
   * State data filter
   */
  stateDataFilter?: Statedatafilter;
  /**
   * Amount of time (ISO 8601 format) to delay
   */
  timeDelay?: string;
  /**
   * States error handling and retries definitions
   */
  onErrors?: Error[];
  /**
   * Next transition of the workflow after the time delay
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

  static builder(): Builder<Delaystate> {
    return builder<Delaystate>(Delaystate.fn);
  }

  static fromSource(value: string): Delaystate {
    return plainToClass(Delaystate, yaml.load(value));
  }

  private static fn(data: Delaystate): () => Delaystate {
    return () => {
      Object.assign(data, classToPlain(new Delaystate()));

      validate('Delaystate', data);

      return data;
    };
  }
}
