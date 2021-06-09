import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
import { CorrelationDef } from './correlationDef';
import { Metadata } from './metadata';
export class Eventdef {
  /**
   * Unique event name
   */
  name?: string;
  /**
   * CloudEvent source
   */
  source?: string;
  /**
   * CloudEvent type
   */
  type?: string;
  /**
   * Defines the CloudEvent as either 'consumed' or 'produced' by the workflow. Default is 'consumed'
   */
  kind?: 'consumed' | 'produced';
  /**
   * CloudEvent correlation definitions
   */
  correlation?: [
    /* CloudEvent correlation definition */ CorrelationDef,
    .../* CloudEvent correlation definition */ CorrelationDef[]
  ];
  /**
   * Metadata information
   */
  metadata?: /* Metadata information */ Metadata;

  static builder(): Builder<Eventdef> {
    return builder<Eventdef>(Eventdef.fn);
  }

  static fromSource(value: string): Eventdef {
    return plainToClass(Eventdef, yaml.load(value));
  }

  private static fn(data: Eventdef): () => Eventdef {
    return () => {
      Object.assign(data, classToPlain(new Eventdef()));

      validate('Eventdef', data);

      return data;
    };
  }
}
