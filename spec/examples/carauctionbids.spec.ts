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
import {ActionBuilder, FunctionDefBuilder, WorkflowBuilder} from '../../src';
import * as fs from 'fs';
import {StartBuilder} from '../../src/model/start.builder';
import {EventsBuilder} from '../../src/model/events.builder';
import {EventBuilder} from '../../src/model/event.builder';
import {EventStateBuilder} from '../../src/model/event-state.builder';
import {OnEventBuilder} from '../../src/model/on-event.builder';
import {FunctionRefBuilder} from '../../src/model/function-ref.builder';

describe("carauctionbids workflow example", () => {
	
	
	it('should generate Workflow object', function () {
		
		const workflow = new WorkflowBuilder()
			.withId("handleCarAuctionBid")
			.withVersion("1.0")
			.withName("Car Auction Bidding Workflow")
			.withDescription("Store a single bid whole the car auction is active")
			.withStart(new StartBuilder()
				.withName("StoreCarAuctionBid")
				.withSchedule("2020-03-20T09:00:00Z/2020-03-20T15:00:00Z").build())
			.withFunctions([new FunctionDefBuilder()
				.withName("StoreBidFunction")
				.withOperation("http://myapis.org/carauctionapi.json#storeBid")
				.build()])
			.withEvents(new EventsBuilder().withEvents(
				[new EventBuilder()
					.withName("CarBidEvent")
					.withType("carBidMadeType")
					.withSource("carBidEventSource")
					.build()],
			).build())
			.withStates([
				new EventStateBuilder()
					.withName("StoreCarAuctionBid")
					.withExclusive(true)
					.withOnEvents([
						new OnEventBuilder()
							.withEventsRef(["CarBidEvent"])
							.withActions([
								new ActionBuilder().withFunctionRef(
									new FunctionRefBuilder()
										.withRefName("StoreBidFunction")
										.withArguments({
											"bid": "${ .bid }",
										})
										.build()).build(),
							]).build(),
					])
					.withEnd(true)
					.build(),
			])
			.build();
		
		
		const expected = JSON.parse(fs.readFileSync("./spec/examples/carauctionbids.json")
			.toLocaleString()) as any;
		expect(workflow).toEqual(expected);
		
	});
	
	
});
