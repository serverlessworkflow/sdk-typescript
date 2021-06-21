/*
 * Copyright 2021-Present The Serverless Workflow Specification Authors
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { Crondef } from './crondef';
import { overwriteCronValueIfObject } from './utils';

export class Schedule {
  constructor(model: any) {
    Object.assign(this, model);

    overwriteCronValueIfObject(this);
  }

  /**
   * Time interval (must be repeating interval) described with ISO 8601 format. Declares when workflow instances will be automatically created.
   */
  interval?: string;
  cron?: string | Crondef;
  /**
   * Timezone name used to evaluate the interval & cron-expression. (default: UTC)
   */
  timezone?: string;
}
