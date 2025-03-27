import { Classes } from '../../src/lib/generated/classes';
import { convertToMermaidCode } from '../../src';

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

const expectedOutput = `flowchart TD
    root-entry-node(( ))
    root-exit-node((( )))
    /do/0/initialize["initialize"]
    /do/0/initialize --> root-exit-node
    root-entry-node --"\${ input.data == true }"--> /do/0/initialize
    root-entry-node --> root-exit-node


classDef hidden display: none;`.trim();

describe('Mermaid Diagram - If clause', () => {
  it('should build a Mermaid diagram with an alternative, labelled, edge', () => {
    const workflow = Classes.Workflow.deserialize(workflowDefinition);
    const mermaidCode = convertToMermaidCode(workflow).trim();
    expect(mermaidCode).toBe(expectedOutput);
  });
});
