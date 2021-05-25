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
import {PocInjectstate} from '../../src/poc/poc-injectstate';

describe('PocInjectstate', () => {
	
	it('generate object from string', () => {
		let value = {
			"name": "Hello State",
			"id": "test",
			"data": {
				"result": "Hello World!",
			},
			"type": "inject",
		};
		
		
		const test = PocInjectstate.fromString(JSON.stringify(value));
		
		
		const expected = {
			"type": "inject",
			"usedForCompensation":false,
			"name": "Hello State",
			"id": "test",
			"data": {
				"result": "Hello World!",
			},
		};
		
		expect(JSON.stringify(test)).toEqual(
			JSON.stringify(expected)
		);
	});
});
