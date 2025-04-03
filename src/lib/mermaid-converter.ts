import { Workflow } from './generated/definitions/specification';
import { buildGraph, Graph, GraphEdge, GraphNode, GraphNodeType } from './graph-builder';

/**
 * Adds indentation to each line of the provided code
 * @param code The code to indent
 * @returns The indented code
 */
const indent = (code: string) =>
  code
    .split('\n')
    .map((line) => `    ${line}`)
    .join('\n');

/**
 * Converts a graph to Mermaid code
 * @param graph The graph to convert
 * @param root The root graph
 * @returns The converted graph
 */
function convertGraphToCode(graph: Graph, root: Graph): string {
  const isRoot: boolean = graph === root;
  const nodes = isRoot ? graph.nodes : root.nodes.filter((node) => node.parent?.id === graph.id);
  const edges = isRoot ? graph.edges : [];
  const code = `${isRoot ? 'flowchart TD' : `subgraph ${graph.id} ["${graph.label || graph.id}"]`}
${indent(nodes.map((node) => convertNodeToCode(node, root)).join('\n'))}
${indent(edges.map((edge) => convertEdgeToCode(edge)).join('\n'))}
${isRoot ? '' : 'end'}`;
  return code;
}

/**
 * Converts a node to Mermaid code
 * @param node The node to convert
 * @param graph The root graph
 * @returns The converted node
 */
function convertNodeToCode(node: GraphNode | Graph, root: Graph): string {
  let code = '';
  if (root.nodes.filter((n) => n.parent?.id === node.id).length) {
    code = convertGraphToCode(node as Graph, root);
  } else {
    code = node.id;
    switch (node.type) {
      case GraphNodeType.Entry: // shouldn't exist in a simplified graph
      case GraphNodeType.Exit:
        code += '[ ]:::hidden';
        break;
      case GraphNodeType.Start:
        code += '(( ))'; // alt '@{ shape: circle, label: " "}';
        break;
      case GraphNodeType.End:
        code += '((( )))'; // alt '@{ shape: dbl-circ, label: " "}';
        break;
      default:
        code += `["${node.label || ' '}"]`; // alt `@{ label: "${node.label}" }`
    }
  }
  return code;
}

/**
 * Converts an edge to Mermaid code
 * @param edge The edge to convert
 * @returns The converted edge
 */
function convertEdgeToCode(edge: GraphEdge): string {
  const ignoreEndArrow =
    !edge.targetId.startsWith('root') &&
    (edge.targetId.endsWith('-entry-node') || edge.targetId.endsWith('-exit-node'));
  const code = `${edge.sourceId} ${edge.label ? `--"${edge.label}"` : ''}--${ignoreEndArrow ? '-' : '>'} ${edge.targetId}`;
  return code;
}

/**
 * Converts the provided workflow to Mermaid code
 * @param workflow The workflow to convert
 * @returns The Mermaid diagram
 */
export function convertToMermaidCode(workflow: Workflow): string {
  const graph = buildGraph(workflow, true);
  return (
    convertGraphToCode(graph, graph) +
    `

classDef hidden width: 1px, height: 1px;` // should be "classDef hidden display: none;" but it can induce a Mermaid bug - https://github.com/mermaid-js/mermaid/issues/6452
  );
}

/**
 * Represents a Mermaid diagram generator for a given workflow.
 * This class takes a workflow definition and converts it into a Mermaid.js-compatible diagram.
 */
export class MermaidDiagram {
  constructor(private workflow: Workflow) {}

  /**
   * Generates the Mermaid code representation of the workflow.
   * @returns The Mermaid diagram source code as a string.
   */
  sourceCode(): string {
    return convertToMermaidCode(this.workflow);
  }
}
