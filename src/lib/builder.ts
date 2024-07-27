/*
 * Copyright 2021-Present The Serverless Workflow Specification Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * oUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

/**
 * Represents a fluent builder proxy for an object
 */
export type Builder<T> = {
  build: (validate?: boolean) => T;
} & {
  [K in keyof T]-?: (arg: T[K]) => Builder<T>;
};

/**
 * Represents a fluent builder proxy for an array
 */
export type ArrayBuilder<T> = {
  push: (item: T) => ArrayBuilder<T>;
  build: (validate?: boolean) => Array<T>;
};

/**
 * The default function used to build an object, basically just return the provided object
 * @param model The object to "build"
 * @returns
 */
function defaultBuildingFn<T>(model: Partial<T>): T {
  return model as T;
}

/**
 * A factory for fluent builders that proxy properties assignations and can validate against schema on build()
 * @param buildingFn The function used to validate and produce the object on build()
 * @returns A fluent builder
 */
export function builder<T>(
  model: Partial<T> = {},
  buildingFn: (data: Partial<T>) => T = defaultBuildingFn,
): Builder<T> {
  const proxy = new Proxy({} as Builder<T>, {
    get: (_, prop) => {
      if (prop === 'build') {
        return (validate: boolean = true) => (validate ? buildingFn(model) : model);
      }
      return (value: unknown): Builder<T> => {
        (model as any)[prop.toString()] = value;
        return proxy;
      };
    },
    set: () => {
      return false;
    },
  });
  return proxy;
}

/**
 * A factory for fluent builders that proxy properties assignations and can validate against schema on build()
 * @param buildingFn The function used to validate and produce the object on build()
 * @returns A fluent builder
 */
export function arrayBuilder<T>(
  model: Array<T> = [],
  buildingFn: (data: Array<T>) => Array<T> = defaultBuildingFn,
): ArrayBuilder<T> {
  if (model != null && !Array.isArray(model)) {
    throw new Error(`The provided model should be an array`);
  }
  const proxy = new Proxy({} as ArrayBuilder<T>, {
    get: (_, prop) => {
      if (prop === 'build') {
        return (validate: boolean = true) => (validate ? buildingFn(model) : model);
      }
      if (prop === 'push') {
        return (value: T): ArrayBuilder<T> => {
          model.push(value);
          return proxy;
        };
      }
    },
    set: () => {
      return false;
    },
  });
  return proxy;
}
