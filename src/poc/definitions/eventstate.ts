import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
import { Expose, Transform } from 'class-transformer';
import { End } from './end';
import { Error } from './error';
import { Metadata } from './metadata';
import { Onevents } from './onevents';
import { Statedatafilter } from './statedatafilter';
import { Transition } from './transition';
export class Eventstate /* This state is used to wait for events from event sources, then consumes them and invoke one or more actions to run in sequence or parallel */ {
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
  @Transform(() => 'event', {})
  @Expose({ name: 'type' })
  type: 'event';
  /**
   * If true consuming one of the defined events causes its associated actions to be performed. If false all of the defined events must be consumed in order for actions to be performed
   */
  exclusive?: boolean;
  /**
   * Define the events to be consumed and optional actions to be performed
   */
  onEvents: Onevents[];
  /**
   * Time period to wait for incoming events (ISO 8601 format)
   */
  timeout?: string;
  stateDataFilter?: Statedatafilter;
  /**
   * States error handling and retries definitions
   */
  onErrors?: Error[];
  transition?: string | Transition;
  end: boolean | End;
  /**
   * Unique Name of a workflow state which is responsible for compensation of this state
   */
  compensatedBy?: string;
  metadata?: /* Metadata information */ Metadata;

  static builder(): Builder<Eventstate> {
    return builder<Eventstate>(Eventstate.fn);
  }

  static fromSource(value: string): Eventstate {
    return plainToClass(Eventstate, yaml.load(value));
  }

  private static fn(data: Eventstate): () => Eventstate {
    return () => {
      Object.assign(data, classToPlain(new Eventstate()));

      validate('Eventstate', data);

      return data;
    };
  }
}
