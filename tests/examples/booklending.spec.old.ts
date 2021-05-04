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
import * as fs from 'fs';
import {
	ActionBuilder,
	DatabasedSwitchBuilder,
	EventsBuilder,
	OperationStateBuilder,
	TransitionDataConditionBuilder,
	WorkflowBuilder,
} from '../../src';
import {StartBuilder} from "../../src";
import {EventStateBuilder} from "../../src";
import {OnEventBuilder} from "../../src";
import {FunctionRefBuilder} from "../../src";
import {FunctionsBuilder} from "../../src";
import {EventBasedSwitchBuilder} from "../../src";
import {TransitionEventConditionBuilder} from "../../src";
import {DelayStateBuilder} from "../../src";


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
				new DatabasedSwitchBuilder()
					.withName("Book Status Decision")
					.withDataConditions([
						new TransitionDataConditionBuilder()
							.withName("Book is on loan")
							.withCondition("${ .book.status == \"onloan\" }")
							.withTransition("Report Status To Lender")
							.build(),
						new TransitionDataConditionBuilder()
							.withName("Check is available")
							.withCondition("${ .book.status == \"available\" }")
							.withTransition("Check Out Book")
							.build(),
					])
					.build(),
				new OperationStateBuilder()
					.withName("Report Status To Lender")
					.withActions([
						new ActionBuilder()
							.withFunctionRef(new FunctionRefBuilder()
								.withRefName("Send status to lender")
								.withArguments({
									"bookid": "${ .book.id }",
									"message": "Book ${ .book.title } is already on loan",
								})
								.build())
							.build(),
					])
					.withTransition("Wait for Lender response")
					.build(),
				new EventBasedSwitchBuilder()
					.withName("Wait for Lender response")
					.withEventConditions([
						new TransitionEventConditionBuilder()
							.withName("Hold Book")
							.withEventRef("Hold Book Event")
							.withTransition("Request Hold")
							.build(),
						new TransitionEventConditionBuilder()
							.withName("Decline Book Hold")
							.withEventRef("Decline Hold Event")
							.withTransition("Cancel Request")
							.build(),
					])
					.build(),
				new OperationStateBuilder()
					.withName("Request Hold")
					.withActions([
						new ActionBuilder().withFunctionRef(
							new FunctionRefBuilder()
								.withRefName("Request hold for lender")
								.withArguments({
									"bookid": "${ .book.id }",
									"lender": "${ .lender }",
								}).build()).build(),
					])
					.withTransition("Wait two weeks")
					.build(),
				new DelayStateBuilder()
					.withName("Wait two weeks")
					.withTimeDelay("PT2W")
					.withTransition("Get Book Status")
					.build(),
				new OperationStateBuilder()
					.withName("Check Out Book")
					.withActions([
						new ActionBuilder()
							.withFunctionRef(
								new FunctionRefBuilder()
									.withRefName("Check out book with id")
									.withArguments({
										"bookid": "${ .book.id }",
									})
									.build())
							.build(),
						new ActionBuilder()
							.withFunctionRef(
								new FunctionRefBuilder()
									.withRefName("Notify Lender for checkout")
									.withArguments({
										"bookid": "${ .book.id }",
										"lender": "${ .lender }",
									})
									.build())
							.build(),
					
					])
					.withEnd(true)
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
