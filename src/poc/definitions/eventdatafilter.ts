import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
export class Eventdatafilter {
  /**
   * Workflow expression that filters of the event data (payload)
   */
  data?: string;
  /**
   *  Workflow expression that selects a state data element to which the event payload should be added/merged into. If not specified, denotes, the top-level state data element.
   */
  toStateData?: string;

  static builder(): Builder<Eventdatafilter> {
    return builder<Eventdatafilter>(Eventdatafilter.fn);
  }

  static fromSource(value: string): Eventdatafilter {
    return plainToClass(Eventdatafilter, yaml.load(value));
  }

  private static fn(data: Eventdatafilter): () => Eventdatafilter {
    return () => {
      Object.assign(data, classToPlain(new Eventdatafilter()));

      validate('Eventdatafilter', data);

      return data;
    };
  }
}
