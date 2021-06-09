import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
import { End } from './end';
import { Metadata } from './metadata';
export class Enddatacondition {
  /**
   * Data condition name
   */
  name?: string;
  /**
   * Workflow expression evaluated against state data. Must evaluate to true or false
   */
  condition: string;
  /**
   * Workflow end definition
   */
  end: boolean | End;
  metadata?: /* Metadata information */ Metadata;

  static builder(): Builder<Enddatacondition> {
    return builder<Enddatacondition>(Enddatacondition.fn);
  }

  static fromSource(value: string): Enddatacondition {
    return plainToClass(Enddatacondition, yaml.load(value));
  }

  private static fn(data: Enddatacondition): () => Enddatacondition {
    return () => {
      Object.assign(data, classToPlain(new Enddatacondition()));

      validate('Enddatacondition', data);

      return data;
    };
  }
}
