import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
import { Produceeventdef } from './produceeventdef';
export class Transition {
  /**
   * Name of state to transition to
   */
  nextState: string;
  /**
   * Array of events to be produced before the transition happens
   */
  produceEvents?: /* Produce an event and set its data */ Produceeventdef[];
  /**
   * If set to true, triggers workflow compensation when before this transition is taken. Default is false
   */
  compensate?: boolean;

  static builder(): Builder<Transition> {
    return builder<Transition>(Transition.fn);
  }

  static fromSource(value: string): Transition {
    return plainToClass(Transition, yaml.load(value));
  }

  private static fn(data: Transition): () => Transition {
    return () => {
      Object.assign(data, classToPlain(new Transition()));

      validate('Transition', data);

      return data;
    };
  }
}
