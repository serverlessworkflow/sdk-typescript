import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
import { Action } from './action';
import { Eventdatafilter } from './eventdatafilter';
export class Onevents {
  /**
   * References one or more unique event names in the defined workflow events
   */
  eventRefs: [string, ...string[]];
  /**
   * Specifies how actions are to be performed (in sequence of parallel)
   */
  actionMode?: 'sequential' | 'parallel';
  /**
   * Actions to be performed if expression matches
   */
  actions?: Action[];
  /**
   * Event data filter
   */
  eventDataFilter?: Eventdatafilter;

  static builder(): Builder<Onevents> {
    return builder<Onevents>(Onevents.fn);
  }

  static fromSource(value: string): Onevents {
    return plainToClass(Onevents, yaml.load(value));
  }

  private static fn(data: Onevents): () => Onevents {
    return () => {
      Object.assign(data, classToPlain(new Onevents()));

      validate('Onevents', data);

      return data;
    };
  }
}
