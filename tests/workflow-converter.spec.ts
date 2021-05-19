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
import { workflowBuilder, injectstateBuilder, WorkflowConverter, Specification } from '../src/';
import { readFileSync } from 'fs';

describe('workflow-converter fromSource', () => {
  const testCases = [
    {
      description: 'should generate workflow object from JSON file',
      file: './tests/workflow-converter-hello-world.json',
    },
    {
      description: 'should generate workflow object from YAML file',
      file: './tests/workflow-converter-hello-world.yaml',
    },
    {
      description: 'should generate workflow object from YML file',
      file: './tests/workflow-converter-hello-world.yml',
    },
  ];
  testCases.forEach((test) => {
    it(test.description, function () {
      const workflow: Specification.Workflow = WorkflowConverter.fromString(readFileSync(test.file, 'utf-8'));
      expect(workflow.id).toBe('helloworld');
      expect(workflow.version).toBe('1.0');
      expect(workflow.name).toBe('Hello World Workflow');
      expect(workflow.description).toBe('Inject Hello World');
      expect(workflow.start).toBe('Hello State');
      expect(workflow).toEqual({
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
            end: true,
            usedForCompensation: false,
          },
        ],
        expressionLang: 'jq',
        keepActive: false,
      });
    });
  });

  it('should throws error if format is not json or yaml', () => {
    expect(() => {
      WorkflowConverter.fromString(readFileSync('./tests/workflow-converter-hello-world.xxx', 'utf-8'));
    }).toThrow(new Error('Format not supported'));
  });
});

describe('workflow-converter', () => {
  it('should generate JSON from workflow object', () => {
    const jsonWorkflow: string = WorkflowConverter.toJson(
      workflowBuilder()
        .id('helloworld')
        .version('1.0')
        .name('Hello World Workflow')
        .description('Inject Hello World')
        .start('Hello State')
        .states([
          injectstateBuilder()
            .name('Hello State')
            .data({
              result: 'Hello World!',
            })
            .end(true)
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
        '"end":true,' +
        '"type":"inject",' +
        '"usedForCompensation":false' +
        '}' +
        '],' +
        '"expressionLang":"jq",' +
        '"keepActive":false' +
        '}'
    );
  });

  it('should generate YAML from workflow object', () => {
    const yamlWorkflow: string = WorkflowConverter.toYaml(
      workflowBuilder()
        .id('helloworld')
        .version('1.0')
        .name('Hello World Workflow')
        .description('Inject Hello World')
        .start('Hello State')
        .states([
          injectstateBuilder()
            .name('Hello State')
            .data({
              result: 'Hello World!',
            })
            .end(true)
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
        '    end: true\n' +
        '    type: inject\n' +
        '    usedForCompensation: false\n' +
        'expressionLang: jq\n' +
        'keepActive: false\n'
    );
  });
});
