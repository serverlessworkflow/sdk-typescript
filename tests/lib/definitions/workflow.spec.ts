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
import { injectstateBuilder, Specification, workflowBuilder } from '../../../src';
import { readFileSync } from 'fs';
import { Workflow } from '../../../src/lib/definitions/workflow';

describe('workflow fromSource', () => {
  const testCases = [
    {
      description: 'should generate workflow object from JSON file',
      file: './tests/lib/definitions/workflow-converter-hello-world.json',
    },
    {
      description: 'should generate workflow object from YAML file',
      file: './tests/lib/definitions/workflow-converter-hello-world.yaml',
    },
    {
      description: 'should generate workflow object from YML file',
      file: './tests/lib/definitions/workflow-converter-hello-world.yml',
    },
  ];
  testCases.forEach((test) => {
    it(test.description, function () {
      const workflow: Specification.Workflow = Workflow.fromSource(readFileSync(test.file, 'utf-8'));
      expect(workflow.id).toBe('helloworld');
      expect(workflow.version).toBe('1.0');
      expect(workflow.name).toBe('Hello World Workflow');
      expect(workflow.description).toBe('Inject Hello World');
      expect(workflow.start).toBe('Hello State');
    });
  });

  it('should throws error if format is not json or yaml', () => {
    expect(() => {
      Workflow.fromSource(readFileSync('./tests/lib/definitions/workflow-converter-hello-world.xxx', 'utf-8'));
    }).toThrow(new Error('Format not supported'));
  });
});

describe('workflow ', () => {
  it('should convert non-primitive properties to the desired class', () => {
    const data = {
      functions: [
        {
          name: 'Function',
          operation: 'operationFunction',
        },
      ],
      events: [
        {
          name: 'CarBidEvent',
          type: 'carBidMadeType',
          source: 'carBidEventSource',
        },
      ],
      retries: [
        {
          name: 'retrie',
          maxAttempts: 4,
        },
      ],
      timeouts: {
        duration: 'P30M5S',
      },
      metadata: {
        key: 'value',
      },
    };

    const model = new Workflow(data);

    expect(model.functions![0]!.constructor.name).toBe('Function');
    expect(model.timeouts!.constructor.name).toBe('Timeouts');
    expect(model.metadata!.constructor.name).toBe('Metadata');
    expect(model.events![0]!.constructor.name).toBe('Eventdef');
    expect(model.retries![0]!.constructor.name).toBe('Retrydef');
  });

  it('should generate JSON from workflow object', () => {
    const jsonWorkflow: string = Workflow.toJson(
      workflowBuilder()
        .id('helloworld')
        .version('1.0')
        .specVersion('0.8')
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
        '"specVersion":"0.8",' +
        '"name":"Hello World Workflow",' +
        '"description":"Inject Hello World",' +
        '"start":"Hello State",' +
        '"states":[' +
        '{' +
        '"type":"inject",' +
        '"name":"Hello State",' +
        '"data":{' +
        '"result":"Hello World!"' +
        '},' +
        '"end":true' +
        '}' +
        ']' +
        '}'
    );
  });

  it('should generate YAML from workflow object', () => {
    const yamlWorkflow: string = Workflow.toYaml(
      workflowBuilder()
        .id('helloworld')
        .version('1.0')
        .specVersion('0.8')
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
        "specVersion: '0.8'\n" +
        'name: Hello World Workflow\n' +
        'description: Inject Hello World\n' +
        'start: Hello State\n' +
        'states:\n' +
        '  - type: inject\n' +
        '    name: Hello State\n' +
        '    data:\n' +
        '      result: Hello World!\n' +
        '    end: true\n'
    );
  });
});
