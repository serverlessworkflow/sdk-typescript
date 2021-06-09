import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
import { Expose, Transform } from 'class-transformer';
import { Defaultdef } from './defaultdef';
import { Error } from './error';
import { Eventcondition } from './eventcondition';
import { Metadata } from './metadata';
import { Statedatafilter } from './statedatafilter';
export class Eventbasedswitch {
  /**
   * Unique State id
   */
  id?: string;
  /**
   * State name
   */
  name: string;
  /**
   * State type
   */
  @Transform(() => 'switch', {})
  @Expose({ name: 'type' })
  type: 'switch';
  /**
   * State data filter
   */
  stateDataFilter?: Statedatafilter;
  /**
   * Defines conditions evaluated against events
   */
  eventConditions: Eventcondition[];
  /**
   * States error handling and retries definitions
   */
  onErrors?: Error[];
  /**
   * If eventConditions is used, defines the time period to wait for events (ISO 8601 format)
   */
  eventTimeout?: string;
  /**
   * Default transition of the workflow if there is no matching data conditions. Can include a transition or end definition
   */
  default?: /* Default definition. Can be either a transition or end definition */ Defaultdef;
  /**
   * Unique Name of a workflow state which is responsible for compensation of this state
   */
  compensatedBy?: string;
  /**
   * If true, this state is used to compensate another state. Default is false
   */
  @Transform(({ value }) => value || false, { toClassOnly: true })
  @Expose({ name: 'usedForCompensation' })
  usedForCompensation?: boolean;
  metadata?: /* Metadata information */ Metadata;

  static builder(): Builder<Eventbasedswitch> {
    return builder<Eventbasedswitch>(Eventbasedswitch.fn);
  }

  static fromSource(value: string): Eventbasedswitch {
    return plainToClass(Eventbasedswitch, yaml.load(value));
  }

  private static fn(data: Eventbasedswitch): () => Eventbasedswitch {
    return () => {
      Object.assign(data, classToPlain(new Eventbasedswitch()));

      validate('Eventbasedswitch', data);

      return data;
    };
  }
}
