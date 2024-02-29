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
import { MermaidDiagram } from '../../../src/lib/diagram/mermaidDiagram';
import { Specification } from '../../../src/lib/definitions';
import fs from 'fs';

describe('MermaidDiagram', () => {
  it('should create mermaid diagram source code', () => {
    const jsonSource = fs.readFileSync('./tests/examples/jobmonitoring.json', 'utf8');
    const actual = new MermaidDiagram(Specification.Workflow.fromSource(jsonSource)).sourceCode();
    expect(actual).toBe(`stateDiagram-v2
SubmitJob : Submit Job
SubmitJob : type = Operation State
SubmitJob : Action mode = sequential
SubmitJob : Num. of actions = 1
[*] --> SubmitJob
SubmitJob --> WaitForCompletion

WaitForCompletion : Wait For Completion
WaitForCompletion : type = Sleep State
WaitForCompletion : Duration = PT5S
WaitForCompletion --> GetJobStatus

GetJobStatus : Get Job Status
GetJobStatus : type = Operation State
GetJobStatus : Action mode = sequential
GetJobStatus : Num. of actions = 1
GetJobStatus --> DetermineCompletion

DetermineCompletion : Determine Completion
DetermineCompletion : type = Switch State
DetermineCompletion : Condition type = data-based
DetermineCompletion --> JobSucceeded : \${ .jobStatus == "SUCCEEDED" }
DetermineCompletion --> JobFailed : \${ .jobStatus == "FAILED" }
DetermineCompletion --> WaitForCompletion : default

JobSucceeded : Job Succeeded
JobSucceeded : type = Operation State
JobSucceeded : Action mode = sequential
JobSucceeded : Num. of actions = 1
JobSucceeded --> [*]

JobFailed : Job Failed
JobFailed : type = Operation State
JobFailed : Action mode = sequential
JobFailed : Num. of actions = 1
JobFailed --> [*]`);
  });

  it(`should handle compensated by`, () => {
    const jsonSource = fs.readFileSync('./tests/lib/diagram/wf_with_compensation.json', 'utf8');
    const actual = new MermaidDiagram(Specification.Workflow.fromSource(jsonSource)).sourceCode();

    expect(actual).toBe(`stateDiagram-v2
ItemPurchase : Item Purchase
ItemPurchase : type = Event State
[*] --> ItemPurchase
ItemPurchase --> CancelPurchase : compensated by
ItemPurchase --> [*]

CancelPurchase : Cancel Purchase
CancelPurchase : type = Operation State
CancelPurchase : usedForCompensation
CancelPurchase : Action mode = sequential
CancelPurchase : Num. of actions = 1
CancelPurchase --> SendConfirmationPurchaseCancelled

SendConfirmationPurchaseCancelled : Send Confirmation Purchase Cancelled
SendConfirmationPurchaseCancelled : type = Operation State
SendConfirmationPurchaseCancelled : Action mode = sequential
SendConfirmationPurchaseCancelled : Num. of actions = 1`);
  });
});
