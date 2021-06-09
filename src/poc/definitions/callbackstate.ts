import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
import 'es6-shim';
import 'reflect-metadata';
import { Expose, Transform } from 'class-transformer';
import { Action } from './action';
import { End } from './end';
import { Error } from './error';
import { Eventdatafilter } from './eventdatafilter';
import { Metadata } from './metadata';
import { Statedatafilter } from './statedatafilter';
import { Transition } from './transition';
export class Callbackstate {
  /**
   * Unique state id
   */
  id?: string;
  /**
   * State name
   */
  name?: string;
  /**
   * State type
   */
  @Transform(() => 'callback', {})
  @Expose({ name: 'type' })
  type?: 'callback';
  /**
   * Defines the action to be executed
   */
  action?: Action;
  /**
   * References an unique callback event name in the defined workflow events
   */
  eventRef?: string;
  /**
   * Time period to wait for incoming events (ISO 8601 format)
   */
  timeout?: string;
  /**
   * Event data filter
   */
  eventDataFilter?: Eventdatafilter;
  /**
   * State data filter
   */
  stateDataFilter?: Statedatafilter;
  /**
   * States error handling and retries definitions
   */
  onErrors?: Error[];
  /**
   * Next transition of the workflow after all the actions have been performed
   */
  transition?: string | Transition;
  /**
   * State end definition
   */
  end?: boolean | End;
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

  static builder(): Builder<Callbackstate> {
    return builder<Callbackstate>(Callbackstate.fn);
  }

  static fromSource(value: string): Callbackstate {
    return plainToClass(Callbackstate, yaml.load(value));
  }

  private static fn(data: Callbackstate): () => Callbackstate {
    return () => {
      Object.assign(data, classToPlain(new Callbackstate()));

      validate('Callbackstate', data);

      return data;
    };
  }
}
