![Node CI](https://github.com/serverlessworkflow/sdk-typescript/workflows/Node%20CI/badge.svg) [![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/serverlessworkflow/sdk-typescript)

# Serverless Workflow Specification - Typescript SDK

Provides the Typescript API/SPI for the [Serverless Workflow Specification](https://github.com/serverlessworkflow/specification)

With the SDK you can:
* Parse workflow JSON and YAML definitions
* Programmatically build workflow definitions
* Validate workflow definitions


### Status

| Latest Releases | Conformance to spec version |
| :---: | :---: |
| [v1.0.0](https://github.com/serverlessworkflow/sdk-typescript/releases/) | [v0.6](https://github.com/serverlessworkflow/specification/tree/0.6.x) |
| [v2.0.0](https://github.com/serverlessworkflow/sdk-typescript/releases/) | [v0.7](https://github.com/serverlessworkflow/specification/tree/0.7.x) |
| [v3.0.0](https://github.com/serverlessworkflow/sdk-typescript/releases/) | [v0.8](https://github.com/serverlessworkflow/specification/tree/0.8.x) |



## Getting Started

### Building locally

To build the project and run tests locally:

```sh
git clone https://github.com/serverlessworkflow/sdk-typescript.git
cd sdk-typescript
npm install && npm run build && npm run test
```


### How to use

#### Install

For the latest stable version:

```sh
npm i @severlessworkflow/sdk-typescript
```

#### Create Workflow using builder API

```typescript
import { workflowBuilder, injectstateBuilder, Specification } from '@severlessworkflow/sdk-typescript';

const workflow: Specification.Workflow = workflowBuilder()
  .id("helloworld")
  .specVersion("0.8")
  .version("1.0")
  .name("Hello World Workflow")
  .description("Inject Hello World")
  .start("Hello State")
  .states([
    injectstateBuilder()
      .name("Hello State")
      .data({
          "result": "Hello World!"
      })
      .build()
  ])
  .build();
```

#### Create Workflow from JSON/YAML source

```typescript
import { Specification, Workflow } from '@severlessworkflow/sdk-typescript';

const source = `id: helloworld
version: '1.0'
specVerion: '0.8'
name: Hello World Workflow
description: Inject Hello World
start: Hello State
states:
  - type: inject
    name: Hello State
    data:
      result: Hello World!
    end: true`

const workflow: Specification.Workflow = Workflow.fromSource(source);
```
Where `source` can be in both JSON or YAML format. 

#### Parse a Workflow instance to JSON/YAML

Having the following workflow instance:

```typescript
import { workflowBuilder, injectstateBuilder, Specification } from '@severlessworkflow/sdk-typescript';

const workflow: Specification.Workflow = workflowBuilder()
  .id("helloworld")
  .version("1.0")
  .specVersion("0.8")
  .name("Hello World Workflow")
  .description("Inject Hello World")
  .start("Hello State")
  .states([
    injectstateBuilder()
      .name("Hello State")
      .data({
        "result": "Hello World!"
      })
      .end(true)
      .build()
  ])
  .build();
```

You can convert it to its string representation in JSON or YAML format 
by using the static methods `Workflow.toJson` or `Workflow.toYaml` respectively:

```typescript
import { Workflow } from '../src/lib/definitions/workflow';

const workflowAsJson: string = Workflow.toJson(workflow);
```

```typescript
import { Workflow } from '../src/lib/definitions/workflow';

const workflowAsYaml: string = Workflow.toYaml(workflow);
```


#### Validate workflow definitions

The sdk provides a way to validate if a workflow object is compliant with the serverlessworkflow specification.

`WorkflowValidator` class provides a validation method: 

- `validate(): boolean`

```typescript
import {WorkflowValidator, Specification} from '@severlessworkflow/sdk-typescript';
import {Workflow} from "./workflow";

const workflow = {
    id: 'helloworld',
    version: '1.0',
    specVersion: '0.3',
    name: 'Hello World Workflow',
    description: 'Inject Hello World',
    start: 'Hello State',
    states: [
        {
            type: 'inject',
            name: 'Hello State',
            end: true,
            data: {
                result: "Hello World!"
            }
        }
    ]
};

const workflowValidator: WorkflowValidator = new WorkflowValidator(Workflow.fromSource(JSON.stringify(workflow)));
if (!workflowValidator.isValid) {
    workflowValidator.errors.forEach(error => console.error((error as ValidationError).message));
}
```

You can also validate parts of a workflow using `validators`:

```typescript
import { ValidateFunction } from 'ajv';
import { validators, Specification } from '@severlessworkflow/sdk-typescript';

const injectionState: Specification.Injectstate = workflow.states[0];
const injectionStateValidator: ValidateFunction<Specification.Injectstate> = validators.get('Injectstate');
if (!injectionStateValidator(injectionState)) {
  injectionStateValidator.errors.forEach(error => console.error(error.message));
}
```


#### Generate workflow diagram

It is possible to generate the workflow diagram with [Mermaid](https://github.com/mermaid-js/mermaid)


```
const workflow = workflowBuilder()
    .id("helloworld")
    ....
    .build();

const mermaidSourceCode = new MermaidDiagram(workflow).sourceCode();
```

[Here](./examples/browser/mermaid.html) you can see a full example that uses mermaid in the browser to generate the workflow diagram.
