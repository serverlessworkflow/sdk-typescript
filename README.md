![Node CI](https://github.com/serverlessworkflow/sdk-typescript/workflows/Node%20CI/badge.svg)

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
You can use [npm link](https://docs.npmjs.com/cli/v7/commands/npm-link) to add the `sdk-typescript` 
as dependency in your project.

- Clone the `sdk-typescript` project and build it:
```sh
git clone https://github.com/serverlessworkflow/sdk-typescript.git
cd sdk-typescript
npm install && npm run build
```

- Make the package visible globally to npm. Inside the `sdk-typescript` project folder run: 
```sh
npm link
```

- Navigate to the folder/project in which you want to use the sdk, and run the following command: 
```sh
npm link sdk-typescript
```

It will create a symbolic link from globally-installed `sdk-typescript` to `node_modules/` of the current folder.


### How to use

#### Create Workflow using builder API

```typescript
const workflow = workflowBuilder()
  .id("helloworld")
  .version("1.0")
  .name("Hello World Workflow")
  .description("Inject Hello World")
  .start("Hello State")
  .states([injectstateBuilder()
    .type("inject")
    .name("Hello State")
    .data({
        "result": "Hello World!"
    })
    .end(true)
    .build()
  ])
  .build();
```

#### Load a file JSON/YAML to a Workflow instance

```typescript
    const workflow = WorkflowConverter.fromString(source)
```
Where `source` is a JSON or a YAML string.



#### Parse a Workflow instance to JSON/YAML

Having the following workflow instance:

```typescript
const workflow = workflowBuilder()
  .id("helloworld")
  .version("1.0")
  .name("Hello World Workflow")
  .description("Inject Hello World")
  .start("Hello State")
  .states([injectstateBuilder()
    .type("inject")
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
    const workflowAsJson = WorkflowConverter.toJson(workflow);
```

```typescript
    const workflowAsYaml = WorkflowConverter.toYaml(workflow);
```

#### Validate workflow definitions

The sdk provides a way to validate if a workflow object is compliant with the serverlessworkflow specification.

`WorkflowValidator` class provides a validation method: 

- `validate(): boolean`

```typescript
const workflowValidator = new WorkflowValidator(workflow);
if (!workflowValidator.validate()) {
  workflowValidator.validationErrors.forEach(error => console.error(error.message));
}
```