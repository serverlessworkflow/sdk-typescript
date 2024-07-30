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
 * Represents the possible lifecycle hooks of an instance
 */
export type LifecycleHook = {
  /**
   * The hook called at the end of the constructor
   * @param instance The instance being initialized
   */
  constructor?: <T>(instance: T) => void;
  /**
   * The hook called before the validation
   * @param instance A copy instance being validated
   */
  preValidation?: <T>(instance: T) => void;
  /**
   * The hook called after the validation
   * @param instance A copy instance being validated
   */
  postValidation?: <T>(instance: T) => void;
  /**
   * The hook called to normalized the instance
   * @param instance A copy of the instance to normalize
   * @returns The normalized instance
   */
  normalize?: <T>(instance: T) => T;
};

/**
 * A mapping of type names and their lifecycle hooks
 */
const registeredHooks: Map<string, LifecycleHook> = new Map<string, LifecycleHook>();

/**
 * Gets the lifecylce hook for the provided type, if any
 * @param typeName The type to get the lifecycle hook for
 * @returns The lifecycle hook, if any
 */
export const getLifecycleHook = (typeName: string): LifecycleHook | undefined => {
  return registeredHooks.get(typeName);
};
