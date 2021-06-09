import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
import { Schedule } from './schedule';
export class Startdef {
  /**
   * Name of the starting workflow state
   */
  stateName: string;
  /**
   * Define the time/repeating intervals or cron at which workflow instances should be automatically started.
   */
  schedule: string | Schedule;

  static builder(): Builder<Startdef> {
    return builder<Startdef>(Startdef.fn);
  }

  static fromSource(value: string): Startdef {
    return plainToClass(Startdef, yaml.load(value));
  }

  private static fn(data: Startdef): () => Startdef {
    return () => {
      Object.assign(data, classToPlain(new Startdef()));

      validate('Startdef', data);

      return data;
    };
  }
}
