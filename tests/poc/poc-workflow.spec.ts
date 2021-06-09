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

import { Injectstate, Subflowstate, Workflow } from '../../src/poc/definitions';

describe('pco-workflow', () => {
  it('generate object from string ', () => {
    const actual: Workflow = Workflow.fromSource(
      JSON.stringify({
        id: 'helloworld',
        version: '1.0',
        name: 'Hello World Workflow',
        description: 'Inject Hello World',
        start: 'Hello State',
        states: [
          {
            name: 'Hello State',
            type: 'inject',
            data: {
              result: 'Hello World!',
            },
          },
          {
            name: 'StartApplication',
            type: 'subflow',
            end: false,
            workflowId: 'startApplicationWorkflowId',
          },
        ],
      })
    );

    expect((actual.states[1] as Subflowstate).end).toBeFalse();
  });

  it('generate object with builder', () => {
    const jsonWorkflow: string = Workflow.toJson(
      Workflow.builder()
        .id('helloworld')
        .version('1.0')
        .name('Hello World Workflow')
        .description('Inject Hello World')
        .start('Hello State')
        .states([
          Injectstate.builder()
            .name('Hello State')
            .data({
              result: 'Hello World!',
            })
            .build(),
        ])
        .build()
    );

    expect(jsonWorkflow).toBe(
      '{' +
        '"id":"helloworld",' +
        '"version":"1.0",' +
        '"name":"Hello World Workflow",' +
        '"description":"Inject Hello World",' +
        '"start":"Hello State",' +
        '"states":[' +
        '{' +
        '"name":"Hello State",' +
        '"data":{' +
        '"result":"Hello World!"' +
        '},' +
        '"type":"inject",' +
        '"end":true' +
        '}' +
        ']' +
        '}'
    );
  });

  it('should generate YAML from workflow object', () => {
    const yamlWorkflow: string = Workflow.toYaml(
      Workflow.builder()
        .id('helloworld')
        .version('1.0')
        .name('Hello World Workflow')
        .description('Inject Hello World')
        .start('Hello State')
        .states([
          Injectstate.builder()
            .name('Hello State')
            .data({
              result: 'Hello World!',
            })
            .build(),
        ])
        .build()
    );
    expect(yamlWorkflow).toBe(
      'id: helloworld\n' +
        "version: '1.0'\n" +
        'name: Hello World Workflow\n' +
        'description: Inject Hello World\n' +
        'start: Hello State\n' +
        'states:\n' +
        '  - name: Hello State\n' +
        '    data:\n' +
        '      result: Hello World!\n' +
        '    type: inject\n' +
        '    end: true\n'
    );
  });

  it('read json', function () {
    const workflow: Workflow = Workflow.fromSource(
      '{\n' +
        '  "id": "helloworld",\n' +
        '  "version": "1.0",\n' +
        '  "name": "Hello World Workflow",\n' +
        '  "description": "Inject Hello World",\n' +
        '  "start": "Hello State",\n' +
        '  "states":[\n' +
        '    {\n' +
        '      "name":"Hello State",\n' +
        '      "type":"inject",\n' +
        '      "data": {\n' +
        '        "result": "Hello World!"\n' +
        '      }\n' +
        '    }\n' +
        '  ]\n' +
        '}\n'
    );

    expect(((workflow.states[0] as Injectstate).usedForCompensation = false));
    expect(workflow.expressionLang).toEqual('jq');
  });
});
