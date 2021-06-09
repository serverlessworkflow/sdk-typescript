import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
import { End } from './end';
import { Transition } from './transition';
export class Defaultdef /* Default definition. Can be either a transition or end definition */ {
  transition: string | Transition;
  end?: boolean | End;

  static builder(): Builder<Defaultdef> {
    return builder<Defaultdef>(Defaultdef.fn);
  }

  static fromSource(value: string): Defaultdef {
    return plainToClass(Defaultdef, yaml.load(value));
  }

  private static fn(data: Defaultdef): () => Defaultdef {
    return () => {
      Object.assign(data, classToPlain(new Defaultdef()));

      validate('Defaultdef', data);

      return data;
    };
  }
}
