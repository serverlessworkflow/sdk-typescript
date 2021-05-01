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
import {WorkflowBuilder} from "../../src";
import * as fs from "fs";
import {
	ActionBuilder, EndBuilder,
	EventBuilder,
	EventsBuilder,
	ForEachStateBuilder,
	FunctionDefBuilder,
	FunctionRefBuilder,
	ProduceEventDefBuilder,
} from '../../src';


describe("sendcloudevent workflow example", () => {
	
	
	it('should generate Workflow object', function () {
		
		const workflow = new WorkflowBuilder()
			.withId("sendcloudeventonprovision")
			.withVersion("1.0")
			.withName("Send CloudEvent on provision completion")
			.withStart("ProvisionOrdersState")
			.withEvents(
				new EventsBuilder()
					.withEvents([
						new EventBuilder()
							.withName("provisioningCompleteEvent")
							.withType("provisionCompleteType")
							.withKind("produced")
							.build(),
					
					]).build(),
			)
			.withFunctions([
				new FunctionDefBuilder()
					.withName("provisionOrderFunction")
					.withOperation("http://myapis.org/provisioning.json#doProvision")
					.build(),
			])
			.withStates([
				new ForEachStateBuilder()
					.withName("ProvisionOrdersState")
					.withInputCollection("${ .orders }")
					.withIterationParam("singleorder")
					.withOutputCollection("${ .provisionedOrders }")
					.withActions([
						new ActionBuilder()
							.withFunctionRef(
								new FunctionRefBuilder()
									.withRefName("provisionOrderFunction")
									.withArguments({
										"order": "${ .singleorder }",
									})
									.build(),
							)
							.build(),
					])
					.withEnd(
						new EndBuilder()
							.withProduceEvents([
								new ProduceEventDefBuilder()
									.withEventRef("provisioningCompleteEvent")
									.withData("${ .provisionedOrders }")
									.build(),
							])
							.build(),
					)
					.build(),
			])
			.build();
		
		
		
		
		const expected = JSON.parse(fs.readFileSync("./spec/examples/sendcloudevent.json")
			.toLocaleString()) as any;
		expect(workflow).toEqual(expected);
		
	});
	
	
});
