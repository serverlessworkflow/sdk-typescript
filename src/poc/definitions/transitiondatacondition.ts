import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
import { Metadata } from './metadata';
import { Transition } from './transition';
export class Transitiondatacondition {
  /**
   * Data condition name
   */
  name?: string;
  /**
   * Workflow expression evaluated against state data. Must evaluate to true or false
   */
  condition: string;
  /**
   * Workflow transition if condition is evaluated to true
   */
  transition: string | Transition;
  metadata?: /* Metadata information */ Metadata;

  static builder(): Builder<Transitiondatacondition> {
    return builder<Transitiondatacondition>(Transitiondatacondition.fn);
  }

  static fromSource(value: string): Transitiondatacondition {
    return plainToClass(Transitiondatacondition, yaml.load(value));
  }

  private static fn(data: Transitiondatacondition): () => Transitiondatacondition {
    return () => {
      Object.assign(data, classToPlain(new Transitiondatacondition()));

      validate('Transitiondatacondition', data);

      return data;
    };
  }
}
