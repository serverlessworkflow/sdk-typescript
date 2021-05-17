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
import { MetadataBuilder } from '../../src/model/metadata.builder';

describe('MetadataBuilder', () => {
  it('should create an empty object ', () => {
    expect(new MetadataBuilder().build()).toEqual({});
  });

  it('should create an object with key/value strings ', () => {
    expect(new MetadataBuilder().withKeyValue('k1', 'v1').build()).toEqual({
      k1: 'v1',
    });

    expect(new MetadataBuilder().withKeyValue('k2', 'v2').withKeyValue('k3', 'v3').build()).toEqual({
      k2: 'v2',
      k3: 'v3',
    });
  });

  it('should allow to overwrite pairs of key/value  ', () => {
    expect(new MetadataBuilder().withKeyValue('k1', 'v1').withKeyValue('k1', 'v2').build()).toEqual({
      k1: 'v2',
    });
  });
});
