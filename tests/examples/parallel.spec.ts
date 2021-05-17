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
import * as fs from 'fs';
import {branchBuilder, parallelstateBuilder, workflowBuilder} from '../../src';


describe("parallel workflow example", () => {
	
	
	it('should generate Workflow object', function () {
		
		const workflow = workflowBuilder()
			.id("parallelexec")
			.version("1.0")
			.name("Parallel Execution Workflow")
			.description("Executes two branches in parallel")
			.start("ParallelExec")
			.states([
				parallelstateBuilder()
					.name("ParallelExec")
					.completionType("and")
					.branches([
						branchBuilder()
							.name("ShortDelayBranch")
							.workflowId("shortdelayworkflowid")
							.build(),
						branchBuilder()
							.name("LongDelayBranch")
							.workflowId("longdelayworkflowid")
							.build(),
					])
					.end(true)
					.build(),
			])
			.build();
		
		
		const expected = JSON.parse(fs.readFileSync("./tests/examples/parallel.json")
			.toLocaleString()) as any;
		expect(workflow).toEqual(expected);
		
	});
	
	
});
