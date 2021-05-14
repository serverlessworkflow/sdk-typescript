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
import { CronDefBuilder } from '../../src/model/cron-def.builder';

const cronExpression = '0 * * ? * *';

describe('CronDefBuilder', () => {
  it('Should create a valid object containing cron expresion', () => {
    expect(new CronDefBuilder().withCronExpresion(cronExpression).build()).toEqual(cronExpression);
  });

  it('Should create a valid object containing expression and expiration time', () => {
    const dateTimeISO8601Format = '2013-07-16T19:23:51Z';
    expect(
      new CronDefBuilder().withCronExpresion(cronExpression).withValidUntil(dateTimeISO8601Format).build()
    ).toEqual({
      expression: cronExpression,
      validUntil: dateTimeISO8601Format,
    });
  });

  it('should throws an error if cron expression is not set', () => {
    expect(() => new CronDefBuilder().build()).toThrowError();
  });
});
