import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
export class Eventref {
  /**
   * Reference to the unique name of a 'produced' event definition
   */
  triggerEventRef: string;
  /**
   * Reference to the unique name of a 'consumed' event definition
   */
  resultEventRef: string;
  /**
   * If string type, an expression which selects parts of the states data output to become the data (payload) of the event referenced by 'triggerEventRef'. If object type, a custom object to become the data (payload) of the event referenced by 'triggerEventRef'.
   */
  data?:
    | string
    | {
        [key: string]: any;
      };
  /**
   * Add additional extension context attributes to the produced event
   */
  contextAttributes?: {
    [name: string]: string;
  };

  static builder(): Builder<Eventref> {
    return builder<Eventref>(Eventref.fn);
  }

  static fromSource(value: string): Eventref {
    return plainToClass(Eventref, yaml.load(value));
  }

  private static fn(data: Eventref): () => Eventref {
    return () => {
      Object.assign(data, classToPlain(new Eventref()));

      validate('Eventref', data);

      return data;
    };
  }
}
