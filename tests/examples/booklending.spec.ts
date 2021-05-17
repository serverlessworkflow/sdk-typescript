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
 * oUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import * as fs from 'fs';
import {
  actionBuilder,
  databasedswitchBuilder,
  delaystateBuilder,
  eventbasedswitchBuilder,
  eventstateBuilder,
  oneventsBuilder,
  operationstateBuilder,
  transitiondataconditionBuilder,
  transitioneventconditionBuilder,
  workflowBuilder,
} from '../../src';

describe('booklending workflow example', () => {
  it('should generate Workflow object', function () {
    const workflow = workflowBuilder()
      .id('booklending')
      .name('Book Lending Workflow')
      .version('1.0')
      .start('Book Lending Request')
      .states([
        eventstateBuilder()
          .name('Book Lending Request')
          .onEvents([oneventsBuilder().eventRefs(['Book Lending Request Event']).build()])
          .transition('Get Book Status')
          .build(),
        operationstateBuilder()
          .name('Get Book Status')
          .actions([
            actionBuilder()
              .functionRef({
                refName: 'Get status for book',
                arguments: {
                  bookid: '${ .book.id }',
                },
              })
              .build(),
          ])
          .transition('Book Status Decision')
          .build(),
        databasedswitchBuilder()
          .name('Book Status Decision')
          .dataConditions([
            transitiondataconditionBuilder()
              .name('Book is on loan')
              .condition('${ .book.status == "onloan" }')
              .transition('Report Status To Lender')
              .build(),
            transitiondataconditionBuilder()
              .name('Check is available')
              .condition('${ .book.status == "available" }')
              .transition('Check Out Book')
              .build(),
          ])
          .build(),
        operationstateBuilder()
          .name('Report Status To Lender')
          .actions([
            actionBuilder()
              .functionRef({
                refName: 'Send status to lender',
                arguments: {
                  bookid: '${ .book.id }',
                  message: 'Book ${ .book.title } is already on loan',
                },
              })
              .build(),
          ])
          .transition('Wait for Lender response')
          .build(),
        eventbasedswitchBuilder()
          .name('Wait for Lender response')
          .eventConditions([
            transitioneventconditionBuilder()
              .name('Hold Book')
              .eventRef('Hold Book Event')
              .transition('Request Hold')
              .build(),
            transitioneventconditionBuilder()
              .name('Decline Book Hold')
              .eventRef('Decline Hold Event')
              .transition('Cancel Request')
              .build(),
          ])
          .build(),
        operationstateBuilder()
          .name('Request Hold')
          .actions([
            actionBuilder()
              .functionRef({
                refName: 'Request hold for lender',
                arguments: {
                  bookid: '${ .book.id }',
                  lender: '${ .lender }',
                },
              })
              .build(),
          ])
          .transition('Wait two weeks')
          .build(),
        delaystateBuilder().name('Wait two weeks').timeDelay('PT2W').transition('Get Book Status').build(),
        operationstateBuilder()
          .name('Check Out Book')
          .actions([
            actionBuilder()
              .functionRef({
                refName: 'Check out book with id',
                arguments: {
                  bookid: '${ .book.id }',
                },
              })
              .build(),
            actionBuilder()
              .functionRef({
                refName: 'Notify Lender for checkout',
                arguments: {
                  bookid: '${ .book.id }',
                  lender: '${ .lender }',
                },
              })
              .build(),
          ])
          .end(true)
          .build(),
      ])
      .functions('file://books/lending/functions.json')
      .events('file://books/lending/events.json');

    const expected = JSON.parse(fs.readFileSync('./tests/examples/booklending.json').toLocaleString()) as any;
    expect(workflow).toEqual(expected);
  });
});
