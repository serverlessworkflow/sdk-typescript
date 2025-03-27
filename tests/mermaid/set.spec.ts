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
      set:
        foo: bar`;

const expectedOutput = `flowchart TD
    root-entry-node(( ))
    root-exit-node((( )))
    /do/0/initialize["initialize"]
    /do/0/initialize --> root-exit-node
    root-entry-node --> /do/0/initialize


classDef hidden display: none;`.trim();

describe('Mermaid Diagram - Set task', () => {
  it('should build a Mermaid diagram for a workflow with a Set task', () => {
    const workflow = Classes.Workflow.deserialize(workflowDefinition);
    const mermaidCode = convertToMermaidCode(workflow).trim();
    expect(mermaidCode).toBe(expectedOutput);
  });
});
