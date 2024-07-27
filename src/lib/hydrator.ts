import { isObject } from './utils';

/**
 * A base class used for hydration
 */
export class Hydrator<T> {
  constructor(model?: Partial<T>) {
    if (isObject(model)) {
      Object.assign(this, model);
    }
  }
}
