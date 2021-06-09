import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
export class Functionref {
  /**
   * Name of the referenced function
   */
  refName: string;
  /**
   * Function arguments/inputs
   */
  arguments?: {
    [key: string]: any;
  };

  static builder(): Builder<Functionref> {
    return builder<Functionref>(Functionref.fn);
  }

  static fromSource(value: string): Functionref {
    return plainToClass(Functionref, yaml.load(value));
  }

  private static fn(data: Functionref): () => Functionref {
    return () => {
      Object.assign(data, classToPlain(new Functionref()));

      validate('Functionref', data);

      return data;
    };
  }
}
