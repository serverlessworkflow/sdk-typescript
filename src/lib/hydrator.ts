import { isObject } from './utils';

/**
 * A base class used for object hydration
 */
export class ObjectHydrator<T> {
  constructor(model?: Partial<T>) {
    if (isObject(model)) {
      Object.assign(this, model);
    }
  }
}

/**
 * A base class used for array hydration
 */
export class ArrayHydrator<T> extends Array<T> {
  constructor(model?: Array<T> | number) {
    if (!isNaN(model as number)) {
      super(model as number);
    } else {
      super(...((model as Array<T>) || []));
      if (!model) {
        model = [];
      }
      if (!Array.isArray(model)) {
        throw new Error('The provided model should be an array');
      }
    }
  }
}
