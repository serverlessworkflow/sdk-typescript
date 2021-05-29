import * as fs from 'fs';
import {PocDatabasedswitch} from '../../src/poc/poc-databasedswitch';
import {PocFunction} from '../../src/poc/poc-function';

import {PocWorkflow} from '../../src/poc/poc-workflow';
import {PocTransitiondatacondition} from '../../src/poc/poc-transitiondatacondition';
import {PocDefaultdef} from '../../src/poc/poc-defaultdef';
import {PocSubflowstate} from '../../src/poc/poc-subflowstate';
import {PocOperationstate} from '../../src/poc/poc-operationstate';
import {PocAction} from '../../src/poc/poc-action';
import {Subflowstate} from '../../src/lib/definitions/workflow';

describe('applicationrequest workflow example', () => {
	it('should generate Workflow object', function () {
		const workflow = PocWorkflow.builder()
			.id('applicantrequest')
			.version('1.0')
			.name('Applicant Request Decision Workflow')
			.description('Determine if applicant request is valid')
			.start('CheckApplication')
			.functions([
				PocFunction.builder()
					.name('sendRejectionEmailFunction')
					.operation('http://myapis.org/applicationapi.json#emailRejection')
					.build(),
			])
			.states([
				PocDatabasedswitch.builder()
					.name('CheckApplication')
					.dataConditions([
						PocTransitiondatacondition.builder()
							.condition('${ .applicants | .age >= 18 }')
							.transition('StartApplication')
							.build(),
						PocTransitiondatacondition.builder()
							.condition('${ .applicants | .age < 18 }')
							.transition('RejectApplication')
							.build(),
					])
					.default(
						PocDefaultdef.builder()
							.transition('RejectApplication')
							.build(),
					)
					.build(),
				PocSubflowstate.builder()
					.name('StartApplication')
					.workflowId('startApplicationWorkflowId')
					//.end(true)
					.build(),
				PocOperationstate.builder()
					.name('RejectApplication')
					.actionMode('sequential')
					//.end(true)
					.actions([
						PocAction.builder()
							.functionRef({
								refName: 'sendRejectionEmailFunction',
								arguments: {applicant: '${ .applicant }'},
							})
							.build(),
					])
					.build(),
			])
			.build();
		
		const expected = JSON.parse(fs.readFileSync('./tests/poc/applicantrequest.json', 'utf8'));
		expect(workflow).toEqual(expected);
	});
	
	
	it('should map json to Workflow object', function () {
		const workflow = PocWorkflow.fromString(fs.readFileSync('./tests/poc/applicantrequest.json', 'utf8'));
		
		expect(workflow.expressionLang).toEqual('jq');
		// @ts-ignore
		expect(workflow.functions[0]?.type).toEqual('rest');
		
		const subflowState = workflow.states[1] as Subflowstate;
		expect(subflowState.end).toBeTrue();
		expect(subflowState.usedForCompensation).toBeFalse();
		
		const operationState = workflow.states[2] as PocOperationstate;
		expect(operationState.end).toBeTrue();
		expect(operationState.usedForCompensation).toBeFalse();
		
		
	});
	
	
	
	it('should map yml to Workflow object', function () {
		const workflow = PocWorkflow.fromString(fs.readFileSync('./tests/poc/applicantrequest.yml', 'utf8'));
		
		expect(workflow.expressionLang).toEqual('jq');
		// @ts-ignore
		expect(workflow.functions[0]?.type).toEqual('rest');
		
		expect((workflow.states[1] as Subflowstate).end).toBeTrue();
		expect((workflow.states[2] as PocOperationstate).end).toBeTrue();
		
		
	});
	
	
});
