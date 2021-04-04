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
import {Workflow} from "../src/model/workflow";
import {WorkflowBuilder} from "../src/model/workflow.builder";
import {InjectStateBuilder} from "../src/model/inject-state.builder";
import {BaseWorkflow} from "../src/base-workflow";


describe("base-workflow fromSource", () => {

    const testCases = [
        {
            description: "should generate workflow object from JSON file",
            file: "./spec/base-workflow-hello-world.json",

        },
        {
            description: "should generate workflow object from YAML file",
            file: "./spec/base-workflow-hello-world.yaml",

        },
        {
            description: "should generate workflow object from YML file",
            file: "./spec/base-workflow-hello-world.yml",

        }
    ];
    testCases.forEach(test => {

        it(test.description, function () {
            const workflow: Workflow = BaseWorkflow.fromSource( test.file);

            expect(workflow.id).toBe("helloworld");
            expect(workflow.version).toBe("1.0");
            expect(workflow.name).toBe("Hello World Workflow");
            expect(workflow.description).toBe("Inject Hello World");
            expect(workflow.start).toBe("Hello State");
            expect(workflow).toEqual({
                "id": "helloworld",
                "version": "1.0",
                "name": "Hello World Workflow",
                "description": "Inject Hello World",
                "start": "Hello State",
                "states": [
                    {
                        "name": "Hello State",
                        "type": "inject",
                        "data": {
                            "result": "Hello World!"
                        },
                        "end": true
                    }
                ]
            })
        });

    })


    it('should throws error if format is not json or yaml', () => {
        expect(() => {
                BaseWorkflow.fromSource("./spec/base-workflow-hello-world.xxx")
            }
        ).toThrow(new Error("File format not supported"));
    });



});


describe("base-workflow", () => {




    it('should generate JSON from workflow object', () => {
        const jsonWorkflow: string = BaseWorkflow.toJSON(new WorkflowBuilder()
            .withId("helloworld")
            .withVersion("1.0")
            .withName("Hello World Workflow")
            .withDescription("Inject Hello World")
            .withStart("Hello State")
            .withStates([new InjectStateBuilder()
                .withName("Hello State")
                .withData({
                    "result": "Hello World!"
                })
                .withEnd(true).build()])
            .build());

        expect(jsonWorkflow).toBe("{" +
            "\"id\":\"helloworld\"," +
            "\"version\":\"1.0\"," +
            "\"name\":\"Hello World Workflow\"," +
            "\"description\":\"Inject Hello World\"," +
            "\"start\":\"Hello State\"," +
            "\"states\":[" +
            "{" +
            "\"type\":\"inject\"," +
            "\"name\":\"Hello State\"," +
            "\"data\":{" +
            "\"result\":\"Hello World!\"" +
            "}," +
            "\"end\":true" +
            "}" +
            "]" +
            "}")

    });


    it('should generate YAML from workflow object', () => {
        const yamlWorkflow: string = BaseWorkflow.toYAML(new WorkflowBuilder()
            .withId("helloworld")
            .withVersion("1.0")
            .withName("Hello World Workflow")
            .withDescription("Inject Hello World")
            .withStart("Hello State")
            .withStates([new InjectStateBuilder()
                .withName("Hello State")
                .withData({
                    "result": "Hello World!"
                })
                .withEnd(true).build()])
            .build());

        expect(yamlWorkflow).toBe("id: helloworld\n" +
            "version: '1.0'\n" +
            "name: Hello World Workflow\n" +
            "description: Inject Hello World\n" +
            "start: Hello State\n" +
            "states:\n" +
            "  - type: inject\n" +
            "    name: Hello State\n" +
            "    data:\n" +
            "      result: Hello World!\n" +
            "    end: true\n")

    });
})
