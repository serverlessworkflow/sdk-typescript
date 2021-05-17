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
import { WorkflowBuilder } from '../../src/model/workflow.builder';
import * as fs from 'fs';
import { ActionBuilder, FunctionDefBuilder, FunctionRefBuilder } from '../../src';
import { ForEachStateBuilder } from '../../src/model/for-each-state.builder';
import { StateDataFilterBuilder } from '../../src/model/state-data-filter.builder';

describe('solvemathproblems workflow example', () => {
  it('should generate Workflow object', function () {
    const workflow = new WorkflowBuilder()
      .withId('solvemathproblems')
      .withVersion('1.0')
      .withName('Solve Math Problems Workflow')
      .withDescription('Solve math problems')
      .withStart('Solve')
      .withFunctions([
        new FunctionDefBuilder()
          .withName('solveMathExpressionFunction')
          .withOperation('http://myapis.org/mapthapis.json#solveExpression')
          .build(),
      ])
      .withStates([
        new ForEachStateBuilder()
          .withName('Solve')
          .withInputCollection('${ .expressions }')
          .withIterationParam('singleexpression')
          .withOutputCollection('${ .results }')
          .withActions([
            new ActionBuilder()
              .withFunctionRef(
                new FunctionRefBuilder()
                  .withRefName('solveMathExpressionFunction')
                  .withArguments({
                    expression: '${ .singleexpression }',
                  })
                  .build()
              )
              .build(),
          ])
          .withStateDataFilter(new StateDataFilterBuilder().withOutput('${ .results }').build())
          .withEnd(true)
          .build(),
      ])
      .build();

    const expected = JSON.parse(fs.readFileSync('./spec/examples/solvemathproblems.json').toLocaleString()) as any;
    expect(workflow).toEqual(expected);
  });
});
