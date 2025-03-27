import { Classes } from '../../src/lib/generated/classes';
import { Specification } from '../../src/lib/generated/definitions';
import { convertToMermaidCode, MermaidDiagram } from '../../src/lib/mermaid-converter';

describe('Workflow to MermaidJS Flowchart', () => {
  it('should build a Mermaid diagram for a workflow with a Set task, using the convertToMermaidCode function', () => {
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
    const mermaidCode = convertToMermaidCode(workflow).trim();
    expect(mermaidCode).toBe(
      `flowchart TD
    root-entry-node(( ))
    root-exit-node((( )))
    /do/0/initialize["initialize"]
    /do/0/initialize --> root-exit-node
    root-entry-node --> /do/0/initialize


classDef hidden display: none;`.trim(),
    );
  });

  it('should build a Mermaid diagram for a workflow with a Set task, using the instance method', () => {
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
    const mermaidCode = workflow.toMermaidCode().trim();
    expect(mermaidCode).toBe(
      `flowchart TD
    root-entry-node(( ))
    root-exit-node((( )))
    /do/0/initialize["initialize"]
    /do/0/initialize --> root-exit-node
    root-entry-node --> /do/0/initialize


classDef hidden display: none;`.trim(),
    );
  });

  it('should build a Mermaid diagram for a workflow with a Set task, using the static method', () => {
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
    const mermaidCode = Classes.Workflow.toMermaidCode(workflow).trim();
    expect(mermaidCode).toBe(
      `flowchart TD
    root-entry-node(( ))
    root-exit-node((( )))
    /do/0/initialize["initialize"]
    /do/0/initialize --> root-exit-node
    root-entry-node --> /do/0/initialize


classDef hidden display: none;`.trim(),
    );
  });

  it('should build a Mermaid diagram for a workflow with a Set task, using the legacy MermaidDiagram class', () => {
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
    const mermaidCode = new MermaidDiagram(workflow).sourceCode().trim();
    expect(mermaidCode).toBe(
      `flowchart TD
    root-entry-node(( ))
    root-exit-node((( )))
    /do/0/initialize["initialize"]
    /do/0/initialize --> root-exit-node
    root-entry-node --> /do/0/initialize


classDef hidden display: none;`.trim(),
    );
  });

  it('should build a Mermaid diagram with an alternative, labelled, edge', () => {
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
    const mermaidCode = convertToMermaidCode(workflow).trim();
    expect(mermaidCode).toBe(
      `flowchart TD
    root-entry-node(( ))
    root-exit-node((( )))
    /do/0/initialize["initialize"]
    /do/0/initialize --> root-exit-node
    root-entry-node --"\${ input.data == true }"--> /do/0/initialize
    root-entry-node --> root-exit-node


classDef hidden display: none;`.trim(),
    );
  });

  it('should build a Mermaid diagram for a workflow with a For task', () => {
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
    const mermaidCode = convertToMermaidCode(workflow).trim();
    expect(mermaidCode).toBe(
      `flowchart TD
    root-entry-node(( ))
    root-exit-node((( )))
    subgraph /do/0/checkup ["checkup"]
        /do/0/checkup-entry-node:::hidden
        /do/0/checkup-exit-node:::hidden
        /do/0/checkup/for/do/0/waitForCheckup["waitForCheckup"]
        /do/0/checkup/for/do/0/waitForCheckup --- /do/0/checkup-exit-node
        /do/0/checkup-entry-node --> /do/0/checkup/for/do/0/waitForCheckup
    end
    /do/0/checkup-exit-node --> root-exit-node
    root-entry-node --- /do/0/checkup-entry-node


classDef hidden display: none;`.trim(),
    );
  });
});
