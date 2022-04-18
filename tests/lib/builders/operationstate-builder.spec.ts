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
import { actionBuilder, operationstateBuilder } from '../../../src';

describe('operationstateBuilder ', () => {
  it('should build an object with default values', () => {
    const object = operationstateBuilder()
      .name('StartApplication')
      .actions([actionBuilder().subFlowRef('startApplicationWorkflowId').build()])
      .build();

    expect(object.actionMode).toBe('sequential');

    const serializedObject = object.normalize();
    expect(JSON.stringify(serializedObject)).toBe(
      JSON.stringify({
        name: 'StartApplication',
        type: 'operation',
        actions: [{ subFlowRef: 'startApplicationWorkflowId' }],
        end: true,
      })
    );
  });
});
