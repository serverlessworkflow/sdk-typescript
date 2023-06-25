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
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export class Retrydef {
  /**
   * Unique retry strategy name
   */
  name: string;
  /**
   * Time delay between retry attempts (ISO 8601 duration format)
   */
  delay?: string;
  /**
   * Maximum time delay between retry attempts (ISO 8601 duration format)
   */
  maxDelay?: string;
  /**
   * Static value by which the delay increases during each attempt (ISO 8601 time format)
   */
  increment?: string;
  /**
   * Numeric value, if specified the delay between retries is multiplied by this value.
   */
  multiplier?: number | string;
  /**
   * Maximum number of retry attempts.
   */
  maxAttempts: number | string;
  /**
   * If float type, maximum amount of random time added or subtracted from the delay between each retry relative to total delay (between 0 and 1). If string type, absolute maximum amount of random time added or subtracted from the delay between each retry (ISO 8601 duration format)
   */
  jitter?: number | string;

  constructor(model: any) {
    Object.assign(this, model);
  }

  /**
   * Normalize the value of each property by recursively deleting properties whose value is equal to its default value. Does not modify the object state.
   * @returns {Specification.Retrydef} without deleted properties.
   */
  normalize = (): Retrydef => {
    const clone = new Retrydef(this);
    return clone;
  };
}
