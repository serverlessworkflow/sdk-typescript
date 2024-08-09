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
import * as fs from 'fs';
import {
  actionBuilder,
  foreachstateBuilder,
  functionBuilder,
  functionrefBuilder,
  statedatafilterBuilder,
  workflowBuilder,
} from '../../src';

describe('solvemathproblems workflow example', () => {
  it('should generate Workflow object', function () {
    const workflow = workflowBuilder()
      .id('solvemathproblems')
      .version('1.0.0')
      .specVersion('0.9')
      .name('Solve Math Problems Workflow')
      .description('Solve math problems')
      .start('Solve')
      .functions([
        functionBuilder()
          .name('solveMathExpressionFunction')
          .operation('http://myapis.org/mapthapis.json#solveExpression')
          .build(),
      ])
      .states([
        foreachstateBuilder()
          .name('Solve')
          .inputCollection('${ .expressions }')
          .iterationParam('singleexpression')
          .outputCollection('${ .results }')
          .actions([
            actionBuilder()
              .functionRef(
                functionrefBuilder()
                  .refName('solveMathExpressionFunction')
                  .arguments({
                    expression: '${ .singleexpression }',
                  })
                  .build()
              )
              .build(),
          ])
          .stateDataFilter(statedatafilterBuilder().output('${ .results }').build())
          .build(),
      ])
      .build();

    const expected = JSON.parse(fs.readFileSync('./tests/examples/solvemathproblems.json', 'utf8'));
    expect(JSON.stringify(workflow.normalize())).toEqual(JSON.stringify(expected));
  });
});
