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
 */
import { MermaidState } from '../../../src/lib/diagram/mermaidState';
import { Specification } from '../../../src/lib/definitions';

describe('mermaidState', () => {
  it('should create source code for parallel state', () => {
    expect(
      new MermaidState(
        new Specification.Parallelstate(
          JSON.parse(`
          {
            "type": "parallel",
            "name": "ParallelExec",
            "branches": [
            {
              "name": "ShortDelayBranch",
              "actions": [{
                "subFlowRef": "shortdelayworkflowid"
              }]
            },
            {
              "name": "LongDelayBranch",
              "actions": [{
                "subFlowRef": "longdelayworkflowid"
              }]
            }
            ],
            "end": true
            }`)
        )
      ).sourceCode()
    ).toBe(`ParallelExec : ParallelExec
ParallelExec : type = Parallel State
ParallelExec : Completion type = allOf
ParallelExec : Num. of branches = 2
ParallelExec --> [*]`);
  });

  it('should create source code for event-based state', () => {
    const eventbasedswitch = new Specification.Eventbasedswitch(
      JSON.parse(`{
          "name": "CheckVisaStatus",
          "type": "switch",
          "eventConditions": [
          {
            "eventRef": "visaApprovedEvent",
            "transition": "HandleApprovedVisa"
          },
          {
            "eventRef": "visaRejectedEvent",
            "transition": "HandleRejectedVisa"
          }
          ],
          "eventTimeout": "PT1H",
          "defaultCondition": {
            "transition": "HandleNoVisaDecision"
          }
        }`)
    );
    const mermaidState = new MermaidState(eventbasedswitch);
    expect(mermaidState.sourceCode()).toBe(`CheckVisaStatus : CheckVisaStatus
CheckVisaStatus : type = Switch State
CheckVisaStatus : Condition type = event-based
CheckVisaStatus --> HandleApprovedVisa
CheckVisaStatus --> HandleRejectedVisa
CheckVisaStatus --> HandleNoVisaDecision : default`);
  });

  it('should create source code for data-based state', () => {
    const databasedswitch = new Specification.Databasedswitch(
      JSON.parse(`{
          "type":"switch",
          "name":"CheckApplication",
          "dataConditions": [
            {
              "condition": "\${ .applicants | .age >= 18 }",
              "transition": "StartApplication"
            },
            {
              "condition": "\${ .applicants | .age < 18 }",
              "transition": "RejectApplication"
            }
          ],
          "defaultCondition": {
            "transition": "RejectApplication"
          }
        }`)
    );
    const mermaidState = new MermaidState(databasedswitch);
    expect(mermaidState.sourceCode()).toBe(`CheckApplication : CheckApplication
CheckApplication : type = Switch State
CheckApplication : Condition type = data-based
CheckApplication --> StartApplication : \${ .applicants | .age >= 18 }
CheckApplication --> RejectApplication : \${ .applicants | .age < 18 }
CheckApplication --> RejectApplication : default`);
  });

  it('should create source code for operation state', () => {
    const states = new Specification.Operationstate(
      JSON.parse(`{
      "type":"operation",
      "name":"SubmitJob",
      "actions":[
        {
          "functionRef": {
            "refName": "submitJob",
            "arguments": {
              "name": "\${ .job.name }"
            }
          },
          "actionDataFilter": {
            "results": "\${ .jobuid }"
          }
        }
      ],
      "stateDataFilter": {
        "output": "\${ .jobuid }"
      },
      "transition": "WaitForCompletion"
    }`)
    );
    const mermaidState = new MermaidState(states);
    expect(mermaidState.sourceCode()).toBe(`SubmitJob : SubmitJob
SubmitJob : type = Operation State
SubmitJob : Action mode = sequential
SubmitJob : Num. of actions = 1
SubmitJob --> WaitForCompletion`);
  });

  it('should create source code for sleep state', () => {
    const states = new Specification.Sleepstate(
      JSON.parse(`{
      "type": "sleep",
      "name": "WaitForCompletion",
      "duration": "PT5S",
      "transition": "GetJobStatus"
    }`)
    );
    const mermaidState = new MermaidState(states);
    expect(mermaidState.sourceCode()).toBe(`WaitForCompletion : WaitForCompletion
WaitForCompletion : type = Sleep State
WaitForCompletion : Duration = PT5S
WaitForCompletion --> GetJobStatus`);
  });

  it('should create source code for foreach state', () => {
    const states = new Specification.Foreachstate(
      JSON.parse(`{
      "type": "foreach",
      "name": "ProvisionOrdersState",
      "inputCollection": "\${ .orders }",
      "iterationParam": "singleorder",
      "outputCollection": "\${ .provisionedOrders }",
      "actions": [
        {
          "functionRef": {
            "refName": "provisionOrderFunction",
            "arguments": {
              "order": "\${ .singleorder }"
            }
          }
        }
      ],
      "end": {
        "produceEvents": [{
          "eventRef": "provisioningCompleteEvent",
          "data": "\${ .provisionedOrders }"
        }]
      }
    }`)
    );
    const mermaidState = new MermaidState(states, true);
    expect(mermaidState.sourceCode()).toBe(`ProvisionOrdersState : ProvisionOrdersState
ProvisionOrdersState : type = Foreach State
ProvisionOrdersState : Input collection = \${ .orders }
ProvisionOrdersState : Num. of actions = 1
[*] --> ProvisionOrdersState
ProvisionOrdersState --> [*] : Produced event = [provisioningCompleteEvent]`);
  });

  it('should create source code for callback state', () => {
    const states = new Specification.Callbackstate(
      JSON.parse(`{
            "name": "CheckCredit",
            "type": "callback",
            "action": {
                "functionRef": {
                    "refName": "callCreditCheckMicroservice",
                    "arguments": {
                        "customer": "\${ .customer }"
                    }
                }
            },
            "eventRef": "CreditCheckCompletedEvent",
            "timeouts": {
              "stateExecTimeout": "PT15M"
            },
            "transition": "EvaluateDecision"
        }`)
    );
    const mermaidState = new MermaidState(states, true);
    expect(mermaidState.sourceCode()).toBe(`CheckCredit : CheckCredit
CheckCredit : type = Callback State
CheckCredit : Callback function = callCreditCheckMicroservice
CheckCredit : Callback event = CreditCheckCompletedEvent
[*] --> CheckCredit
CheckCredit --> EvaluateDecision`);
  });

  it('should create source code for any state with transition as object', () => {
    const states = new Specification.Callbackstate(
      JSON.parse(`{
            "name": "CheckCredit",
            "type": "callback",
            "transition": {"nextState": "EvaluateDecision"}
        }`)
    );
    const mermaidState = new MermaidState(states);
    expect(mermaidState.sourceCode()).toBe(`CheckCredit : CheckCredit
CheckCredit : type = Callback State
CheckCredit --> EvaluateDecision`);
  });
});
