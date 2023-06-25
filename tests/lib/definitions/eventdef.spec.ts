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

import { Eventdef } from '../../../src/lib/definitions/eventdef';

describe('Eventdef ', () => {
  it('should convert non-primitive properties to the desired class', () => {
    const data = {
      correlation: [{ contextAttributeName: 'contextAttributeName' }],
      metadata: { key: 'value' },
    };

    const model = new Eventdef(data);

    expect(model.correlation![0].constructor.name).toBe('CorrelationDef');
    expect(model.metadata!.constructor.name).toBe('Metadata');
  });
});
