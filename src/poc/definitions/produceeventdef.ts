import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
export class Produceeventdef {
  /**
   * References a name of a defined event
   */
  eventRef: string;
  /**
   * If String, expression which selects parts of the states data output to become the data of the produced event. If object a custom object to become the data of produced event.
   */
  data?:
    | string
    | {
        [key: string]: any;
      };
  /**
   * Add additional event extension context attributes
   */
  contextAttributes?: {
    [name: string]: string;
  };

  static builder(): Builder<Produceeventdef> {
    return builder<Produceeventdef>(Produceeventdef.fn);
  }

  static fromSource(value: string): Produceeventdef {
    return plainToClass(Produceeventdef, yaml.load(value));
  }

  private static fn(data: Produceeventdef): () => Produceeventdef {
    return () => {
      Object.assign(data, classToPlain(new Produceeventdef()));

      validate('Produceeventdef', data);

      return data;
    };
  }
}
