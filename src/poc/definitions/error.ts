import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
import { End } from './end';
import { Transition } from './transition';
export class Error {
  /**
   * Domain-specific error name, or '*' to indicate all possible errors
   */
  error: string;
  /**
   * Error code. Can be used in addition to the name to help runtimes resolve to technical errors/exceptions. Should not be defined if error is set to '*'
   */
  code?: string;
  /**
   * References a unique name of a retry definition.
   */
  retryRef?: string;
  transition: string | Transition;
  end?: boolean | End;

  static builder(): Builder<Error> {
    return builder<Error>(Error.fn);
  }

  static fromSource(value: string): Error {
    return plainToClass(Error, yaml.load(value));
  }

  private static fn(data: Error): () => Error {
    return () => {
      Object.assign(data, classToPlain(new Error()));

      validate('Error', data);

      return data;
    };
  }
}
