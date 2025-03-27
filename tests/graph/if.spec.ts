import { buildGraph } from '../../src/lib/graph-builder';
import { Classes } from '../../src/lib/generated/classes';

const workflowDefinition = `
document:
  dsl: '1.0.0'
  namespace: test
  name: set
  version: '0.1.0'
do:
  - initialize:
      if: \${ input.data == true }
      set:
        foo: bar`;

describe('Graph - If clause', () => {
  it('should build a graph for a workflow with a task containing an If clause, producing an alternative edge', () => {
    const workflow = Classes.Workflow.deserialize(workflowDefinition);
    const graph = buildGraph(workflow);
    expect(graph).toBeDefined();
    expect(graph.nodes.length).toBe(3); // start --> initialize --> end
    expect(graph.edges.length).toBe(3); //       ----------------->
    expect(graph.edges.filter((e) => e.label === '${ input.data == true }').length).toBe(1);
  });
});
