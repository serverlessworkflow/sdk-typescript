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
import * as fs from 'fs';
import { actionBuilder, branchBuilder, parallelstateBuilder, workflowBuilder } from '../../src';

describe('parallel workflow example', () => {
  it('should generate Workflow object', function () {
    const workflow = workflowBuilder()
      .id('parallelexec')
      .version('1.0.0')
      .specVersion('0.8')
      .name('Parallel Execution Workflow')
      .description('Executes two branches in parallel')
      .start('ParallelExec')
      .states([
        parallelstateBuilder()
          .name('ParallelExec')
          .completionType('allOf')
          .branches([
            branchBuilder()
              .name('ShortDelayBranch')
              .actions([actionBuilder().subFlowRef('shortdelayworkflowid').build()])
              .build(),
            branchBuilder()
              .name('LongDelayBranch')
              .actions([actionBuilder().subFlowRef('longdelayworkflowid').build()])
              .build(),
          ])
          .build(),
      ])
      .build();

    const expected = JSON.parse(fs.readFileSync('./tests/examples/parallel.json', 'utf8'));
    expect(JSON.stringify(workflow.normalize())).toEqual(JSON.stringify(expected));
  });
});
