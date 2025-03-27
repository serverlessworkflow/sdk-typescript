import { Classes } from '../../src/lib/generated/classes';
import { convertToMermaidCode } from '../../src';

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

const expectedOutput = `flowchart TD
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


classDef hidden display: none;`.trim();

describe('Mermaid Diagram - For task', () => {
  it('should build a Mermaid diagram for a workflow with a For task', () => {
    const workflow = Classes.Workflow.deserialize(workflowDefinition);
    const mermaidCode = convertToMermaidCode(workflow).trim();
    expect(mermaidCode).toBe(expectedOutput);
  });
});
