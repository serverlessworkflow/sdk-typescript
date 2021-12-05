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
    expect(validate('End', false));
  });

  it('should ignore "normalize" function as additionalProperty', () => {
    const functionObj = {
      name: 'function',
      operation: 'operation',
      type: 'rest',
      normalize: () => {
        //do something
      },
    };

    expect(validate('Function', functionObj)).toBeTruthy();
  });

  it('should NOT ignore additionalProperties', () => {
    const functionObj = {
      name: 'function',
      operation: 'operation',
      type: 'rest',
      keyAdditionalProperty: 'anyValue',
    };

    expect(() => validate('Function', functionObj)).toThrowError(/keyAdditionalProperty/);
  });

  it('should throws an error if validator not found', () => {
    expect(() => validate('ValidatorNotDefined', {})).toThrowError();
  });
});
