import { Classes } from '../../src/lib/generated/classes';
import { buildGraph } from '../../src/lib/graph-builder';

describe('Workflow to Simplified Graph', () => {
  it('should build a simplified graph for a workflow with a Set task, using the buildGraph function', () => {
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
    const graph = buildGraph(workflow, true, true);
    expect(graph).toBeDefined();
    expect(graph.nodes.length).toBe(3); // start --> initialize --> end
    expect(graph.edges.length).toBe(2);
  });

  it('should build a simplified graph for a workflow with a For task, producing a subgraph', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '1.0.0'
  namespace: test
  name: for-example
  version: '0.1.0'
do:
  - checkup:
      for:
        each: pet
        in: .pets
        at: index
      while: .vet != null
      do:
        - waitForCheckup:
            listen:
              to:
                one:
                  with:
                    type: com.fake.petclinic.pets.checkup.completed.v2
            output:
              as: '.pets + [{ "id": $pet.id }]'`);
    const graph = buildGraph(workflow, true, true);
    expect(graph).toBeDefined();
    expect(graph.nodes.length).toBe(4); // start --[--> waitForCheckup --]--> end
    expect(graph.edges.length).toBe(2);
  });
});
