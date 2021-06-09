import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
export class Exectimeout {
  /**
   * Timeout duration (ISO 8601 duration format)
   */
  duration: string;
  /**
   * If `false`, workflow instance is allowed to finish current execution. If `true`, current workflow execution is abrupted.
   */
  interrupt?: boolean;
  /**
   * Name of a workflow state to be executed before workflow instance is terminated
   */
  runBefore?: string;

  static builder(): Builder<Exectimeout> {
    return builder<Exectimeout>(Exectimeout.fn);
  }

  static fromSource(value: string): Exectimeout {
    return plainToClass(Exectimeout, yaml.load(value));
  }

  private static fn(data: Exectimeout): () => Exectimeout {
    return () => {
      Object.assign(data, classToPlain(new Exectimeout()));

      validate('Exectimeout', data);

      return data;
    };
  }
}
