# Serverless Workflow Specification - Typescript SDK

Provides the Java API/SPI for the [Serverless Workflow Specification](https://github.com/serverlessworkflow/specification)


With the SDK you can:
* Parse workflow JSON and YAML definitions
* (_WIP_) Programmatically build workflow definitions


## Getting Started


### Building locally

To build the project and run tests locally:

```
git clone https://github.com/serverlessworkflow/sdk-typescript.git
npm install && npm run test
```


### Add as dependency to your project
```sh
npm install sdk-typescript
```


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
Where source is the file location.



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
    const workFlowAsYAML = BaseWorkflow.toYAML(workflow);
```



