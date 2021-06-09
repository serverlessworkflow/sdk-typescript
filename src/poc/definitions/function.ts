import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
import 'es6-shim';
import 'reflect-metadata';
import { Expose, Transform } from 'class-transformer';
export class Function {
  /**
   * Unique function name
   */
  name: string;
  /**
   * If type is `rest`, <path_to_openapi_definition>#<operation_id>. If type is `rpc`, <path_to_grpc_proto_file>#<service_name>#<service_method>. If type is `expression`, defines the workflow expression.
   */
  operation: string;
  /**
   * Defines the function type. Is either `rest`, `rpc` or `expression`. Default is `rest`
   */
  @Transform(() => 'rest', { toClassOnly: true })
  @Expose({ name: 'type' })
  type?: 'rest' | 'rpc' | 'expression';

  static builder(): Builder<Function> {
    return builder<Function>(Function.fn);
  }

  static fromSource(value: string): Function {
    return plainToClass(Function, yaml.load(value));
  }

  private static fn(data: Function): () => Function {
    return () => {
      Object.assign(data, classToPlain(new Function()));

      validate('Function', data);

      return data;
    };
  }
}
