import { isObject } from './utils';

/**
 * A class used to reflect the parameter type
 * see https://stackoverflow.com/questions/54207173/classes-keyof-in-typescript/54207465#54207465
 */
export class _Reflector<T> {
  constructor(model?: Partial<T>) {
    if (isObject(model)) {
      Object.assign(this, model);
    }
  }
}
