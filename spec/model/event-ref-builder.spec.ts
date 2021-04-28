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
import {EventRefBuilder} from '../../src/model/event-ref.builder';


describe("event ref builder", () => {
	
	
	it("should create an object with the required fields ", () => {
		
		expect(new EventRefBuilder()
			.withResultEventRef("resultValue")
			.withTriggerEventRef("triggerValue")
			.build()).toEqual(
			{resultEventRef: "resultValue", triggerEventRef: 'triggerValue'},
		);
		
	});
	
	
	it("should create an object with all possible fields ", () => {
		
		expect(new EventRefBuilder()
			.withResultEventRef("resultValue")
			.withTriggerEventRef("triggerValue")
			.withContextAttributes({key: "valuect"})
			.withData({key: "valuedata"})
			.build()).toEqual(
			{
				resultEventRef: "resultValue",
				triggerEventRef: 'triggerValue',
				contextAttributes: {key: "valuect"},
				data: {key: "valuedata"},
			},
		);
	});
	
	
	it("should throws an error if mandatory fields are not set ", () => {
		
		expect(() => new EventRefBuilder().build()).toThrowError();
		
		expect(() => new EventRefBuilder()
			.withResultEventRef("").build())
			.toThrowError();
		
		expect(() => new EventRefBuilder()
			.withTriggerEventRef("")
			.build()).toThrowError();
		
	});
	
});
