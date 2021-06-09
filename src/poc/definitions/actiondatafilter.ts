import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
export class Actiondatafilter {
  /**
   * Workflow expression that selects state data that the state action can use
   */
  fromStateData?: string;
  /**
   * Workflow expression that filters the actions data results
   */
  results?: string;
  /**
   * Workflow expression that selects a state data element to which the action results should be added/merged into. If not specified, denote, the top-level state data element
   */
  toStateData?: string;

  static builder(): Builder<Actiondatafilter> {
    return builder<Actiondatafilter>(Actiondatafilter.fn);
  }

  static fromSource(value: string): Actiondatafilter {
    return plainToClass(Actiondatafilter, yaml.load(value));
  }

  private static fn(data: Actiondatafilter): () => Actiondatafilter {
    return () => {
      Object.assign(data, classToPlain(new Actiondatafilter()));

      validate('Actiondatafilter', data);

      return data;
    };
  }
}
