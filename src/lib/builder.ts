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
 * Represents a fluent builder proxy
 */
export type Builder<T> = {
  build: (validate?: boolean) => T;
} & {
  [K in keyof T]-?: (arg: T[K]) => Builder<T>;
};

/**
 * The default function used to build an object, basically just return the provided object
 * @param data The object to "build"
 * @returns
 */
function defaultBuildingFn<T>(data: Partial<T>): T {
  return data as T;
}

/**
 * A factory for fluent builders that proxy properties assignations and can validate against schema on build()
 * @param {Function} buildingFn The function used to validate and produce the object on build()
 * @returns {Builder} A fluent builder
 */
export function builder<T>(buildingFn?: (data: Partial<T>) => T): Builder<T> {
  const data: Partial<T> = {};
  const proxy = new Proxy({} as Builder<T>, {
    get: (_, prop) => {
      if (prop === 'build') {
        return (validate: boolean = true) => (validate ? (buildingFn || defaultBuildingFn)(data) : data);
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
