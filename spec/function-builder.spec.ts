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

import {FunctionBuilder} from '../src';


describe("FunctionBuilder", () => {
	
	
	it("should throws an error if mandatory fields are not set ", () => {
		
		expect(() => new FunctionBuilder().build()).toThrowError();
		
		expect(() => new FunctionBuilder()
			.withName("")
			.withOperation("")
			.build())
			.toThrowError();
		
		expect(() => new FunctionBuilder()
			.withOperation("http://myapis.org/applicationapi.json#emailRejection")
			.build())
			.toThrowError();
		
		expect(() => new FunctionBuilder()
			.withName("functionName")
			.build())
			.toThrowError();
	});
	
	
	it("should generate a populated object with default type value", () => {
		expect(new FunctionBuilder()
			.withName("functionName")
			.withOperation("http://myapis.org/applicationapi.json#emailRejection")
			.build()).toEqual(
			{
				name: "functionName",
				operation: "http://myapis.org/applicationapi.json#emailRejection",
				type: "rest",
			},
		);
		
	});
	
	it("should generate a populated object with default type value", () => {
		expect(new FunctionBuilder()
			.withName("functionName")
			.withOperation("file#serviceName#method")
			.withType("rpc")
			.build()).toEqual(
			{
				name: "functionName",
				operation: "file#serviceName#method",
				type: "rpc",
			},
		);
		
	});
	
});


