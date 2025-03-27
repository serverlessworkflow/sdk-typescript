import { Specification } from '../../src';
import { Classes } from '../../src/lib/generated/classes';
import { buildGraph, Graph } from '../../src/lib/graph-builder';

describe('Workflow to Graph', () => {
  it('should build a graph for a workflow with a Set task, using the buildGraph function', () => {
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

  it('should build a graph for a workflow with a Set task, using the instance method', () => {
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
    const graph = workflow.toGraph();
    expect(graph).toBeDefined();
    expect(graph.nodes.length).toBe(3); // start --> initialize --> end
    expect(graph.edges.length).toBe(2);
  });

  it('should build a graph for a workflow with a Set task, using the static method', () => {
    const workflow = {
      document: {
        dsl: '1.0.0',
        name: 'set',
        version: '1.0.0',
        namespace: 'test',
      },
      do: [
        {
          initialize: {
            set: {
              foo: 'bar',
            },
          },
        },
      ],
    } as Specification.Workflow;
    const graph = Classes.Workflow.toGraph(workflow);
    expect(graph).toBeDefined();
    expect(graph.nodes.length).toBe(3); // start --> initialize --> end
    expect(graph.edges.length).toBe(2);
  });

  it('should build a graph for a workflow with multiple Set tasks', () => {
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

  it('should build a graph for a workflow with a task containing an If clause, producing an alternative edge', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '1.0.0'
  namespace: test
  name: set
  version: '0.1.0'
do:
  - initialize:
      if: \${ input.data == true }
      set:
        foo: bar`);
    const graph = buildGraph(workflow);
    expect(graph).toBeDefined();
    expect(graph.nodes.length).toBe(3); // start --> initialize --> end
    expect(graph.edges.length).toBe(3); //       ----------------->
    expect(graph.edges.filter((e) => e.label === '${ input.data == true }').length).toBe(1);
  });

  it('should build a graph for a workflow with a For task, producing a subgraph', () => {
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
