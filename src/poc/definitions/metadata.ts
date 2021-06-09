import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
export class Metadata {
  [name: string]: string;

  static builder(): Builder<Metadata> {
    return builder<Metadata>(Metadata.fn);
  }

  static fromSource(value: string): Metadata {
    return plainToClass(Metadata, yaml.load(value));
  }

  private static fn(data: Metadata): () => Metadata {
    return () => {
      Object.assign(data, classToPlain(new Metadata()));

      validate('Metadata', data);

      return data;
    };
  }
}
