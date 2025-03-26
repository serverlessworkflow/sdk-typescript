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

const doReference = '/do';
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
  label?: string | null;
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
};

/**
 * Represents a directed edge connecting two nodes in the graph.
 */
export type GraphEdge = GraphElement & {
  /** The unique identifier of the node where the edge originates. */
  sourceId: string;
  /** The unique identifier of the node where the edge terminates. */
  destinationId: string;
  /** Indicates whether to ignore rendering an end arrow. */
  ignoreEndArrow?: boolean;
};

/**
 * Represents a graph or a subgraph
 */
export type Graph = GraphNode & {
  /** The parent graph if this is a subgraph, otherwise null. */
  parent?: Graph | null;
  /** A collection of nodes that belong to this graph. */
  nodes: GraphNode[];
  /** A collection of edges that define relationships between nodes. */
  edges: GraphEdge[];
  /** The entry node of the graph. */
  entryNode: GraphNode;
  /** The exit node of the graph. */
  exitNode: GraphNode;
};

/**
 * Context information used when processing tasks in a workflow graph.
 */
type TaskContext = {
  workflow: Workflow;
  graph: Graph;
  subgraph?: Graph;
  taskList: Map<string, Task>;
  taskName?: string | null;
  taskReference: string;
};

/**
 * Identity information for a transition between tasks.
 */
type TransitionIdentity = {
  /** Name of the transition. */
  name: string;
  /** Index position in the task list. */
  index: number;
  /** Optional reference to the associated task. */
  task?: Task;
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
function mapTasks(tasksList: TaskItem[] | null | undefined): Map<string, Task> {
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
 * @param label Optional label for the graph.
 * @param parent Optional parent graph if this is a subgraph.
 * @returns A newly created Graph instance.
 */
function initGraph(
  type: GraphNodeType,
  id: string = 'root',
  label: string | null | undefined = undefined,
  parent: Graph | null | undefined = undefined,
): Graph {
  const entryNode: GraphNode = {
    type: id === 'root' ? GraphNodeType.Start : GraphNodeType.Entry,
    id: `${id}${entrySuffix}`,
  };
  const exitNode: GraphNode = {
    type: id === 'root' ? GraphNodeType.End : GraphNodeType.Exit,
    id: `${id}${exitSuffix}`,
  };
  return {
    id,
    label,
    type,
    parent,
    entryNode,
    exitNode,
    nodes: [entryNode, exitNode],
    edges: [],
  };
}

/**
 * Constructs a graph representation based on the given workflow.
 *
 * @param workflow The workflow to be converted into a graph structure.
 * @returns A graph representation of the workflow.
 */
export function buildGraph(workflow: Workflow): Graph {
  const graph = initGraph(GraphNodeType.Root);
  buildTransitions(graph.entryNode, {
    workflow,
    graph,
    taskList: mapTasks(workflow.do),
    taskReference: doReference,
  });
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
  taskName: string | null | undefined = undefined,
  transition: string | null | undefined = undefined,
): TransitionIdentity {
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
        name: FlowDirective.End,
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
 * Builds all the possible transitions from the provided node in the provided context
 * @param node The node to build the transitions for
 * @param context The context in which the transitions are built
 */
function buildTransitions(node: GraphNode | Graph, context: TaskContext) {
  const transitions: TransitionIdentity[] = [];
  let nextTransition = getNextTask(context.taskList, context.taskName);
  transitions.push(nextTransition);
  while (nextTransition?.task?.if) {
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
    .forEach((transition) => {
      const exitAnchor = (node as Graph).exitNode || node;
      if (transition.index != -1) {
        const destinationNode = buildTaskNode({
          ...context,
          taskReference: `${context.taskReference}/${transition.index}/${transition.name}`,
          taskName: transition.name,
        });
        buildEdge(context.subgraph || context.graph, exitAnchor, (node as Graph).entryNode || destinationNode);
      } else if (transition.name === FlowDirective.Exit) {
        buildEdge(context.subgraph || context.graph, exitAnchor, (context.subgraph || context.graph).exitNode);
      } else if (transition.name === FlowDirective.End) {
        buildEdge(context.subgraph || context.graph, exitAnchor, context.graph.exitNode);
      } else throw new Error('Invalid transition');
    });
}

/**
 * Builds a graph representation of a task
 * @param context The context to build the graph/node for
 * @returns A graph or node for the provided context
 */
function buildTaskNode(context: TaskContext): GraphNode | Graph {
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
function buildGenericTaskNode(type: GraphNodeType, context: TaskContext): GraphNode {
  const node: GraphNode = {
    type,
    id: context.taskReference,
    label: context.taskName,
  };
  (context.subgraph || context.graph).nodes.push(node);
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
  const node = buildGenericTaskNode(GraphNodeType.Call, context);
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
  const subgraph: Graph = initGraph(
    GraphNodeType.Do,
    context.taskReference,
    context.taskName,
    context.subgraph || context.graph,
  );
  const doContext: TaskContext = {
    ...context,
    taskList: mapTasks(task.do),
    taskReference: context.taskReference,
    taskName: null,
  };
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
  const node = buildGenericTaskNode(GraphNodeType.Emit, context);
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
  const subgraph: Graph = initGraph(GraphNodeType.For, context.taskReference, context.taskName);
  const forContext: TaskContext = {
    ...context,
    taskList: mapTasks(task.do),
    taskReference: subgraph.id,
    taskName: null,
  };
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
  const subgraph: Graph = initGraph(GraphNodeType.Fork, context.taskReference, context.taskName);
  for (let i = 0, c = task.fork?.branches.length || 0; i < c; i++) {
    const branchItem = task.fork?.branches[i];
    if (!branchItem) continue;
    const [branchName] = Object.entries(branchItem)[0];
    const branchContext: TaskContext = {
      ...context,
      taskList: mapTasks([branchItem]),
      taskReference: `${context.taskReference}${branchReference}/${i}/`,
      taskName: branchName,
    };
    const branchNode = buildTaskNode(branchContext);
    buildEdge(subgraph, subgraph.entryNode, (branchNode as Graph).entryNode || branchNode);
    buildEdge(subgraph, (branchNode as Graph).exitNode || branchNode, subgraph.exitNode);
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
  const node = buildGenericTaskNode(GraphNodeType.Listen, context);
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
  const node = buildGenericTaskNode(GraphNodeType.Raise, context);
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
  const node = buildGenericTaskNode(GraphNodeType.Run, context);
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
  const node = buildGenericTaskNode(GraphNodeType.Set, context);
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
  const node: GraphNode = {
    type: GraphNodeType.Switch,
    id: context.taskReference,
    label: context.taskName,
  };
  (context.subgraph || context.graph).nodes.push(node);
  let hasDefaultCase = false;
  task.switch?.forEach((switchItem) => {
    const [, switchCase] = Object.entries(switchItem)[0];
    if (!switchCase.when) hasDefaultCase = true;
    const transition = getNextTask(context.taskList, context.taskName, switchCase.then);
    const exitAnchor = (node as Graph).exitNode || node;
    if (transition.index != -1) {
      const destinationNode = buildTaskNode({
        ...context,
        taskReference: `${context.taskReference}/${transition.index}/${transition.name}`,
        taskName: transition.name,
      });
      buildEdge(context.subgraph || context.graph, exitAnchor, (node as Graph).entryNode || destinationNode);
    } else if (transition.name === FlowDirective.Exit) {
      buildEdge(context.subgraph || context.graph, exitAnchor, (context.subgraph || context.graph).exitNode);
    } else if (transition.name === FlowDirective.End) {
      buildEdge(context.subgraph || context.graph, exitAnchor, context.graph.exitNode);
    } else throw new Error('Invalid transition');
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
    context.taskName,
    context.subgraph || context.graph,
  );
  const trySubgraph: Graph = initGraph(
    GraphNodeType.Try,
    context.taskReference + tryReference,
    context.taskName + ' (try)',
    context.subgraph || context.graph,
  );
  containerSubgraph.nodes.push(trySubgraph);
  buildEdge(containerSubgraph, containerSubgraph.entryNode, trySubgraph.entryNode);
  const tryContext: TaskContext = {
    ...context,
    taskList: mapTasks(task.try),
    taskReference: trySubgraph.id,
    taskName: null,
  };
  buildTransitions(trySubgraph, tryContext);
  if (!task.catch?.do?.length) {
    const catchNode: GraphNode = {
      type: GraphNodeType.Catch,
      id: context.taskReference + catchReference,
      label: context.taskName + ' (catch)',
    };
    containerSubgraph.nodes.push(catchNode);
    buildEdge(containerSubgraph, trySubgraph.exitNode, catchNode);
    buildEdge(containerSubgraph, catchNode, containerSubgraph.exitNode);
  } else {
    const catchSubgraph: Graph = initGraph(
      GraphNodeType.Catch,
      context.taskReference + catchReference,
      context.taskName + ' (catch)',
      context.subgraph || context.graph,
    );
    containerSubgraph.nodes.push(catchSubgraph);
    buildEdge(containerSubgraph, trySubgraph.exitNode, catchSubgraph.entryNode);
    const catchContext: TaskContext = {
      ...context,
      taskList: mapTasks(task.catch.do),
      taskReference: catchSubgraph.id,
      taskName: null,
    };
    buildTransitions(catchSubgraph, catchContext);
    buildEdge(containerSubgraph, catchSubgraph.exitNode, containerSubgraph.exitNode);
  }
  return containerSubgraph;
}

/**
 * Builds a graph node for the provided wait task
 * @param task The task to build the graph node for
 * @param context The context to build the graph node for
 * @returns A graph node for the provided task
 */
function buildWaitTaskNode(task: WaitTask, context: TaskContext): GraphNode {
  const node = buildGenericTaskNode(GraphNodeType.Wait, context);
  // TODO: add some details about the task?
  return node;
}

/**
 * Builds an edge between two elements
 * @param graph The graph element containing the nodes
 * @param source The origin node
 * @param destination The destination node
 * @param label The edge label, if any
 */
function buildEdge(graph: Graph, source: GraphNode, destination: GraphNode, label: string = '') {
  let edge = graph.edges.find((e) => e.sourceId === source.id && e.destinationId === destination.id);
  if (edge) {
    if (label) {
      edge.label = edge.label + (edge.label ? ' / ' : '') + label;
    }
    return edge;
  }
  edge = {
    label,
    id: `${source.id}-${destination.id}-${label}`,
    sourceId: source.id,
    destinationId: destination.id,
    ignoreEndArrow: destination.id.endsWith(entrySuffix) || destination.id.endsWith(exitSuffix),
  };
  graph.edges.push(edge);
}
