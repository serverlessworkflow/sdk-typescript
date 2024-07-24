/*
 * Copyright 2021-Present The Serverless Workflow Specification Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*****************************************************************************************
 *
 * /!\ This file is computer generated. Any manual modification can and will be lost. /!\
 *
 *****************************************************************************************/

/**
 * Represents the definition of a schema.
 */
export type Schema = SchemaInline | SchemaExternal;
export type ExternalResource = string | ExternalResourceURI;
export type ReferenceableAuthenticationPolicy = AuthenticationPolicyReference | ReferencedAuthenticationPolicy;
/**
 * Defines an authentication policy.
 */
export type ReferencedAuthenticationPolicy =
  | BasicAuthenticationPolicy
  | BearerAuthenticationPolicy
  | OAuth2AuthenticationPolicy;
/**
 * A runtime expression, if any, used to mutate and/or filter the input of the workflow or task.
 */
export type InputFrom =
  | string
  | {
      [k: string]: unknown;
    };
/**
 * Defines an authentication policy.
 */
export type AuthenticationPolicy = BasicAuthenticationPolicy | BearerAuthenticationPolicy | OAuth2AuthenticationPolicy;
/**
 * Defines all possible tasks
 */
export type Task =
  | CallTask
  | DoTask
  | ForkTask
  | EmitTask
  | ForTask
  | ListenTask
  | RaiseTask
  | RunTask
  | SetTask
  | SwitchTask
  | TryTask
  | WaitTask;
/**
 * Enables the execution of a specified function within a workflow, allowing seamless integration with custom business logic or external services
 */
export type CallTask = CallAsyncAPI | CallGRPC | CallHTTP | CallOpenAPI | CallFunction;
/**
 * The HTTP endpoint to send the request to.
 */
export type CallHTTPWithEndpoint = Endpoint | string;
/**
 * A runtime expression, if any, used to mutate and/or filter the output of the workflow or task.
 */
export type OutputAs =
  | string
  | {
      [k: string]: unknown;
    };
/**
 * A runtime expression, if any, used to export the output data to the context.
 */
export type ExportAs =
  | string
  | {
      [k: string]: unknown;
    };
export type FlowDirective = FlowDirectiveEnum | string;
export type FlowDirectiveEnum = 'continue' | 'exit' | 'end';
export type EventConsumptionStrategy =
  | AllEventConsumptionStrategy
  | AnyEventConsumptionStrategy
  | OneEventConsumptionStrategy;
/**
 * A list containing all the events that must be consumed.
 */
export type EventConsumptionStrategyAll = EventFilter[];
/**
 * A list containing any of the events to consume.
 */
export type EventConsumptionStrategyAny = EventFilter[];
export type Run = RunContainer | RunScript | RunShell | RunWokflow;
export type Script = ScriptInline | ScriptExternal;
/**
 * @minItems 1
 */
export type Switch = [SwitchItem, ...SwitchItem[]];
/**
 * The retry duration backoff.
 */
export type RetryPolicyBackoff = ConstantBackoff | ExponentialBackOff | LinearBackoff;
/**
 * A name/value mapping of tasks
 */
export type TaskList = TaskItem[];
/**
 * The workflow's extensions.
 */
export type WorkflowExtensions = ExtensionItem[];
/**
 * The workflow's secrets.
 */
export type WorkflowSecrets = string[];

/**
 * Serverless Workflow DSL - Workflow Schema
 */
export interface Workflow {
  document: WorkflowDocument;
  input?: Input;
  use?: WorkflowComponents;
  do: TaskList;
  timeout?: Timeout;
  output?: Output;
  schedule?: WorkflowSchedule;
  [k: string]: unknown;
}
/**
 * Documents the workflow
 */
export interface WorkflowDocument {
  /**
   * The version of the DSL used by the workflow.
   */
  dsl: string;
  /**
   * The workflow's namespace.
   */
  namespace: string;
  /**
   * The workflow's name.
   */
  name: string;
  /**
   * The workflow's semantic version.
   */
  version: string;
  /**
   * The workflow's title.
   */
  title?: string;
  /**
   * The workflow's Markdown summary.
   */
  summary?: string;
  tags?: WorkflowTags;
  [k: string]: unknown;
}
/**
 * A key/value mapping of the workflow's tags, if any.
 */
export interface WorkflowTags {
  [k: string]: unknown;
}
/**
 * Configures the input of a workflow or task.
 */
export interface Input {
  schema?: Schema;
  from?: InputFrom;
  [k: string]: unknown;
}
export interface SchemaInline {
  /**
   * The schema's inline definition.
   */
  document: {
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
export interface SchemaExternal {
  resource: ExternalResource;
  [k: string]: unknown;
}
export interface ExternalResourceURI {
  /**
   * The endpoint's URI.
   */
  uri: string;
  authentication?: ReferenceableAuthenticationPolicy;
  /**
   * The external resource's name, if any.
   */
  name?: string;
  [k: string]: unknown;
}
export interface AuthenticationPolicyReference {
  /**
   * The name of the authentication policy to use
   */
  use: string;
  [k: string]: unknown;
}
/**
 * Use basic authentication.
 */
export interface BasicAuthenticationPolicy {
  basic: ExplicitBasicAuthenticationPolicy | SecretBasedAuthenticationPolicy;
  [k: string]: unknown;
}
export interface ExplicitBasicAuthenticationPolicy {
  /**
   * The username to use.
   */
  username: string;
  /**
   * The password to use.
   */
  password: string;
  [k: string]: unknown;
}
export interface SecretBasedAuthenticationPolicy {
  /**
   * The name of the authentication policy to use
   */
  use: string;
  [k: string]: unknown;
}
/**
 * Use bearer authentication.
 */
export interface BearerAuthenticationPolicy {
  bearer: ExplicitBearerAuthenticationPolicy | SecretBasedAuthenticationPolicy;
  [k: string]: unknown;
}
export interface ExplicitBearerAuthenticationPolicy {
  /**
   * The bearer token to use.
   */
  token: string;
  [k: string]: unknown;
}
/**
 * Use OAUTH2 authentication.
 */
export interface OAuth2AuthenticationPolicy {
  oauth2: ExplicitOAuth2AuthenticationPolicy | SecretBasedAuthenticationPolicy;
  [k: string]: unknown;
}
export interface ExplicitOAuth2AuthenticationPolicy {
  /**
   * The URI that references the OAuth2 authority to use.
   */
  authority: string;
  /**
   * The grant type to use.
   */
  grant: string;
  client: {
    /**
     * The client id to use.
     */
    id: string;
    /**
     * The client secret to use, if any.
     */
    secret?: string;
    [k: string]: unknown;
  };
  /**
   * The scopes, if any, to request the token for.
   */
  scopes?: string[];
  /**
   * The audiences, if any, to request the token for.
   */
  audiences?: string[];
  /**
   * The username to use. Used only if the grant type is Password.
   */
  username?: string;
  /**
   * The password to use. Used only if the grant type is Password.
   */
  password?: string;
  subject?: Oauth2Token;
  actor?: Oauth2Token;
  [k: string]: unknown;
}
export interface Oauth2Token {
  /**
   * The security token to use to use.
   */
  token: string;
  /**
   * The type of the security token to use to use.
   */
  type: string;
  [k: string]: unknown;
}
/**
 * Defines the workflow's reusable components.
 */
export interface WorkflowComponents {
  authentications?: WorkflowAuthentications;
  errors?: WorkflowErrors;
  extensions?: WorkflowExtensions;
  functions?: WorkflowFunctions;
  retries?: WorkflowRetries;
  secrets?: WorkflowSecrets;
  [k: string]: unknown;
}
/**
 * The workflow's reusable authentication policies.
 */
export interface WorkflowAuthentications {
  [k: string]: AuthenticationPolicy;
}
/**
 * The workflow's reusable errors.
 */
export interface WorkflowErrors {
  [k: string]: Error;
}
export interface Error {
  /**
   * A URI reference that identifies the error type.
   */
  type: string;
  /**
   * The status code generated by the origin for this occurrence of the error.
   */
  status: number;
  /**
   * A JSON Pointer used to reference the component the error originates from.
   */
  instance: string;
  /**
   * A short, human-readable summary of the error.
   */
  title?: string;
  /**
   * A human-readable explanation specific to this occurrence of the error.
   */
  detail?: string;
  [k: string]: unknown;
}
export interface ExtensionItem {
  [k: string]: Extension;
}
/**
 * The definition of a an extension.
 */
export interface Extension {
  /**
   * The type of task to extend.
   */
  extend:
    | 'call'
    | 'composite'
    | 'emit'
    | 'for'
    | 'listen'
    | 'raise'
    | 'run'
    | 'set'
    | 'switch'
    | 'try'
    | 'wait'
    | 'all';
  /**
   * A runtime expression, if any, used to determine whether or not the extension should apply in the specified context.
   */
  when?: string;
  before?: TaskList;
  after?: TaskList;
  [k: string]: unknown;
}
export interface TaskItem {
  [k: string]: Task;
}
/**
 * Enables workflows to interact with external services described by AsyncAPI.
 */
export interface CallAsyncAPI {
  call: 'asyncapi';
  with: CallAsyncAPIWith;
  [k: string]: unknown;
}
/**
 * Defines the AsyncAPI call to perform.
 */
export interface CallAsyncAPIWith {
  document: ExternalResource;
  /**
   * A reference to the AsyncAPI operation to call.
   */
  operationRef: string;
  /**
   * A a reference to the server to call the specified AsyncAPI operation on. If not set, default to the first server matching the operation's channel.
   */
  server?: string;
  /**
   * The name of the message to use. If not set, defaults to the first message defined by the operation.
   */
  message?: string;
  /**
   * The name of the binding to use. If not set, defaults to the first binding defined by the operation.
   */
  binding?: string;
  /**
   * The payload to call the AsyncAPI operation with, if any.
   */
  payload?: {
    [k: string]: unknown;
  };
  authentication?: ReferenceableAuthenticationPolicy;
}
/**
 * The base definition shared by all tasks
 */
export interface CallGRPC {
  call: 'grpc';
  with: CallGRPCWith;
  [k: string]: unknown;
}
/**
 * Defines the GRPC call to perform.
 */
export interface CallGRPCWith {
  proto: ExternalResource;
  service: CallGRPCWithService;
  /**
   * The name of the method to call on the defined GRPC service.
   */
  method: string;
  arguments?: CallGRPCWithArguments;
}
export interface CallGRPCWithService {
  /**
   * The name of the GRPC service to call.
   */
  name: string;
  /**
   * The hostname of the GRPC service to call.
   */
  host: string;
  /**
   * The port number of the GRPC service to call.
   */
  port?: number;
  authentication?: ReferenceableAuthenticationPolicy;
  [k: string]: unknown;
}
/**
 * The arguments, if any, to call the method with.
 */
export interface CallGRPCWithArguments {
  [k: string]: unknown;
}
/**
 * The base definition shared by all tasks
 */
export interface CallHTTP {
  call: 'http';
  with: CallHTTPWith;
  [k: string]: unknown;
}
/**
 * Defines the HTTP call to perform.
 */
export interface CallHTTPWith {
  /**
   * The HTTP method of the HTTP request to perform.
   */
  method: string;
  endpoint: CallHTTPWithEndpoint;
  headers?: CallHTTPWithHeaders;
  body?: CallHTTPWithBody;
  /**
   * The http call output format. Defaults to 'content'.
   */
  output?: 'raw' | 'content' | 'response';
}
export interface Endpoint {
  /**
   * The endpoint's URI.
   */
  uri: string;
  authentication?: ReferenceableAuthenticationPolicy;
  [k: string]: unknown;
}
/**
 * A name/value mapping of the headers, if any, of the HTTP request to perform.
 */
export interface CallHTTPWithHeaders {
  [k: string]: unknown;
}
/**
 * The body, if any, of the HTTP request to perform.
 */
export interface CallHTTPWithBody {
  [k: string]: unknown;
}
/**
 * The base definition shared by all tasks
 */
export interface CallOpenAPI {
  call: 'openapi';
  with: CallOpenAPIWith;
  [k: string]: unknown;
}
/**
 * Defines the OpenAPI call to perform.
 */
export interface CallOpenAPIWith {
  document: ExternalResource;
  /**
   * The id of the OpenAPI operation to call.
   */
  operationId: string;
  parameters?: CallOpenAPIWithParameters;
  authentication?: ReferenceableAuthenticationPolicy;
  /**
   * The http call output format. Defaults to 'content'.
   */
  output?: 'raw' | 'content' | 'response';
}
/**
 * A name/value mapping of the parameters of the OpenAPI operation to call.
 */
export interface CallOpenAPIWithParameters {
  [k: string]: unknown;
}
/**
 * The base definition shared by all tasks
 */
export interface CallFunction {
  /**
   * The name of the function to call.
   */
  call: string;
  with?: CallFunctionWith;
  [k: string]: unknown;
}
/**
 * A name/value mapping of the parameters, if any, to call the function with.
 */
export interface CallFunctionWith {
  [k: string]: unknown;
}
/**
 * Allows to execute a list of tasks in sequence
 */
export interface DoTask {
  do: TaskList;
  [k: string]: unknown;
}
/**
 * Allows workflows to execute multiple tasks concurrently and optionally race them against each other, with a single possible winner, which sets the task's output.
 */
export interface ForkTask {
  fork: Fork;
  [k: string]: TaskBase;
}
export interface Fork {
  branches: TaskList;
  /**
   * Indicates whether or not the concurrent tasks are racing against each other, with a single possible winner, which sets the composite task's output.
   */
  compete?: boolean;
  [k: string]: unknown;
}
/**
 * The base definition shared by all tasks
 */
export interface TaskBase {
  /**
   * A runtime expression, if any, used to determine whether or not the task should be run.
   */
  if?: string;
  input?: Input;
  output?: Output;
  export?: Export;
  timeout?: Timeout;
  then?: FlowDirective;
  [k: string]: unknown;
}
/**
 * Configures the output of a workflow or task.
 */
export interface Output {
  schema?: Schema;
  as?: OutputAs;
  [k: string]: unknown;
}
/**
 * Set the content of the context.
 */
export interface Export {
  schema?: Schema;
  as?: ExportAs;
  [k: string]: unknown;
}
/**
 * The definition of a timeout.
 */
export interface Timeout {
  after: Duration;
  [k: string]: unknown;
}
/**
 * The definition of a duration.
 */
export interface Duration {
  /**
   * Number of days, if any.
   */
  days?: number;
  /**
   * Number of days, if any.
   */
  hours?: number;
  /**
   * Number of minutes, if any.
   */
  minutes?: number;
  /**
   * Number of seconds, if any.
   */
  seconds?: number;
  /**
   * Number of milliseconds, if any.
   */
  milliseconds?: number;
  [k: string]: unknown;
}
/**
 * Allows workflows to publish events to event brokers or messaging systems, facilitating communication and coordination between different components and services.
 */
export interface EmitTask {
  emit: Emit;
  [k: string]: unknown;
}
export interface Emit {
  event: EmitEvent;
  [k: string]: unknown;
}
export interface EmitEvent {
  /**
   * The event's unique identifier
   */
  id?: string;
  /**
   * Identifies the context in which an event happened
   */
  source: string;
  /**
   * This attribute contains a value describing the type of event related to the originating occurrence.
   */
  type: string;
  time?: string;
  subject?: string;
  /**
   * Content type of data value. This attribute enables data to carry any type of content, whereby format and encoding might differ from that of the chosen event format.
   */
  datacontenttype?: string;
  dataschema?: string;
  [k: string]: unknown;
}
/**
 * Allows workflows to iterate over a collection of items, executing a defined set of subtasks for each item in the collection. This task type is instrumental in handling scenarios such as batch processing, data transformation, and repetitive operations across datasets.
 */
export interface ForTask {
  for: For;
  /**
   * A runtime expression that represents the condition, if any, that must be met for the iteration to continue.
   */
  while?: string;
  do: TaskList;
  [k: string]: unknown;
}
export interface For {
  /**
   * The name of the variable used to store the current item being enumerated.
   */
  each?: string;
  /**
   * A runtime expression used to get the collection to enumerate.
   */
  in: string;
  /**
   * The name of the variable used to store the index of the current item being enumerated.
   */
  at?: string;
  [k: string]: unknown;
}
/**
 * Provides a mechanism for workflows to await and react to external events, enabling event-driven behavior within workflow systems.
 */
export interface ListenTask {
  listen: Listen;
  [k: string]: unknown;
}
export interface Listen {
  to: EventConsumptionStrategy;
  [k: string]: unknown;
}
export interface AllEventConsumptionStrategy {
  all: EventConsumptionStrategyAll;
  [k: string]: unknown;
}
/**
 * An event filter is a mechanism used to selectively process or handle events based on predefined criteria, such as event type, source, or specific attributes.
 */
export interface EventFilter {
  with: WithEvent;
  correlate?: Correlate;
  [k: string]: unknown;
}
/**
 * An event filter is a mechanism used to selectively process or handle events based on predefined criteria, such as event type, source, or specific attributes.
 */
export interface WithEvent {
  /**
   * The event's unique identifier
   */
  id?: string;
  /**
   * Identifies the context in which an event happened
   */
  source?: string;
  /**
   * This attribute contains a value describing the type of event related to the originating occurrence.
   */
  type?: string;
  time?: string;
  subject?: string;
  /**
   * Content type of data value. This attribute enables data to carry any type of content, whereby format and encoding might differ from that of the chosen event format.
   */
  datacontenttype?: string;
  dataschema?: string;
  [k: string]: unknown;
}
/**
 * A correlation is a link between events and data, established by mapping event attributes to specific data attributes, allowing for coordinated processing or handling based on event characteristics.
 */
export interface Correlate {
  [k: string]: {
    /**
     * A runtime expression used to extract the correlation value from the filtered event.
     */
    from: string;
    /**
     * A constant or a runtime expression, if any, used to determine whether or not the extracted correlation value matches expectations. If not set, the first extracted value will be used as the correlation's expectation.
     */
    expect?: string;
    [k: string]: unknown;
  };
}
export interface AnyEventConsumptionStrategy {
  any: EventConsumptionStrategyAny;
  [k: string]: unknown;
}
export interface OneEventConsumptionStrategy {
  one: EventFilter;
  [k: string]: unknown;
}
/**
 * Intentionally triggers and propagates errors.
 */
export interface RaiseTask {
  raise: Raise;
  [k: string]: unknown;
}
export interface Raise {
  error: Error;
  [k: string]: unknown;
}
/**
 * Provides the capability to execute external containers, shell commands, scripts, or workflows.
 */
export interface RunTask {
  run: Run;
  [k: string]: unknown;
}
/**
 * Enables the execution of external processes encapsulated within a containerized environment.
 */
export interface RunContainer {
  container: Container;
  [k: string]: unknown;
}
export interface Container {
  /**
   * The name of the container image to run.
   */
  image: string;
  /**
   * The command, if any, to execute on the container
   */
  command?: string;
  /**
   * The container's port mappings, if any.
   */
  ports?: {
    [k: string]: unknown;
  };
  /**
   * The container's volume mappings, if any.
   */
  volumes?: {
    [k: string]: unknown;
  };
  environment?: ContainerEnvironment;
  [k: string]: unknown;
}
/**
 * A key/value mapping of the environment variables, if any, to use when running the configured process.
 */
export interface ContainerEnvironment {
  [k: string]: unknown;
}
/**
 * Enables the execution of custom scripts or code within a workflow, empowering workflows to perform specialized logic, data processing, or integration tasks by executing user-defined scripts written in various programming languages.
 */
export interface RunScript {
  script: Script;
  [k: string]: unknown;
}
/**
 * The script's code.
 */
export interface ScriptInline {
  code: string;
  [k: string]: unknown;
}
/**
 * The script's resource.
 */
export interface ScriptExternal {
  source: ExternalResource;
  [k: string]: unknown;
}
/**
 * Enables the execution of shell commands within a workflow, enabling workflows to interact with the underlying operating system and perform system-level operations, such as file manipulation, environment configuration, or system administration tasks.
 */
export interface RunShell {
  shell: Shell;
  [k: string]: unknown;
}
export interface Shell {
  /**
   * The shell command to run.
   */
  command: string;
  arguments?: ShellArguments;
  environment?: ShellEnvironment;
  [k: string]: unknown;
}
/**
 * A list of the arguments of the shell command to run.
 */
export interface ShellArguments {
  [k: string]: unknown;
}
/**
 * A key/value mapping of the environment variables, if any, to use when running the configured process.
 */
export interface ShellEnvironment {
  [k: string]: unknown;
}
/**
 * Enables the invocation and execution of nested workflows within a parent workflow, facilitating modularization, reusability, and abstraction of complex logic or business processes by encapsulating them into standalone workflow units.
 */
export interface RunWokflow {
  workflow: RunWorkflowDescriptor;
  [k: string]: unknown;
}
export interface RunWorkflowDescriptor {
  /**
   * The namespace the workflow to run belongs to.
   */
  namespace: string;
  /**
   * The name of the workflow to run.
   */
  name: string;
  /**
   * The version of the workflow to run. Defaults to latest
   */
  version: string;
  input?: WorkflowInput;
  [k: string]: unknown;
}
/**
 * The data, if any, to pass as input to the workflow to execute. The value should be validated against the target workflow's input schema, if specified.
 */
export interface WorkflowInput {
  [k: string]: unknown;
}
/**
 * A task used to set data
 */
export interface SetTask {
  set: Set;
  [k: string]: unknown;
}
/**
 * The data to set
 */
export interface Set {
  [k: string]: unknown;
}
/**
 * Enables conditional branching within workflows, allowing them to dynamically select different paths based on specified conditions or criteria
 */
export interface SwitchTask {
  switch: Switch;
  [k: string]: unknown;
}
export interface SwitchItem {
  [k: string]: SwitchCase;
}
export interface SwitchCase {
  /**
   * A runtime expression used to determine whether or not the case matches.
   */
  when?: string;
  then: FlowDirective;
  [k: string]: unknown;
}
/**
 * Serves as a mechanism within workflows to handle errors gracefully, potentially retrying failed tasks before proceeding with alternate ones.
 */
export interface TryTask {
  try: TaskList;
  catch: Catch;
  [k: string]: unknown;
}
export interface Catch {
  errors?: CatchErrors;
  /**
   * The name of the runtime expression variable to save the error as. Defaults to 'error'.
   */
  as?: string;
  /**
   * A runtime expression used to determine whether or not to catch the filtered error
   */
  when?: string;
  /**
   * A runtime expression used to determine whether or not to catch the filtered error
   */
  exceptWhen?: string;
  retry?: RetryPolicy;
  do?: TaskList;
  [k: string]: unknown;
}
export interface CatchErrors {
  [k: string]: unknown;
}
/**
 * Defines a retry policy.
 */
export interface RetryPolicy {
  /**
   * A runtime expression, if any, used to determine whether or not to retry running the task, in a given context.
   */
  when?: string;
  /**
   * A runtime expression used to determine whether or not to retry running the task, in a given context.
   */
  exceptWhen?: string;
  delay?: Duration;
  backoff?: RetryPolicyBackoff;
  limit?: RetryPolicyLimit;
  jitter?: RetryPolicyJitter;
  [k: string]: unknown;
}
export interface ConstantBackoff {
  /**
   * The definition of the constant backoff to use, if any.
   */
  constant: {
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
export interface ExponentialBackOff {
  /**
   * The definition of the exponential backoff to use, if any.
   */
  exponential: {
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
export interface LinearBackoff {
  /**
   * The definition of the linear backoff to use, if any.
   */
  linear: {
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
/**
 * The retry limit, if any
 */
export interface RetryPolicyLimit {
  attempt?: RetryPolicyAttempt;
  duration?: Duration;
  [k: string]: unknown;
}
export interface RetryPolicyAttempt {
  /**
   * The maximum amount of retry attempts, if any.
   */
  count?: number;
  duration?: Duration;
  [k: string]: unknown;
}
/**
 * The parameters, if any, that control the randomness or variability of the delay between retry attempts.
 */
export interface RetryPolicyJitter {
  from: Duration;
  to: Duration;
  [k: string]: unknown;
}
/**
 * Allows workflows to pause or delay their execution for a specified period of time.
 */
export interface WaitTask {
  wait: Duration;
  [k: string]: unknown;
}
/**
 * The workflow's reusable functions.
 */
export interface WorkflowFunctions {
  [k: string]: Task;
}
/**
 * The workflow's reusable retry policies.
 */
export interface WorkflowRetries {
  [k: string]: RetryPolicy;
}
/**
 * Schedules the workflow
 */
export interface WorkflowSchedule {
  every?: Duration;
  /**
   * Specifies the schedule using a cron expression, e.g., '0 0 * * *' for daily at midnight."
   */
  cron?: string;
  after?: Duration;
  on?: EventConsumptionStrategy;
  [k: string]: unknown;
}
