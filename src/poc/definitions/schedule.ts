import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import { Crondef } from './crondef';
export class Schedule {
  /**
   * Time interval (must be repeating interval) described with ISO 8601 format. Declares when workflow instances will be automatically created.
   */
  interval?: string;
  cron?: string | Crondef;
  /**
   * Timezone name used to evaluate the interval & cron-expression. (default: UTC)
   */
  timezone?: string;

  static builder(): Builder<Schedule> {
    return builder<Schedule>(Schedule.fn);
  }

  static fromSource(value: string): Schedule {
    return plainToClass(Schedule, JSON.parse(value));
  }

  private static fn(data: Schedule): () => Schedule {
    return () => {
      Object.assign(data, classToPlain(new Schedule()));

      //TODO add logic?

      validate('Schedule', data);

      return data;
    };
  }
}
