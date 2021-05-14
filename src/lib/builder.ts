/**
 * Represents a builder proxy
 */
export type Builder<T> = {
  build: () => T;
} & {
  [k in keyof T]-?: (arg: T[k]) => Builder<T>;
};

/**
 * A factory for builders that proxy properties assignations and validate against schema on build
 * @param {Function} validatorFn The function used to validated and produce the object on build()
 * @returns {Builder} A builder proxy
 */
export function builder<T>(validatorFn?: (data: Partial<T>) => () => T): Builder<T> {
  const data: Partial<T> = {};
  const defaultValidatorFn =
    (data: Partial<T>): (() => T) =>
    () =>
      data as T;
  const proxy = new Proxy({} as Builder<T>, {
    get: (_, prop) => {
      if (prop === 'build') {
        return (validatorFn || defaultValidatorFn)(data);
      }
      return (value: unknown): Builder<T> => {
        (data as any)[prop.toString()] = value;
        return proxy;
      };
    },
    set: () => {
      return false;
    },
  });
  return proxy;
}
