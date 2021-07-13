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

import { validate } from '../../src/lib/utils';

describe('validate', () => {
  it('should throw an error containing the provided data', () => {
    expect(() => validate('End', 'any text')).toThrowError(/any text/);
  });

  it('should return true for valid objects', () => {
    expect(validate('End', false)).toBeTruthy('Expected function validate to return true for valid objects');
  });
});
