import { buildGraph, Graph } from '../../src/lib/graph-builder';
import { Classes } from '../../src/lib/generated/classes';

const workflowDefinition = `
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
              as: '.pets + [{ "id": $pet.id }]'`;

describe('Graph - For task', () => {
  it('should build a graph for a workflow with a For task', () => {
    const workflow = Classes.Workflow.deserialize(workflowDefinition);
    const graph = buildGraph(workflow);
    const forSubgraph = graph.nodes.find((node) => node.label === 'checkup') as Graph;
    expect(graph).toBeDefined();
    expect(graph.nodes.length).toBe(3); // start --> checkup --> end
    expect(graph.edges.length).toBe(2);

    expect(forSubgraph).toBeDefined();
    expect(forSubgraph.nodes.length).toBe(3); // entry --> waitForCheckup --> exit
    expect(forSubgraph.edges.length).toBe(2);
  });
});
