import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
import { Produceeventdef } from './produceeventdef';
export class End {
  /**
   * If true, completes all execution flows in the given workflow instance
   */
  terminate?: boolean;
  /**
   * Defines events that should be produced
   */
  produceEvents?: /* Produce an event and set its data */ Produceeventdef[];
  /**
   * If set to true, triggers workflow compensation. Default is false
   */
  compensate?: boolean;

  static builder(): Builder<End> {
    return builder<End>(End.fn);
  }

  static fromSource(value: string): End {
    return plainToClass(End, yaml.load(value));
  }

  private static fn(data: End): () => End {
    return () => {
      Object.assign(data, classToPlain(new End()));

      validate('End', data);

      return data;
    };
  }
}
