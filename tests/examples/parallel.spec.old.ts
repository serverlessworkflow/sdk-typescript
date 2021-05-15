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
import * as fs from "fs";
import {BranchBuilder, ParallelStateBuilder, WorkflowBuilder} from '../../src';


describe("parallel workflow example", () => {
	
	
	it('should generate Workflow object', function () {
		
		const workflow = workflowBuilder()
			.withId("parallelexec")
			.withVersion("1.0")
			.withName("Parallel Execution Workflow")
			.withDescription("Executes two branches in parallel")
			.withStart("ParallelExec")
			.withStates([
				new ParallelStateBuilder()
					.withName("ParallelExec")
					.withCompletionType("and")
					.withBranches([
						new BranchBuilder()
							.withName("ShortDelayBranch")
							.withWorkflowId("shortdelayworkflowid")
							.build(),
						new BranchBuilder()
							.withName("LongDelayBranch")
							.withWorkflowId("longdelayworkflowid")
							.build(),
					])
					.withEnd(true)
					.build(),
			])
			.build();
		
		
		const expected = JSON.parse(fs.readFileSync("./tests/examples/parallel.json")
			.toLocaleString()) as any;
		expect(workflow).toEqual(expected);
		
	});
	
	
});
