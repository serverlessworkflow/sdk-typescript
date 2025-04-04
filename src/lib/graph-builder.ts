import {
  CallTask,
  DoTask,
  EmitTask,
  ForkTask,
  ForTask,
  ListenTask,
  RaiseTask,
  RunTask,
  SetTask,
  SwitchTask,
  Task,
  TaskItem,
  TryTask,
  WaitTask,
  Workflow,
} from './generated/definitions/specification';

const entrySuffix = '-entry-node';
const exitSuffix = '-exit-node';

const rootId = 'root';

const doReference = '/do';
const forReference = '/for';
const catchReference = '/catch';
const branchReference = '/fork/branches';
const tryReference = '/try';

/**
 * Represents a generic within a graph.
 * This serves as a base type for nodes, edges, and graphs.
 */
export type GraphElement = {
  /** A unique identifier for this graph element. */
  id: string;
  /** An optional label to provide additional context or naming. */
  label?: string;
};

/**
 * Enumeration of possible node types in a graph.
 */
export enum GraphNodeType {
  Root = 'root',
  Start = 'start',
  End = 'end',
  Entry = 'entry',
  Exit = 'exit',
  Call = 'call',
  Catch = 'catch',
  Do = 'do',
  Emit = 'emit',
  For = 'for',
  Fork = 'fork',
  Listen = 'listen',
  Raise = 'raise',
  Run = 'run',
  Set = 'set',
  Switch = 'switch',
  Try = 'try',
  TryCatch = 'try-catch',
  Wait = 'wait',
}

/**
 * Represents a node within the graph.
 */
export type GraphNode = GraphElement & {
  /** The type of the node. */
  type: GraphNodeType;
  /** The parent graph, if any. */
  parent?: Graph;
  /** The related task */
  task?: Task;
};

/**
 * Represents a directed edge connecting two nodes in the graph.
 */
export type GraphEdge = GraphElement & {
  /** The unique identifier of the node where the edge originates. */
  sourceId: string;
  /** The unique identifier of the node where the edge terminates. */
  targetId: string;
};

/**
 * Represents a graph or a subgraph.
 */
export type Graph = GraphNode & {
  /** A collection of nodes that belong to this graph. */
  nodes: GraphNode[];
  /** A collection of edges that define relationships between nodes. */
  edges: GraphEdge[];
  /** The entry node of the graph, if any. */
  entryNode?: GraphNode;
  /** The exit node of the graph, if any. */
  exitNode?: GraphNode;
};

/**
 * Context information used when processing tasks in a workflow graph.
 */
type TaskContext = {
  /** The parent graph the node will be added to. */
  graph: Graph;
  /** The reference of the task list. */
  taskListReference: string;
  /** The list of sibling tasks. */
  taskList: Map<string, Task>;
  /** The current task name. */
  taskName?: string;
  /** The current reference. */
  taskReference: string;
  /** The ids of edges already visited */
  knownEdges: GraphEdge[];
};

/**
 * Identity information for a transition between tasks.
 */
type TransitionInfo = {
  /** Name of the task to transition to. */
  name: string;
  /** Index position in the task list. */
  index: number;
  /** Optional reference to the associated task. */
  task?: Task;
  /** Optional label of the transition. */
  label?: string;
};

/**
 * Enumeration of possible workflow flow directives.
 */
enum FlowDirective {
  Exit = 'exit',
  End = 'end',
  Continue = 'continue',
}

/**
 * Converts an array of TaskItem objects into a Map for easy lookup.
 *
 * @param tasksList An array of TaskItem objects.
 * @returns A map where keys are task names and values are Task objects.
 */
function mapTasks(tasksList: TaskItem[] | undefined): Map<string, Task> {
  return (tasksList || []).reduce((acc, item) => {
    const [key, task] = Object.entries(item)[0];
    acc.set(key, task);
    return acc;
  }, new Map<string, Task>());
}

/**
 * Initializes a graph with default entry and exit nodes.
 *
 * @param type The type of the graph node.
 * @param id Unique identifier for the graph.
 * @param task The related task
 * @param label Optional label for the graph.
 * @param parent Optional parent graph if this is a subgraph.
 * @returns A newly created Graph instance.
 */
function initGraph(
  type: GraphNodeType,
  id: string = rootId,
  task: Task | undefined = undefined,
  label: string | undefined = undefined,
  parent: Graph | undefined = undefined,
): Graph {
  const graph: Graph = {
    id,
    label,
    type,
    parent,
    task,
    nodes: [],
    edges: [],
  };
  const entryNode: GraphNode = {
    type: id === rootId ? GraphNodeType.Start : GraphNodeType.Entry,
    id: `${id}${entrySuffix}`,
    parent: graph,
  };
  const exitNode: GraphNode = {
    type: id === rootId ? GraphNodeType.End : GraphNodeType.Exit,
    id: `${id}${exitSuffix}`,
    parent: graph,
  };
  graph.entryNode = entryNode;
  graph.exitNode = exitNode;
  graph.nodes = [entryNode, exitNode];
  if (parent) parent.nodes.push(graph);
  return graph;
}

/**
 * Gets the next task to be executed in the workflow
 * @param tasksList The list of task to resolve the next task from
 * @param taskName The current task name, if any
 * @param transition A specific transition, if any
 * @returns
 */
function getNextTask(
  tasksList: Map<string, Task>,
  taskName: string | undefined = undefined,
  transition: string | undefined = undefined,
): TransitionInfo {
  if (!tasksList?.size) throw new Error('The task list cannot be empty. No tasks list to get the next task from.');
  const currentTask: Task | undefined = tasksList.get(taskName || '');
  transition = transition || currentTask?.then || '';
  if (transition == FlowDirective.End || transition == FlowDirective.Exit) {
    return {
      name: transition,
      index: -1,
    };
  }
  let index: number = 0;
  if (transition && transition != FlowDirective.Continue) {
    index = Array.from(tasksList.keys()).indexOf(transition);
  } else if (currentTask) {
    index = Array.from(tasksList.values()).indexOf(currentTask) + 1;
    if (index >= tasksList.size) {
      return {
        name: FlowDirective.Exit,
        index: -1,
      };
    }
  }
  const taskEntry = Array.from(tasksList.entries())[index];
  return {
    index,
    name: taskEntry[0],
    task: taskEntry[1],
  };
}

/**
 * Returns the root exit node.
 * @param graph
 * @returns
 */
function getEndNode(graph: Graph): GraphNode {
  let rootGraph = graph;
  while (rootGraph.id !== rootId) {
    if (!graph.parent) throw new Error(`Unable to reach root graph from graph id '${graph.id}'`);
    rootGraph = graph.parent;
  }
  if (!rootGraph.exitNode) throw new Error('The root graph should have an exit node.');
  return rootGraph.exitNode;
}

/**
 * Builds the provided transition from the source node
 * @param sourceNode The node to build the transition from
 * @param transition The transition to follow
 * @param context The context in which the transition is built
 */
function buildTransition(sourceNode: GraphNode | Graph, transition: TransitionInfo, context: TaskContext) {
  const exitAnchor = (sourceNode as Graph).exitNode || sourceNode;
  if (transition.index != -1) {
    const targetNode = buildTaskNode({
      ...context,
      taskReference: `${context.taskListReference}/${transition.index}/${transition.name}`,
      taskName: transition.name,
    });
    buildEdge(
      context.graph,
      context.knownEdges,
      exitAnchor,
      (targetNode as Graph).entryNode || targetNode,
      transition.label,
    );
  } else if (transition.name === FlowDirective.Exit) {
    if (!context.graph.exitNode) throw new Error(`Missing exit node on graph id '${context.graph.id}'`);
    buildEdge(context.graph, context.knownEdges, exitAnchor, context.graph.exitNode, transition.label);
  } else if (transition.name === FlowDirective.End) {
    buildEdge(context.graph, context.knownEdges, exitAnchor, getEndNode(context.graph), transition.label);
  } else throw new Error('Invalid transition');
}

/**
 * Builds all the possible transitions from the provided node in the provided context
 * @param sourceNode The node to build the transitions from
 * @param context The context in which the transitions are built
 */
function buildTransitions(sourceNode: GraphNode | Graph, context: TaskContext) {
  const transitions: TransitionInfo[] = [];
  let nextTransition = getNextTask(context.taskList, context.taskName);
  transitions.push(nextTransition);
  while (nextTransition?.task?.if) {
    nextTransition.label = nextTransition?.task?.if;
    nextTransition = getNextTask(context.taskList, nextTransition.name, FlowDirective.Continue);
    transitions.push(nextTransition);
  }
  transitions
    .filter(
      (transition, index) =>
        transitions.findIndex(
          (t) => t.index === transition.index && t.name === transition.name && t.task === transition.task,
        ) === index,
    )
    .forEach((transition) => buildTransition(sourceNode, transition, context));
}

/**
 * Builds a graph representation of a task
 * @param context The context to build the graph/node for
 * @returns A graph or node for the provided context
 */
function buildTaskNode(context: TaskContext): GraphNode | Graph {
  const existingNode = context.graph.nodes.find((node) => node.id === context.taskReference);
  if (existingNode) return existingNode;
  const task = context.taskList.get(context.taskName!);
  if (!task) throw new Error(`Unabled to find the task '${context.taskName}' in the current context`);
  if (task.call) return buildCallTaskNode(task, context);
  if (task.catch) return buildTryCatchTaskNode(task, context);
  if (task.emit) return buildEmitTaskNode(task, context);
  if (task.for) return buildForTaskNode(task, context);
  if (task.fork) return buildForkTaskNode(task, context);
  if (task.listen) return buildListenTaskNode(task, context);
  if (task.raise) return buildRaiseTaskNode(task, context);
  if (task.run) return buildRunTaskNode(task, context);
  if (task.set) return buildSetTaskNode(task, context);
  if (task.switch) return buildSwitchTaskNode(task, context);
  if (task.wait) return buildWaitTaskNode(task, context);
  if (task.do) return buildDoTaskNode(task, context);
  throw new Error(`Unable to defined task type of task named '${context.taskName}'`);
}

/**
 * Builds a graph node with the provided type and context
 * @param type The type of the node
 * @param context The context to build the graph node for
 * @returns A graph node for the provided context
 */
function buildGenericTaskNode(task: Task, type: GraphNodeType, context: TaskContext): GraphNode {
  const node: GraphNode = {
    task,
    type,
    parent: context.graph,
    id: context.taskReference,
    label: context.taskName,
  };
  context.graph.nodes.push(node);
  buildTransitions(node, context);
  return node;
}

/**
 * Builds a graph node for the provided call task
 * @param task The task to build the graph node for
 * @param context The context to build the graph node for
 * @returns A graph node for the provided task
 */
function buildCallTaskNode(task: CallTask, context: TaskContext): GraphNode {
  const node = buildGenericTaskNode(task, GraphNodeType.Call, context);
  // TODO: add some details about the task?
  return node;
}

/**
 * Builds a graph for the provided do task
 * @param task The task to build the graph for
 * @param context The context to build the graph for
 * @returns A graph for the provided task
 */
function buildDoTaskNode(task: DoTask, context: TaskContext): Graph {
  const subgraph: Graph = initGraph(GraphNodeType.Do, context.taskReference, task, context.taskName, context.graph);
  const doContext: TaskContext = {
    ...context,
    graph: subgraph,
    taskListReference: context.taskReference + doReference,
    taskList: mapTasks(task.do),
    taskName: undefined,
  };
  if (!subgraph.entryNode) throw new Error(`Missing 'entryNode' on graph id '${subgraph.id}'`);
  buildTransitions(subgraph.entryNode, doContext);
  buildTransitions(subgraph, context);
  return subgraph;
}

/**
 * Builds a graph node for the provided emit task
 * @param task The task to build the graph node for
 * @param context The context to build the graph node for
 * @returns A graph node for the provided task
 */
function buildEmitTaskNode(task: EmitTask, context: TaskContext): GraphNode {
  const node = buildGenericTaskNode(task, GraphNodeType.Emit, context);
  // TODO: add some details about the task?
  return node;
}

/**
 * Builds a graph for the provided for task
 * @param task The task to build the graph for
 * @param context The context to build the graph for
 * @returns A graph for the provided task
 */
function buildForTaskNode(task: ForTask, context: TaskContext): Graph {
  const subgraph: Graph = initGraph(GraphNodeType.For, context.taskReference, task, context.taskName, context.graph);
  const forContext: TaskContext = {
    ...context,
    graph: subgraph,
    taskListReference: subgraph.id + forReference + doReference,
    taskList: mapTasks(task.do),
    taskName: undefined,
  };
  if (!subgraph.entryNode) throw new Error(`Missing 'entryNode' on graph id '${subgraph.id}'`);
  buildTransitions(subgraph.entryNode, forContext);
  buildTransitions(subgraph, context);
  return subgraph;
}

/**
 * Builds a graph for the provided fork task
 * @param task The task to build the graph for
 * @param context The context to build the graph for
 * @returns A graph for the provided task
 */
function buildForkTaskNode(task: ForkTask, context: TaskContext): Graph {
  const subgraph: Graph = initGraph(GraphNodeType.Fork, context.taskReference, task, context.taskName, context.graph);
  for (let i = 0, c = task.fork?.branches.length || 0; i < c; i++) {
    const branchItem = task.fork?.branches[i];
    if (!branchItem) continue;
    const [branchName] = Object.entries(branchItem)[0];
    const branchContext: TaskContext = {
      ...context,
      graph: subgraph,
      taskListReference: `${context.taskReference}${branchReference}`,
      taskList: mapTasks([branchItem]),
      taskReference: `${context.taskReference}${branchReference}/${i}/${branchName}`,
      taskName: branchName,
    };
    const branchNode = buildTaskNode(branchContext);
    if (!subgraph.entryNode) throw new Error(`Missing 'entryNode' on graph id '${subgraph.id}'`);
    if (!subgraph.exitNode) throw new Error(`Missing 'exitNode' on graph id '${subgraph.id}'`);
    buildEdge(subgraph, context.knownEdges, subgraph.entryNode, (branchNode as Graph).entryNode || branchNode);
    buildEdge(subgraph, context.knownEdges, (branchNode as Graph).exitNode || branchNode, subgraph.exitNode);
  }
  buildTransitions(subgraph, context);
  return subgraph;
}

/**
 * Builds a graph node for the provided listen task
 * @param task The task to build the graph node for
 * @param context The context to build the graph node for
 * @returns A graph node for the provided task
 */
function buildListenTaskNode(task: ListenTask, context: TaskContext): GraphNode {
  const node = buildGenericTaskNode(task, GraphNodeType.Listen, context);
  // TODO: add some details about the task?
  return node;
}

/**
 * Builds a graph node for the provided rasie task
 * @param task The task to build the graph node for
 * @param context The context to build the graph node for
 * @returns A graph node for the provided task
 */
function buildRaiseTaskNode(task: RaiseTask, context: TaskContext): GraphNode {
  const node = buildGenericTaskNode(task, GraphNodeType.Raise, context);
  // TODO: add some details about the task?
  return node;
}

/**
 * Builds a graph node for the provided run task
 * @param task The task to build the graph node for
 * @param context The context to build the graph node for
 * @returns A graph node for the provided task
 */
function buildRunTaskNode(task: RunTask, context: TaskContext): GraphNode {
  const node = buildGenericTaskNode(task, GraphNodeType.Run, context);
  // TODO: add some details about the task?
  return node;
}

/**
 * Builds a graph node for the provided set task
 * @param task The task to build the graph node for
 * @param context The context to build the graph node for
 * @returns A graph node for the provided task
 */
function buildSetTaskNode(task: SetTask, context: TaskContext): GraphNode {
  const node = buildGenericTaskNode(task, GraphNodeType.Set, context);
  // TODO: add some details about the task?
  return node;
}

/**
 * Builds a graph node for the provided switch task
 * @param task The task to build the graph node for
 * @param context The context to build the graph node for
 * @returns A graph node for the provided task
 */
function buildSwitchTaskNode(task: SwitchTask, context: TaskContext): GraphNode {
  const node: GraphNode = buildGenericTaskNode(task, GraphNodeType.Switch, context);
  let hasDefaultCase = false;
  task.switch?.forEach((switchItem) => {
    const [caseName, switchCase] = Object.entries(switchItem)[0];
    if (!switchCase.when) hasDefaultCase = true;
    const transition = getNextTask(context.taskList, context.taskName, switchCase.then);
    transition.label = caseName;
    buildTransition(node, transition, context);
  });
  if (!hasDefaultCase) {
    buildTransitions(node, context);
  }
  return node;
}

/**
 * Builds a graph for the provided try/catch task
 * @param task The task to build the graph for
 * @param context The context to build the graph for
 * @returns A graph for the provided task
 */
function buildTryCatchTaskNode(task: TryTask, context: TaskContext): Graph {
  const containerSubgraph: Graph = initGraph(
    GraphNodeType.TryCatch,
    context.taskReference,
    task,
    context.taskName,
    context.graph,
  );
  const trySubgraph: Graph = initGraph(
    GraphNodeType.Try,
    context.taskReference + tryReference,
    task,
    context.taskName + ' (try)',
    containerSubgraph,
  );
  if (!containerSubgraph.entryNode) throw new Error(`Missing 'entryNode' on graph id '${containerSubgraph.id}'`);
  if (!trySubgraph.entryNode) throw new Error(`Missing 'entryNode' on graph id '${trySubgraph.id}'`);
  buildEdge(containerSubgraph, context.knownEdges, containerSubgraph.entryNode, trySubgraph.entryNode);
  const tryContext: TaskContext = {
    ...context,
    graph: trySubgraph,
    taskListReference: trySubgraph.id,
    taskList: mapTasks(task.try),
    taskName: undefined,
  };
  if (!trySubgraph.entryNode) throw new Error(`Missing 'entryNode' on graph id '${trySubgraph.id}'`);
  buildTransitions(trySubgraph.entryNode, tryContext);
  if (!task.catch?.do?.length) {
    const catchNode: GraphNode = {
      task,
      type: GraphNodeType.Catch,
      parent: containerSubgraph,
      id: context.taskReference + catchReference,
      label: context.taskName + ' (catch)',
    };
    containerSubgraph.nodes.push(catchNode);
    if (!trySubgraph.exitNode) throw new Error(`Missing 'exitNode' on graph id '${trySubgraph.id}'`);
    if (!containerSubgraph.exitNode) throw new Error(`Missing 'exitNode' on graph id '${containerSubgraph.id}'`);
    buildEdge(containerSubgraph, context.knownEdges, trySubgraph.exitNode, catchNode);
    buildEdge(containerSubgraph, context.knownEdges, catchNode, containerSubgraph.exitNode);
  } else {
    const catchSubgraph: Graph = initGraph(
      GraphNodeType.Catch,
      context.taskReference + catchReference + doReference,
      task,
      context.taskName + ' (catch)',
      containerSubgraph,
    );
    if (!trySubgraph.exitNode) throw new Error(`Missing 'exitNode' on graph id '${trySubgraph.id}'`);
    if (!catchSubgraph.entryNode) throw new Error(`Missing 'entryNode' on graph id '${catchSubgraph.entryNode}'`);
    buildEdge(containerSubgraph, context.knownEdges, trySubgraph.exitNode, catchSubgraph.entryNode);
    const catchContext: TaskContext = {
      ...context,
      graph: catchSubgraph,
      taskListReference: catchSubgraph.id,
      taskList: mapTasks(task.catch.do),
      taskName: undefined,
    };
    buildTransitions(catchSubgraph.entryNode, catchContext);
    if (!catchSubgraph.exitNode) throw new Error(`Missing 'exitNode' on graph id '${catchSubgraph.exitNode}'`);
    if (!containerSubgraph.exitNode) throw new Error(`Missing 'exitNode' on graph id '${containerSubgraph.exitNode}'`);
    buildEdge(containerSubgraph, context.knownEdges, catchSubgraph.exitNode, containerSubgraph.exitNode);
  }
  buildTransitions(containerSubgraph, context);
  return containerSubgraph;
}

/**
 * Builds a graph node for the provided wait task
 * @param task The task to build the graph node for
 * @param context The context to build the graph node for
 * @returns A graph node for the provided task
 */
function buildWaitTaskNode(task: WaitTask, context: TaskContext): GraphNode {
  const node = buildGenericTaskNode(task, GraphNodeType.Wait, context);
  // TODO: add some details about the task?
  return node;
}

/**
 * Builds an edge between two elements
 * @param graph The graph element containing the nodes
 * @param source The origin node
 * @param target The target node
 * @param label The edge label, if any
 */
function buildEdge(graph: Graph, knownEdges: GraphEdge[], source: GraphNode, target: GraphNode, label: string = '') {
  let edge = knownEdges.find((e) => e.sourceId === source.id && e.targetId === target.id);
  if (edge) {
    if (label && !edge.label?.includes(label)) {
      edge.label = edge.label + (edge.label ? ' / ' : '') + label;
    }
  }
  edge = {
    label,
    id: `${source.id}-${target.id}${label ? `-${label}` : ''}`,
    sourceId: source.id,
    targetId: target.id,
  };
  graph.edges.push(edge);
  knownEdges.push(edge);
}

/**
 * Remaps edges by getting rid of routes leading to entry/exit nodes
 * @param edges
 */
export const remapEdges = (edges: GraphEdge[]): GraphEdge[] => {
  let remappedEdges = [...edges.map((e) => ({ ...e }))];
  const leadsToPort = (edge: GraphEdge) =>
    edge.targetId !== 'root-exit-node' &&
    (edge.targetId.endsWith('-entry-node') || edge.targetId.endsWith('-exit-node'));
  const isPortToPort = (edge: GraphEdge) =>
    edge.sourceId !== 'root-entry-node' &&
    edge.targetId !== 'root-exit-node' &&
    (edge.sourceId.endsWith('-entry-node') || edge.sourceId.endsWith('-exit-node'));
  const edgesLeadingToPort = edges.filter((e) => leadsToPort(e) && !isPortToPort(e));
  const remap = (lead: GraphEdge, tails: GraphEdge[]) => {
    tails.forEach((tail) => {
      remappedEdges = remappedEdges.filter((e) => e.id !== tail.id);
      if (!leadsToPort(tail)) {
        const sourceId = lead.sourceId;
        const targetId = tail.targetId;
        const label = `${lead.label}${lead.label && tail.label ? ' / ' : ''}${tail.label}`;
        const id = `${sourceId}-${targetId}${label ? `-${label}` : ''}`;
        const newEdge: GraphEdge = {
          id,
          sourceId,
          targetId,
          label,
        };
        remappedEdges.push(newEdge);
      } else {
        remap(
          lead,
          edges.filter((e) => e.sourceId === tail.targetId),
        );
      }
    });
  };
  edgesLeadingToPort.forEach((lead) => {
    remappedEdges = remappedEdges.filter((e) => e.id !== lead.id);
    remap(
      lead,
      edges.filter((e) => e.sourceId === lead.targetId),
    );
  });
  return remappedEdges;
};

/**
 * Flattens the edges of the provided graph
 * @param graph The graph to flatten the edges of
 * @returns All the edge declared in the graph and its subgraphs
 */
export const flattenEdges = (graph: Graph): GraphEdge[] => [
  ...(graph.edges || []),
  ...((graph.nodes || []).filter((node) => (node as Graph).edges?.length) as Graph[]).flatMap(flattenEdges),
];

/**
 * Flattens the nodes of the provided graph/node
 * @param graph The graph/node to flatten the nodes of
 * @returns All the nodes and subnodes declared in the graph
 */
export const flattenNodes = (node: Graph | GraphNode): Array<Graph | GraphNode> => [
  {
    ...node,
    entryNode: undefined,
    exitNode: undefined,
    nodes: undefined,
    edges: undefined,
  },
  ...((node as Graph).nodes || []).flatMap(flattenNodes),
];

/**
 * Flattens the nodes and edges, removes entry and exit nodes from the provided graph
 * @param graph The target graph
 * @returns The modified graph
 */
export function flattenGraph(graph: Graph): Graph {
  const edges = remapEdges(flattenEdges(graph));
  const nodes = graph.nodes
    .flatMap((node) => flattenNodes(node))
    .filter((node) => node.type !== GraphNodeType.Entry && node.type !== GraphNodeType.Exit);
  const newGraph: Graph = {
    ...graph,
    nodes,
    edges,
  };
  return newGraph;
}

/**
 * Constructs a graph representation based on the given workflow.
 *
 * @param workflow The workflow to be converted into a graph structure.
 * @param simplifyGraph A boolean indicating whether the graph nodes & edges should be flattened and free of internal entry/exit nodes.
 * @returns A graph representation of the workflow.
 */
export function buildGraph(workflow: Workflow, simplifyGraph: boolean = false): Graph {
  const graph = initGraph(GraphNodeType.Root);
  if (!graph.entryNode) throw new Error('The root graph should have an entry node.');
  buildTransitions(graph.entryNode, {
    graph,
    taskListReference: doReference,
    taskList: mapTasks(workflow.do),
    taskReference: doReference,
    knownEdges: [],
  });
  if (!simplifyGraph) return graph;
  return flattenGraph(graph);
}
