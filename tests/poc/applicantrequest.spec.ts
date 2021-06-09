import * as fs from 'fs';

import {
  Action,
  Databasedswitch,
  Defaultdef,
  Function,
  Functionref,
  Operationstate,
  Subflowstate,
  Transitiondatacondition,
  Workflow,
} from '../../src/poc/definitions';

describe('applicationrequest workflow example', () => {
  it('should generate Workflow object', function () {
    const workflow = Workflow.builder()
      .id('applicantrequest')
      .version('1.0')
      .name('Applicant Request Decision Workflow')
      .description('Determine if applicant request is valid')
      .start('CheckApplication')
      .functions([
        Function.builder()
          .name('sendRejectionEmailFunction')
          .operation('http://myapis.org/applicationapi.json#emailRejection')
          .build(),
      ])
      .states([
        Databasedswitch.builder()
          .name('CheckApplication')
          .dataConditions([
            Transitiondatacondition.builder()
              .condition('${ .applicants | .age >= 18 }')
              .transition('StartApplication')
              .build(),
            Transitiondatacondition.builder()
              .condition('${ .applicants | .age < 18 }')
              .transition('RejectApplication')
              .build(),
          ])
          .default(Defaultdef.builder().transition('RejectApplication').build())
          .build(),
        Subflowstate.builder()
          .name('StartApplication')
          .workflowId('startApplicationWorkflowId')
          //.end(true)
          .build(),
        Operationstate.builder()
          .name('RejectApplication')
          .actionMode('sequential')
          //.end(true)
          .actions([
            Action.builder()
              .functionRef(
                Functionref.builder()
                  .refName('sendRejectionEmailFunction')
                  .arguments({ applicant: '${ .applicant }' })
                  .build()
              )
              .build(),
          ])
          .build(),
      ])
      .build();

    const expected = JSON.parse(fs.readFileSync('./tests/poc/applicantrequest.json', 'utf8'));
    expect(JSON.parse(Workflow.toJson(workflow))).toEqual(expected);
  });

  it('should map json to Workflow object', function () {
    const workflow = Workflow.fromSource(fs.readFileSync('./tests/poc/applicantrequest.json', 'utf8'));

    expect(workflow.expressionLang).toEqual('jq');
    // @ts-ignore
    expect(workflow.functions[0]?.type).toEqual('rest');

    const subflowState = workflow.states[1] as Subflowstate;
    expect(subflowState.end).toBeTrue();
    expect(subflowState.usedForCompensation).toBeFalse();

    const operationState = workflow.states[2] as Operationstate;
    expect(operationState.end).toBeTrue();
    expect(operationState.usedForCompensation).toBeFalse();
  });

  it('should map yml to Workflow object', function () {
    const workflow = Workflow.fromSource(fs.readFileSync('./tests/poc/applicantrequest.yml', 'utf8'));

    expect(workflow.expressionLang).toEqual('jq');
    // @ts-ignore
    expect(workflow.functions[0]?.type).toEqual('rest');

    expect((workflow.states[1] as Subflowstate).end).toBeTrue();
    expect((workflow.states[2] as Operationstate).end).toBeTrue();
  });
});
