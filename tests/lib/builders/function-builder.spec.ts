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
import { functionBuilder } from '../../../src/lib/builders/function-builder';

describe('functionBuilder ', () => {
  it('should build an object without default type if not set', () => {
    const fn = functionBuilder().name('function').operation('operation').build();

    expect(fn.type).toBe('rest');
  });

  it('should build an object with type= set value ', () => {
    expect(functionBuilder().name('function').operation('operation').type('expression').build().type).toBe(
      'expression'
    );
    expect(functionBuilder().name('function').operation('operation').type('rest').build().type).toBe('rest');
  });
});
