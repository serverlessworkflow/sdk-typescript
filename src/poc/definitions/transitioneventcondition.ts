import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
import { Eventdatafilter } from './eventdatafilter';
import { Metadata } from './metadata';
import { Transition } from './transition';
export class Transitioneventcondition {
  /**
   * Event condition name
   */
  name?: string;
  /**
   * References an unique event name in the defined workflow events
   */
  eventRef: string;
  /**
   * Next transition of the workflow if there is valid matches
   */
  transition: string | Transition;
  /**
   * Event data filter definition
   */
  eventDataFilter?: Eventdatafilter;
  metadata?: /* Metadata information */ Metadata;

  static builder(): Builder<Transitioneventcondition> {
    return builder<Transitioneventcondition>(Transitioneventcondition.fn);
  }

  static fromSource(value: string): Transitioneventcondition {
    return plainToClass(Transitioneventcondition, yaml.load(value));
  }

  private static fn(data: Transitioneventcondition): () => Transitioneventcondition {
    return () => {
      Object.assign(data, classToPlain(new Transitioneventcondition()));

      validate('Transitioneventcondition', data);

      return data;
    };
  }
}
