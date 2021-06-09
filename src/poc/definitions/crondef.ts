import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
export class Crondef {
  /**
   * Repeating interval (cron expression) describing when the workflow instance should be created
   */
  expression: string;
  /**
   * Specific date and time (ISO 8601 format) when the cron expression invocation is no longer valid
   */
  validUntil?: string;

  static builder(): Builder<Crondef> {
    return builder<Crondef>(Crondef.fn);
  }

  static fromSource(value: string): Crondef {
    return plainToClass(Crondef, yaml.load(value));
  }

  private static fn(data: Crondef): () => Crondef {
    return () => {
      Object.assign(data, classToPlain(new Crondef()));

      validate('Crondef', data);

      return data;
    };
  }
}
