import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
import { End } from './end';
import { Eventdatafilter } from './eventdatafilter';
import { Metadata } from './metadata';
export class Enddeventcondition {
  /**
   * Event condition name
   */
  name?: string;
  /**
   * References an unique event name in the defined workflow events
   */
  eventRef: string;
  /**
   * Explicit transition to end
   */
  end: boolean | End;
  /**
   * Event data filter definition
   */
  eventDataFilter?: Eventdatafilter;
  metadata?: /* Metadata information */ Metadata;

  static builder(): Builder<Enddeventcondition> {
    return builder<Enddeventcondition>(Enddeventcondition.fn);
  }

  static fromSource(value: string): Enddeventcondition {
    return plainToClass(Enddeventcondition, yaml.load(value));
  }

  private static fn(data: Enddeventcondition): () => Enddeventcondition {
    return () => {
      Object.assign(data, classToPlain(new Enddeventcondition()));

      validate('Enddeventcondition', data);

      return data;
    };
  }
}
