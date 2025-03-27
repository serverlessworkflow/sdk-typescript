import { buildGraph } from '../../src/lib/graph-builder';
import { Classes } from '../../src/lib/generated/classes';

describe('Graph - Set task', () => {
  it('should build a graph for a workflow with a Set task', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '1.0.0'
  namespace: test
  name: set
  version: '0.1.0'
do:
  - initialize:
      set:
        foo: bar`);
    const graph = buildGraph(workflow);
    expect(graph).toBeDefined();
    expect(graph.nodes.length).toBe(3); // start --> initialize --> end
    expect(graph.edges.length).toBe(2);
  });

  it('should build a graph for a workflow with a Set task', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '1.0.0'
  namespace: test
  name: set
  version: '0.1.0'
do:
  - step1:
      set:
        foo: bar
  - step2:
      set:
        foo2: bar
  - step3:
      set:
        foo3: bar`);
    const graph = buildGraph(workflow);
    expect(graph).toBeDefined();
    expect(graph.nodes.length).toBe(5); // start --> step1 --> step2 --> step3 --> end
    expect(graph.edges.length).toBe(4);
  });
});
