import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
import { Expose, Transform } from 'class-transformer';
import { End } from './end';
import { Metadata } from './metadata';
import { Statedatafilter } from './statedatafilter';
import { Transition } from './transition';
export class Injectstate {
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
  @Transform(() => 'inject', {})
  @Expose({ name: 'type' })
  type?: 'inject';
  /**
   * State end definition
   */
  end?: boolean | End;
  /**
   * JSON object which can be set as states data input and can be manipulated via filters
   */
  data?: {
    [key: string]: any;
  };
  /**
   * State data filter
   */
  stateDataFilter?: Statedatafilter;
  /**
   * Next transition of the workflow after subflow has completed
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

  static builder(): Builder<Injectstate> {
    return builder<Injectstate>(Injectstate.fn);
  }

  static fromSource(value: string): Injectstate {
    return plainToClass(Injectstate, yaml.load(value));
  }

  private static fn(data: Injectstate): () => Injectstate {
    return () => {
      Object.assign(data, classToPlain(new Injectstate()));

      if (!data.end && !data.transition) {
        data.end = true;
      }

      validate('Injectstate', data);

      return data;
    };
  }
}
