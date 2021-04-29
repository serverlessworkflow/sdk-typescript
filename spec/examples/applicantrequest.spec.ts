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
import {WorkflowBuilder} from "../../src/model/workflow.builder";
import * as fs from "fs";
import {FunctionDefBuilder} from "../../src/model/function-def.builder";
import {DatabasedSwitchBuilder} from "../../src/model/databased-switch.builder";
import {TransitionDataConditionBuilder} from "../../src/model/transition-data-condition.builder";
import {OperationStateBuilder} from "../../src/model/operation-state.builder";
import {SubFlowStateBuilder} from "../../src/model/sub-flow-state.builder";
import {ActionBuilder} from "../../src/model/action.builder";
import {DefaultTransitionTypeBuilder} from "../../src/model/default-transition-type.builder";
import {FunctionRefBuilder} from '../../src/model/function-ref.builder';


describe("applicationrequest workflow example", () => {
	
	
	it('should generate Workflow object', function () {
		
		const workflow = new WorkflowBuilder()
			.withId("applicantrequest")
			.withVersion("1.0")
			.withName("Applicant Request Decision Workflow")
			.withDescription("Determine if applicant request is valid")
			.withStart("CheckApplication")
			.withFunctions([new FunctionDefBuilder()
				.withName("sendRejectionEmailFunction")
				.withOperation("http://myapis.org/applicationapi.json#emailRejection")
				.build()])
			.withStates([
				new DatabasedSwitchBuilder()
					.withName("CheckApplication")
					.withDataConditions(
						[new TransitionDataConditionBuilder()
							.withCondition("${ .applicants | .age >= 18 }")
							.withTransition("StartApplication")
							.build(),
							new TransitionDataConditionBuilder()
								.withCondition("${ .applicants | .age < 18 }")
								.withTransition("RejectApplication")
								.build()])
					.withDefault(new DefaultTransitionTypeBuilder()
						.withTransition(
							"RejectApplication",
						).build())
					.build(),
				new SubFlowStateBuilder().withName("StartApplication")
					.withWorkflowId("startApplicationWorkflowId")
					.withEnd(true)
					.build(),
				new OperationStateBuilder()
					.withName("RejectApplication")
					.withActionMode("sequential")
					.withEnd(true)
					.withActions([
						new ActionBuilder().withFunctionRef(
							new FunctionRefBuilder()
								.withRefName("sendRejectionEmailFunction")
								.withArguments({applicant: '${ .applicant }'})
								.build(),
						)
							.build(),
					])
					.build(),
			])
			.build();
		
		
		const expected = JSON.parse(fs.readFileSync("./spec/examples/applicantrequest.json")
			.toLocaleString()) as any;
		expect(workflow).toEqual(expected);
		
	});
	
	
});
