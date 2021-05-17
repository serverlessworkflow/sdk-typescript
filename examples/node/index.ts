import { workflowBuilder, injectstateBuilder, Specification } from '../../dist';
const workflow: Specification.Workflow = workflowBuilder()
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
  .build();
console.log(workflow.id);
