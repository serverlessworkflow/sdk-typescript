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
export type Schema =
  | {
      /**
       * The schema's inline definition.
       */
      document: {
        [k: string]: unknown;
      };
      [k: string]: unknown;
    }
  | {
      resource: ExternalResource;
      [k: string]: unknown;
    };
export type ExternalResource =
  | string
  | {
      /**
       * The endpoint's URI.
       */
      uri: string;
      authentication?: ExternalResourceAuthentication;
      /**
       * The external resource's name, if any.
       */
      name?: string;
      [k: string]: unknown;
    };
/**
 * The authentication policy to use.
 */
export type ExternalResourceAuthentication = AuthenticationPolicy | string;
/**
 * Defines an authentication policy.
 */
export type AuthenticationPolicy =
  | {
      basic: AuthenticationPolicyBasic;
      [k: string]: unknown;
    }
  | {
      bearer: AuthenticationPolicyBearer;
      [k: string]: unknown;
    }
  | {
      oauth2: AuthenticationPolicyOauth2;
      [k: string]: unknown;
    };
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
export type CallTask = CallAsyncAPI | CallGRPC | CallHTTP | CallOpenAPI | CallFunction;
export type CallAsyncAPI = TaskBase & {
  call?: 'asyncapi';
  with?: CallAsyncAPIWith;
  [k: string]: unknown;
};
export type FlowDirective = ('continue' | 'exit' | 'end') | string;
/**
 * The authentication policy, if any, to use when calling the AsyncAPI operation.
 */
export type CallAsyncAPIWithAuthentication = AuthenticationPolicy | string;
export type CallGRPC = TaskBase & {
  call?: 'grpc';
  with?: CallGRPCWith;
  [k: string]: unknown;
};
/**
 * The endpoint's authentication policy, if any.
 */
export type CallGRPCWithServiceAuthentication = AuthenticationPolicy | string;
export type CallHTTP = TaskBase & {
  call?: 'http';
  with?: CallHTTPWith;
  [k: string]: unknown;
};
/**
 * The HTTP endpoint to send the request to.
 */
export type CallHTTPWithEndpoint = Endpoint | string;
/**
 * The authentication policy to use.
 */
export type EndpointAuthentication = AuthenticationPolicy | string;
export type CallOpenAPI = TaskBase & {
  call?: 'openapi';
  with?: CallOpenAPIWith;
  [k: string]: unknown;
};
/**
 * The authentication policy, if any, to use when calling the OpenAPI operation.
 */
export type CallOpenAPIWithAuthentication = AuthenticationPolicy | string;
export type CallFunction = TaskBase & {
  /**
   * The name of the function to call.
   */
  call?: string;
  with?: CallFunctionWith;
  [k: string]: unknown;
};
/**
 * Allows to execute a list of tasks in sequence
 */
export type DoTask = TaskBase & {
  do?: TaskList;
  [k: string]: unknown;
};
/**
 * Allows workflows to execute multiple tasks concurrently and optionally race them against each other, with a single possible winner, which sets the task's output.
 */
export type ForkTask = TaskBase & {
  fork?: ForkTaskFork;
  [k: string]: unknown;
};
/**
 * Allows workflows to publish events to event brokers or messaging systems, facilitating communication and coordination between different components and services.
 */
export type EmitTask = TaskBase & {
  emit?: EmitTaskEmit;
  [k: string]: unknown;
};
/**
 * Allows workflows to iterate over a collection of items, executing a defined set of subtasks for each item in the collection. This task type is instrumental in handling scenarios such as batch processing, data transformation, and repetitive operations across datasets.
 */
export type ForTask = TaskBase & {
  for?: ForTaskFor;
  /**
   * A runtime expression that represents the condition, if any, that must be met for the iteration to continue.
   */
  while?: string;
  do?: TaskList;
  [k: string]: unknown;
};
/**
 * Provides a mechanism for workflows to await and react to external events, enabling event-driven behavior within workflow systems.
 */
export type ListenTask = TaskBase & {
  listen?: ListenTaskListen;
  [k: string]: unknown;
};
export type EventConsumptionStrategy =
  | {
      all: EventConsumptionStrategyAll;
      [k: string]: unknown;
    }
  | {
      any: EventConsumptionStrategyAny;
      [k: string]: unknown;
    }
  | {
      one: EventFilter;
      [k: string]: unknown;
    };
/**
 * A list containing all the events that must be consumed.
 */
export type EventConsumptionStrategyAll = EventFilter[];
/**
 * A list containing any of the events to consume.
 */
export type EventConsumptionStrategyAny = EventFilter[];
/**
 * Intentionally triggers and propagates errors.
 */
export type RaiseTask = TaskBase & {
  raise?: RaiseTaskRaise;
  [k: string]: unknown;
};
/**
 * Provides the capability to execute external containers, shell commands, scripts, or workflows.
 */
export type RunTask = TaskBase & {
  run?: RunTaskRun;
  [k: string]: unknown;
};
export type RunTaskRun =
  | {
      container: RunTaskRunContainer;
      [k: string]: unknown;
    }
  | {
      script: RunTaskRunScript;
      [k: string]: unknown;
    }
  | {
      shell: RunTaskRunShell;
      [k: string]: unknown;
    }
  | {
      workflow: RunTaskRunWorkflow;
      [k: string]: unknown;
    };
export type RunTaskRunScript =
  | {
      code: string;
      [k: string]: unknown;
    }
  | {
      source: ExternalResource;
      [k: string]: unknown;
    };
/**
 * A task used to set data
 */
export type SetTask = TaskBase & {
  set?: SetTaskSet;
  [k: string]: unknown;
};
/**
 * Enables conditional branching within workflows, allowing them to dynamically select different paths based on specified conditions or criteria
 */
export type SwitchTask = TaskBase & {
  switch?: SwitchTaskSwitch;
  [k: string]: unknown;
};
/**
 * @minItems 1
 */
export type SwitchTaskSwitch = [
  {
    [k: string]: {
      /**
       * The case's name.
       */
      name?: string;
      /**
       * A runtime expression used to determine whether or not the case matches.
       */
      when?: string;
      then?: FlowDirective;
      [k: string]: unknown;
    };
  },
  ...{
    [k: string]: {
      /**
       * The case's name.
       */
      name?: string;
      /**
       * A runtime expression used to determine whether or not the case matches.
       */
      when?: string;
      then?: FlowDirective;
      [k: string]: unknown;
    };
  }[],
];
/**
 * Serves as a mechanism within workflows to handle errors gracefully, potentially retrying failed tasks before proceeding with alternate ones.
 */
export type TryTask = TaskBase & {
  try?: TaskList;
  catch?: TryTaskCatch;
  [k: string]: unknown;
};
/**
 * The retry duration backoff.
 */
export type RetryPolicyBackoff =
  | {
      /**
       * The definition of the constant backoff to use, if any.
       */
      constant: {
        [k: string]: unknown;
      };
      [k: string]: unknown;
    }
  | {
      /**
       * The definition of the exponential backoff to use, if any.
       */
      exponential: {
        [k: string]: unknown;
      };
      [k: string]: unknown;
    }
  | {
      /**
       * The definition of the linear backoff to use, if any.
       */
      linear: {
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
/**
 * Allows workflows to pause or delay their execution for a specified period of time.
 */
export type WaitTask = TaskBase & {
  wait?: Duration;
  [k: string]: unknown;
};
export type TaskList = {
  [k: string]: Task;
}[];
/**
 * The workflow's extensions.
 */
export type UseExtensions = {
  [k: string]: Extension;
}[];

/**
 * Serverless Workflow DSL - Workflow Schema
 */
export interface Workflow {
  document: Document;
  input?: Input;
  use?: Use;
  do: TaskList;
  timeout?: Timeout;
  output?: Output;
  schedule?: Schedule;
  [k: string]: unknown;
}
/**
 * Documents the workflow
 */
export interface Document {
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
  tags?: DocumentTags;
  [k: string]: unknown;
}
/**
 * A key/value mapping of the workflow's tags, if any.
 */
export interface DocumentTags {
  [k: string]: unknown;
}
/**
 * Configures the input of a workflow or task.
 */
export interface Input {
  schema?: Schema;
  /**
   * A runtime expression, if any, used to mutate and/or filter the input of the workflow or task.
   */
  from?: string;
  [k: string]: unknown;
}
export interface AuthenticationPolicyBasic {
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
export interface AuthenticationPolicyBearer {
  /**
   * The bearer token to use.
   */
  token: string;
  [k: string]: unknown;
}
export interface AuthenticationPolicyOauth2 {
  /**
   * The URI that references the OAuth2 authority to use.
   */
  authority: string;
  /**
   * The grant type to use.
   */
  grant: string;
  client: AuthenticationPolicyOauth2Client;
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
export interface AuthenticationPolicyOauth2Client {
  /**
   * The client id to use.
   */
  id: string;
  /**
   * The client secret to use, if any.
   */
  secret?: string;
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
export interface Use {
  authentications?: AuthenticationPolicy;
  errors?: Error;
  extensions?: UseExtensions;
  functions?: Task;
  retries?: RetryPolicy;
  /**
   * The workflow's secrets.
   */
  secrets?: string[];
  [k: string]: unknown;
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
  /**
   * A runtime expression, if any, used to mutate and/or filter the output of the workflow or task.
   */
  as?: string;
  [k: string]: unknown;
}
/**
 * Set the content of the context.
 */
export interface Export {
  schema?: Schema;
  /**
   * A runtime expression, if any, used to export the output data to the context.
   */
  as?: string;
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
  authentication?: CallAsyncAPIWithAuthentication;
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
  authentication?: CallGRPCWithServiceAuthentication;
  [k: string]: unknown;
}
/**
 * The arguments, if any, to call the method with.
 */
export interface CallGRPCWithArguments {
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
  /**
   * A name/value mapping of the headers, if any, of the HTTP request to perform.
   */
  headers?: {
    [k: string]: unknown;
  };
  /**
   * The body, if any, of the HTTP request to perform.
   */
  body?: {
    [k: string]: unknown;
  };
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
  authentication?: EndpointAuthentication;
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
  authentication?: CallOpenAPIWithAuthentication;
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
 * A name/value mapping of the parameters, if any, to call the function with.
 */
export interface CallFunctionWith {
  [k: string]: unknown;
}
export interface ForkTaskFork {
  branches: TaskList;
  /**
   * Indicates whether or not the concurrent tasks are racing against each other, with a single possible winner, which sets the composite task's output.
   */
  compete?: boolean;
  [k: string]: unknown;
}
export interface EmitTaskEmit {
  event: EmitTaskEmitEvent;
  [k: string]: unknown;
}
export interface EmitTaskEmitEvent {
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
export interface ForTaskFor {
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
export interface ListenTaskListen {
  to: EventConsumptionStrategy;
  [k: string]: unknown;
}
/**
 * An event filter is a mechanism used to selectively process or handle events based on predefined criteria, such as event type, source, or specific attributes.
 */
export interface EventFilter {
  with: EventFilterWith;
  correlate?: EventFilterCorrelate;
  [k: string]: unknown;
}
/**
 * An event filter is a mechanism used to selectively process or handle events based on predefined criteria, such as event type, source, or specific attributes.
 */
export interface EventFilterWith {
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
export interface EventFilterCorrelate {
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
export interface RaiseTaskRaise {
  error: Error;
  [k: string]: unknown;
}
export interface RunTaskRunContainer {
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
  /**
   * A key/value mapping of the environment variables, if any, to use when running the configured process.
   */
  environment?: {
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
export interface RunTaskRunShell {
  /**
   * The shell command to run.
   */
  command: string;
  arguments?: RunTaskRunShellArguments;
  environment?: RunTaskRunShellEnvironment;
  [k: string]: unknown;
}
/**
 * A list of the arguments of the shell command to run.
 */
export interface RunTaskRunShellArguments {
  [k: string]: unknown;
}
/**
 * A key/value mapping of the environment variables, if any, to use when running the configured process.
 */
export interface RunTaskRunShellEnvironment {
  [k: string]: unknown;
}
export interface RunTaskRunWorkflow {
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
  input?: RunTaskRunWorkflowInput;
  [k: string]: unknown;
}
/**
 * The data, if any, to pass as input to the workflow to execute. The value should be validated against the target workflow's input schema, if specified.
 */
export interface RunTaskRunWorkflowInput {
  [k: string]: unknown;
}
/**
 * The data to set
 */
export interface SetTaskSet {
  [k: string]: unknown;
}
export interface TryTaskCatch {
  errors?: {
    [k: string]: unknown;
  };
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
/**
 * The retry limit, if any
 */
export interface RetryPolicyLimit {
  attempt?: RetryPolicyLimitAttempt;
  duration?: Duration;
  [k: string]: unknown;
}
export interface RetryPolicyLimitAttempt {
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
 * Schedules the workflow
 */
export interface Schedule {
  every?: Duration;
  /**
   * Specifies the schedule using a cron expression, e.g., '0 0 * * *' for daily at midnight."
   */
  cron?: string;
  after?: Duration;
  on?: EventConsumptionStrategy;
  [k: string]: unknown;
}
