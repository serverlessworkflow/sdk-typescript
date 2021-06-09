import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
export class Repeat {
  /**
   * Expression evaluated against SubFlow state data. SubFlow will repeat execution as long as this expression is true or until the max property count is reached
   */
  expression?: string;
  /**
   * If true, the expression is evaluated before each repeat execution, if false the expression is evaluated after each repeat execution
   */
  checkBefore?: boolean;
  /**
   * Sets the maximum amount of repeat executions
   */
  max?: number;
  /**
   * If true, repeats executions in a case unhandled errors propagate from the sub-workflow to this state
   */
  continueOnError?: boolean;
  /**
   * List referencing defined consumed workflow events. SubFlow will repeat execution until one of the defined events is consumed, or until the max property count is reached
   */
  stopOnEvents?: [string, ...string[]];

  static builder(): Builder<Repeat> {
    return builder<Repeat>(Repeat.fn);
  }

  static fromSource(value: string): Repeat {
    return plainToClass(Repeat, yaml.load(value));
  }

  private static fn(data: Repeat): () => Repeat {
    return () => {
      Object.assign(data, classToPlain(new Repeat()));

      validate('Repeat', data);

      return data;
    };
  }
}
