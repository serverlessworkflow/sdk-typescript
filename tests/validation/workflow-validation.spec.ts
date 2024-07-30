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
import { Classes } from '../../src/lib/generated/classes';
import { validate } from '../../src/lib/validation';

describe('Workflow validation', () => {
  it('should be invalid', () => {
    const workflow = new Classes.Workflow();
    const test = () => validate('Workflow', workflow);
    expect(test).toThrow(Error);
    expect(test).toThrow(/'Workflow' is invalid/);
  });
});
