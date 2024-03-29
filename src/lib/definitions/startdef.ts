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
import { Schedule } from './schedule';
import { overwriteSchedule } from './utils';

export class Startdef {
  /**
   * Name of the starting workflow state
   */
  stateName?: string;
  /**
   * Define the time/repeating intervals or cron at which workflow instances should be automatically started.
   */
  schedule: string | Schedule;

  constructor(model: any) {
    Object.assign(this, model);

    overwriteSchedule(this);
  }

  /**
   * Normalize the value of each property by recursively deleting properties whose value is equal to its default value. Does not modify the object state.
   * @returns {Specification.Startdef} without deleted properties.
   */
  normalize = (): Startdef => {
    const clone = new Startdef(this);
    return clone;
  };
}
