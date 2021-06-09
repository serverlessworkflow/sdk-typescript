import { validate } from '../../lib/utils';
import { classToPlain, plainToClass } from 'class-transformer';
import { Builder, builder } from '../../lib/builder';
import * as yaml from 'js-yaml';
import { Action } from './action';
export class Branch /* Branch Definition */ {
  /**
   * Branch name
   */
  name: string;
  /**
   * Actions to be executed in this branch
   */
  actions?: Action[];
  /**
   * Unique Id of a workflow to be executed in this branch
   */
  workflowId: string;

  static builder(): Builder<Branch> {
    return builder<Branch>(Branch.fn);
  }

  static fromSource(value: string): Branch {
    return plainToClass(Branch, yaml.load(value));
  }

  private static fn(data: Branch): () => Branch {
    return () => {
      Object.assign(data, classToPlain(new Branch()));

      validate('Branch', data);

      return data;
    };
  }
}
