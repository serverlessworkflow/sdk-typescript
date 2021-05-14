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
import { ProduceEventDefBuilder } from '../../src/model/produce-event-def.builder';

describe('ProduceEventDefBuilder', () => {
  it('should throws an error if mandatory fields are not set ', () => {
    expect(() => new ProduceEventDefBuilder().build()).toThrowError();

    expect(() => new ProduceEventDefBuilder().withEventRef('').build()).toThrowError();
  });

  it('should build a valid ProduceEventDef object ', () => {
    expect(
      new ProduceEventDefBuilder()
        .withEventRef('ConfirmationCompletedEvent')
        .withData('${ .payment }')
        .withContextAttributes({
          kContext: 'kcValue',
        })
        .build()
    ).toEqual({
      eventRef: 'ConfirmationCompletedEvent',
      data: '${ .payment }',
      contextAttributes: {
        kContext: 'kcValue',
      },
    });
  });
});
