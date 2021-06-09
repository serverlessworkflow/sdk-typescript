import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
export class Statedatafilter {
  /**
   * Workflow expression to filter the state data input
   */
  input?: string;
  /**
   * Workflow expression that filters the state data output
   */
  output?: string;

  static builder(): Builder<Statedatafilter> {
    return builder<Statedatafilter>(Statedatafilter.fn);
  }

  static fromSource(value: string): Statedatafilter {
    return plainToClass(Statedatafilter, yaml.load(value));
  }

  private static fn(data: Statedatafilter): () => Statedatafilter {
    return () => {
      Object.assign(data, classToPlain(new Statedatafilter()));

      validate('Statedatafilter', data);

      return data;
    };
  }
}
