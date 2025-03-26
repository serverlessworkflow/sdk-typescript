import { Workflow } from './generated/definitions/specification';
import { buildGraph, Graph, GraphEdge, GraphNode, GraphNodeType } from './graph-builder';

const indent = (code: string) =>
  code
    .split('\n')
    .map((line) => `    ${line}`)
    .join('\n');

function convertGraphToCode(graph: Graph): string {
  const isRoot: boolean = graph.id === 'root';
  const code = `${isRoot ? 'flowchart TD' : `subgraph ${graph.id} [${graph.label || graph.id}]`}
${graph.nodes.map((node) => convertNodeToCode(node)).join('\n')}
${graph.edges.map((edge) => convertEdgeToCode(edge)).join('\n')}
${isRoot ? '' : 'end'}`;
  return isRoot ? code : indent(code);
}

function convertNodeToCode(node: GraphNode | Graph): string {
  let code = '';
  if ((node as Graph).nodes?.length) {
    code = convertGraphToCode(node as Graph);
  } else {
    code = node.id;
    switch (node.type) {
      case GraphNodeType.Entry:
      case GraphNodeType.Exit:
        code += ':::hidden';
        break;
      case GraphNodeType.Start:
        code += '(( ))'; // alt '@{ shape: circle, label: " "}';
        break;
      case GraphNodeType.End:
        code += '((( )))'; // alt '@{ shape: dbl-circ, label: " "}';
        break;
      default:
        code += `["${node.label}"]`; // alt `@{ label: "${node.label}" }`
    }
  }
  return indent(code);
}

function convertEdgeToCode(edge: GraphEdge): string {
  const code = `${edge.sourceId}${edge.label ? `--"${edge.label}"` : ''}--${edge.ignoreEndArrow ? '-' : '>'}${edge.destinationId}`;
  return indent(code);
}

export function convertToMermaidCode(workflow: Workflow): string {
  const graph = buildGraph(workflow);
  return convertGraphToCode(graph);
}
