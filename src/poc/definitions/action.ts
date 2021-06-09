import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
import { Actiondatafilter } from './actiondatafilter';
import { Eventref } from './eventref';
import { Functionref } from './functionref';
export class Action {
  /**
   * Unique action definition name
   */
  name?: string;
  functionRef: string | Functionref;
  eventRef?: /* Event References */ Eventref;
  /**
   * Time period to wait for function execution to complete
   */
  timeout?: string;
  actionDataFilter?: Actiondatafilter;

  static builder(): Builder<Action> {
    return builder<Action>(Action.fn);
  }

  static fromSource(value: string): Action {
    return plainToClass(Action, yaml.load(value));
  }

  private static fn(data: Action): () => Action {
    return () => {
      Object.assign(data, classToPlain(new Action()));

      validate('Action', data);

      return data;
    };
  }
}
