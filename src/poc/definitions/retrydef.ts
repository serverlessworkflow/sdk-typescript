import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
export class Retrydef {
  /**
   * Unique retry strategy name
   */
  name: string;
  /**
   * Time delay between retry attempts (ISO 8601 duration format)
   */
  delay?: string;
  /**
   * Maximum time delay between retry attempts (ISO 8601 duration format)
   */
  maxDelay?: string;
  /**
   * Static value by which the delay increases during each attempt (ISO 8601 time format)
   */
  increment?: string;
  /**
   * Numeric value, if specified the delay between retries is multiplied by this value.
   */
  multiplier?: number | string;
  /**
   * Maximum number of retry attempts.
   */
  maxAttempts: number | string;
  /**
   * If float type, maximum amount of random time added or subtracted from the delay between each retry relative to total delay (between 0 and 1). If string type, absolute maximum amount of random time added or subtracted from the delay between each retry (ISO 8601 duration format)
   */
  jitter?: number | string;

  static builder(): Builder<Retrydef> {
    return builder<Retrydef>(Retrydef.fn);
  }

  static fromSource(value: string): Retrydef {
    return plainToClass(Retrydef, yaml.load(value));
  }

  private static fn(data: Retrydef): () => Retrydef {
    return () => {
      Object.assign(data, classToPlain(new Retrydef()));

      validate('Retrydef', data);

      return data;
    };
  }
}
