![Node CI](https://github.com/serverlessworkflow/sdk-typescript/workflows/Node%20CI/badge.svg) [![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/serverlessworkflow/sdk-typescript)

# Serverless Workflow Specification - Typescript SDK

Provides the Typescript API/SPI for the [Serverless Workflow Specification](https://github.com/serverlessworkflow/specification)

With the SDK you can:
* Parse workflow JSON and YAML definitions
* Programmatically build workflow definitions
* Validate workflow definitions


## Getting Started

### Building locally

To build the project and run tests locally:

```sh
git clone https://github.com/serverlessworkflow/sdk-typescript.git
cd sdk-typescript
npm install && npm run update-code-base && npm run test
```


### Add as dependency to your project
You can use [npm link](https://docs.npmjs.com/cli/v7/commands/npm-link) to add the `@severlessworkflow/sdk-typescript` 
as dependency in your project.

- Clone the `sdk-typescript` project and build it:
```sh
git clone https://github.com/serverlessworkflow/sdk-typescript.git
cd sdk-typescript
npm install && npm run build
```

- Make the package visible globally to npm. Inside the `sdk-typescript\dist` project folder run: 
```sh
npm link
```

- Navigate to the folder/project in which you want to use the sdk, and run the following command: 
```sh
npm link @severlessworkflow/sdk-typescript
```

It will create a symbolic link from globally-installed `@severlessworkflow/sdk-typescript` to `node_modules/` of the current folder.


### How to use

#### Create Workflow using builder API

```typescript
import { workflowBuilder, injectstateBuilder, Specification } from '@severlessworkflow/sdk-typescript';

const workflow: Specification.Workflow = workflowBuilder()
  .id("helloworld")
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
      .end(true)
      .build()
  ])
  .build();
```


#### Create Workflow using object literals

```typescript
import { Specification } from '@severlessworkflow/sdk-typescript';

const workflow: Specification.Workflow = {
  id: 'helloworld',
  version: '1.0',
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
    } as Specification.Injectstate
  ]
};
```


#### Load a file JSON/YAML to a Workflow instance

```typescript
import { Specification, WorkflowConverter } from '@severlessworkflow/sdk-typescript';

const workflow: Specification.Workflow = WorkflowConverter.fromString(source);
```
Where `source` is a JSON or a YAML string.


#### Parse a Workflow instance to JSON/YAML

Having the following workflow instance:

```typescript
import { workflowBuilder, injectstateBuilder, Specification } from '@severlessworkflow/sdk-typescript';

const workflow: Specification.Workflow = workflowBuilder()
  .id("helloworld")
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
      .end(true)
      .build()
  ])
  .build();
```

You can convert it to its string representation in JSON or YAML format 
by using the static methods `toJson` or `toYaml` respectively:

```typescript
import { WorkflowConverter } from '@severlessworkflow/sdk-typescript';

const workflowAsJson: string = WorkflowConverter.toJson(workflow);
```

```typescript
import { WorkflowConverter } from '@severlessworkflow/sdk-typescript';

const workflowAsYaml: string = WorkflowConverter.toYaml(workflow);
```


#### Validate workflow definitions

The sdk provides a way to validate if a workflow object is compliant with the serverlessworkflow specification.

`WorkflowValidator` class provides a validation method: 

- `validate(): boolean`

```typescript
import { WorkflowValidator, Specification } from '@severlessworkflow/sdk-typescript';

const workflow: Specification.Workflow = {
  id: 'helloworld',
  version: '1.0',
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
    } as Specification.Injectstate
  ]
};
const workflowValidator: WorkflowValidator = new WorkflowValidator(workflow);
if (!workflowValidator.validate()) {
  workflowValidator.errors.forEach(error => console.error(error.message));
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