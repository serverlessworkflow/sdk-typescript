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
 *
 */

import { Schedule } from '../../../src/lib/definitions/schedule';

describe('schedule ', () => {
  it('should convert non-primitive properties to the desired class', () => {
    const data: Schedule = {
      cron: { expression: '* * * ? * *' },
    };

    const model = new Schedule(data);
    expect(model.cron!.constructor.name).toBe('Crondef');
  });

  it('should not convert primitive properties', () => {
    const data: Schedule = {
      cron: '* * * ? * *',
    };

    const model = new Schedule(data);
    expect(typeof model.cron).toBe(typeof '');
  });
});
