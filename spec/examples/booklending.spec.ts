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
import {ActionBuilder, EventsBuilder, OperationStateBuilder, WorkflowBuilder} from '../../src';
import * as fs from 'fs';
import {StartBuilder} from '../../src/model/start.builder';
import {EventStateBuilder} from '../../src/model/event-state.builder';
import {OnEventBuilder} from '../../src/model/on-event.builder';
import {FunctionRefBuilder} from '../../src/model/function-ref.builder';
import {FunctionsBuilder} from '../../src/model/functions.builder';


describe("booklending workflow example", () => {
	
	
	it('should generate Workflow object', function () {
		
		const workflow = new WorkflowBuilder()
			.withId("booklending")
			.withName("Book Lending Workflow")
			.withVersion("1.0")
			.withStart(new StartBuilder()
				.withName("Book Lending Request")
				.build())
			.withStates([
				new EventStateBuilder()
					.withName("Book Lending Request")
					.withOnEvents([
						new OnEventBuilder()
							.withEventsRef(["Book Lending Request Event"])
							.build(),
					])
					.withTransition("Get Book Status")
					.build(),
				new OperationStateBuilder()
					.withName("Get Book Status")
					.withActions([
						new ActionBuilder().withFunctionRef(
							new FunctionRefBuilder()
								.withRefName("Get status for book")
								.withArguments({
									"bookid": "${ .book.id }",
								})
								.build(),
						).build(),
					])
					.withTransition("Book Status Decision")
					.build(),
			])
			.withFunctions(new FunctionsBuilder()
				.withURIDefinition("file://books/lending/functions.json")
				.build())
			.withEvents(new EventsBuilder()
				.withURIDefinition("file://books/lending/events.json")
				.build())
			.build();
		
		const expected = JSON.parse(fs.readFileSync("./spec/examples/booklending.json")
			.toLocaleString()) as any;
		expect(workflow).toEqual(expected);
		
	});
	
	
});
