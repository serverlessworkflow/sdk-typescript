import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
export class CorrelationDef {
  /**
   * CloudEvent Extension Context Attribute name
   */
  contextAttributeName: string;
  /**
   * CloudEvent Extension Context Attribute value
   */
  contextAttributeValue?: string;

  static builder(): Builder<CorrelationDef> {
    return builder<CorrelationDef>(CorrelationDef.fn);
  }

  static fromSource(value: string): CorrelationDef {
    return plainToClass(CorrelationDef, yaml.load(value));
  }

  private static fn(data: CorrelationDef): () => CorrelationDef {
    return () => {
      Object.assign(data, classToPlain(new CorrelationDef()));

      validate('CorrelationDef', data);

      return data;
    };
  }
}
