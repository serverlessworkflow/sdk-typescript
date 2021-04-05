# Serverless Workflow Specification - Typescript SDK

Provides the Typescript API/SPI for the [Serverless Workflow Specification](https://github.com/serverlessworkflow/specification)


With the SDK you can:
* Parse workflow JSON and YAML definitions
* (_WIP_) Programmatically build workflow definitions


## Getting Started


### Building locally

To build the project and run tests locally:

```sh
git clone https://github.com/serverlessworkflow/sdk-typescript.git
cd sdk-typescript
npm install && npm run test
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

    const workflow = new WorkflowBuilder()
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
        .build();
```

#### Load a file JSON/YAML to a Workflow instance

```typescript
    const workflow = BaseWorkflow.fromSource(source)
```
Where `source` is the file location.



#### Parse a Workflow instance to JSON/YAML

Having the following workflow instance:

```typescript
    const workflow = new WorkflowBuilder()
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
        .build();
```

You can convert it to its string representation in JSON or YAML format 
by using the static methods `toJSON` or `toYAML` respectively:

```typescript
    const workflowAsJSON = BaseWorkflow.toJSON(workflow);
```

```typescript
    const workflowAsYAML = BaseWorkflow.toYAML(workflow);
```



