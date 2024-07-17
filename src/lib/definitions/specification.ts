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
 * The schema used to describe and validate the input of the workflow or task.
 */
export type Schema = {
  /**
   * The schema's format. Defaults to 'json'. The (optional) version of the format can be set using `{format}:{version}`.
   */
  format?: string;
  [k: string]: unknown;
} & (
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
      /**
       * The schema's external resource.
       */
      resource:
        | string
        | {
            /**
             * The endpoint's URI.
             */
            uri: string;
            /**
             * The authentication policy to use.
             */
            authentication?: AuthenticationPolicy | string;
            /**
             * The external resource's name, if any.
             */
            name?: string;
            [k: string]: unknown;
          };
      [k: string]: unknown;
    }
);
/**
 * Defines an authentication policy.
 *
 * This interface was referenced by `Workflow`'s JSON-Schema
 * via the `definition` "authenticationPolicy".
 */
export type AuthenticationPolicy =
  | {
      basic: {
        /**
         * The username to use.
         */
        username: string;
        /**
         * The password to use.
         */
        password: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    }
  | {
      bearer: {
        /**
         * The bearer token to use.
         */
        token: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    }
  | {
      oauth2: {
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
      };
      [k: string]: unknown;
    };
/**
 * This interface was referenced by `Workflow`'s JSON-Schema
 * via the `definition` "task".
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
 * This interface was referenced by `Workflow`'s JSON-Schema
 * via the `definition` "callTask".
 */
export type CallTask = CallAsyncAPI | CallGRPC | CallHTTP | CallOpenAPI | CallFunction;
/**
 * Defines the event(s) to listen to.
 */
export type EventConsumptionStrategy =
  | {
      /**
       * A list containing all the events that must be consumed.
       */
      all: EventFilter[];
      [k: string]: unknown;
    }
  | {
      /**
       * A list containing any of the events to consume.
       */
      any: EventFilter[];
      [k: string]: unknown;
    }
  | {
      one: EventFilter;
      [k: string]: unknown;
    };
/**
 * This interface was referenced by `Workflow`'s JSON-Schema
 * via the `definition` "externalResource".
 */
export type ExternalResource =
  | string
  | {
      /**
       * The endpoint's URI.
       */
      uri: string;
      /**
       * The authentication policy to use.
       */
      authentication?: AuthenticationPolicy | string;
      /**
       * The external resource's name, if any.
       */
      name?: string;
      [k: string]: unknown;
    };
/**
 * The task(s) to execute before the extended task, if any.
 */
export type TaskList = {
  [k: string]: Task;
}[];
/**
 * This interface was referenced by `Workflow`'s JSON-Schema
 * via the `definition` "flowDirective".
 */
export type FlowDirective = ('continue' | 'exit' | 'end') | string;

/**
 * Serverless Workflow DSL - Workflow Schema
 */
export interface Workflow {
  /**
   * Documents the workflow
   */
  document: {
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
    /**
     * A key/value mapping of the workflow's tags, if any.
     */
    tags?: {
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  input?: Input;
  /**
   * Defines the workflow's reusable components.
   */
  use?: {
    /**
     * The workflow's reusable authentication policies.
     */
    authentications?: {
      [k: string]: AuthenticationPolicy;
    };
    /**
     * The workflow's reusable errors.
     */
    errors?: {
      [k: string]: Error;
    };
    /**
     * The workflow's extensions.
     */
    extensions?: {
      [k: string]: Extension;
    }[];
    /**
     * The workflow's reusable functions.
     */
    functions?: {
      [k: string]: Task;
    };
    /**
     * The workflow's reusable retry policies.
     */
    retries?: {
      [k: string]: RetryPolicy;
    };
    /**
     * The workflow's secrets.
     */
    secrets?: string[];
    [k: string]: unknown;
  };
  do: TaskList;
  timeout?: Timeout;
  output?: Output;
  /**
   * Schedules the workflow
   */
  schedule?: {
    every?: Duration;
    /**
     * Specifies the schedule using a cron expression, e.g., '0 0 * * *' for daily at midnight."
     */
    cron?: string;
    after?: Duration;
    on?: EventConsumptionStrategy;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
/**
 * Configures the workflow's input.
 */
export interface Input {
  schema?: Schema;
  /**
   * A runtime expression, if any, used to mutate and/or filter the input of the workflow or task.
   */
  from?: string;
  [k: string]: unknown;
}
/**
 * The security token that represents the identity of the party on behalf of whom the request is being made.
 */
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
 * This interface was referenced by `Workflow`'s JSON-Schema
 * via the `definition` "error".
 */
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
 *
 * This interface was referenced by `Workflow`'s JSON-Schema
 * via the `definition` "extension".
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
export interface CallAsyncAPI {
  call: 'asyncapi';
  /**
   * Defines the AsyncAPI call to perform.
   */
  with: {
    /**
     * The document that defines the AsyncAPI operation to call.
     */
    document:
      | string
      | {
          /**
           * The endpoint's URI.
           */
          uri: string;
          /**
           * The authentication policy to use.
           */
          authentication?: AuthenticationPolicy | string;
          /**
           * The external resource's name, if any.
           */
          name?: string;
          [k: string]: unknown;
        };
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
    /**
     * The authentication policy, if any, to use when calling the AsyncAPI operation.
     */
    authentication?: AuthenticationPolicy | string;
  };
  [k: string]: unknown;
}
export interface CallGRPC {
  call: 'grpc';
  /**
   * Defines the GRPC call to perform.
   */
  with: {
    /**
     * The proto resource that describes the GRPC service to call.
     */
    proto:
      | string
      | {
          /**
           * The endpoint's URI.
           */
          uri: string;
          /**
           * The authentication policy to use.
           */
          authentication?: AuthenticationPolicy | string;
          /**
           * The external resource's name, if any.
           */
          name?: string;
          [k: string]: unknown;
        };
    service: {
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
      /**
       * The endpoint's authentication policy, if any.
       */
      authentication?: AuthenticationPolicy | string;
      [k: string]: unknown;
    };
    /**
     * The name of the method to call on the defined GRPC service.
     */
    method: string;
    /**
     * The arguments, if any, to call the method with.
     */
    arguments?: {
      [k: string]: unknown;
    };
  };
  [k: string]: unknown;
}
export interface CallHTTP {
  call: 'http';
  /**
   * Defines the HTTP call to perform.
   */
  with: {
    /**
     * The HTTP method of the HTTP request to perform.
     */
    method: string;
    /**
     * The HTTP endpoint to send the request to.
     */
    endpoint: Endpoint | string;
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
  };
  [k: string]: unknown;
}
/**
 * This interface was referenced by `Workflow`'s JSON-Schema
 * via the `definition` "endpoint".
 */
export interface Endpoint {
  /**
   * The endpoint's URI.
   */
  uri: string;
  /**
   * The authentication policy to use.
   */
  authentication?: AuthenticationPolicy | string;
  [k: string]: unknown;
}
export interface CallOpenAPI {
  call: 'openapi';
  /**
   * Defines the OpenAPI call to perform.
   */
  with: {
    /**
     * The document that defines the OpenAPI operation to call.
     */
    document:
      | string
      | {
          /**
           * The endpoint's URI.
           */
          uri: string;
          /**
           * The authentication policy to use.
           */
          authentication?: AuthenticationPolicy | string;
          /**
           * The external resource's name, if any.
           */
          name?: string;
          [k: string]: unknown;
        };
    /**
     * The id of the OpenAPI operation to call.
     */
    operationId: string;
    /**
     * A name/value mapping of the parameters of the OpenAPI operation to call.
     */
    parameters?: {
      [k: string]: unknown;
    };
    /**
     * The authentication policy, if any, to use when calling the OpenAPI operation.
     */
    authentication?: AuthenticationPolicy | string;
    /**
     * The http call output format. Defaults to 'content'.
     */
    output?: 'raw' | 'content' | 'response';
  };
  [k: string]: unknown;
}
export interface CallFunction {
  /**
   * The name of the function to call.
   */
  call: string;
  /**
   * A name/value mapping of the parameters, if any, to call the function with.
   */
  with?: {
    [k: string]: unknown;
  };
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
  fork: {
    branches: TaskList;
    /**
     * Indicates whether or not the concurrent tasks are racing against each other, with a single possible winner, which sets the composite task's output.
     */
    compete?: boolean;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
/**
 * Allows workflows to publish events to event brokers or messaging systems, facilitating communication and coordination between different components and services.
 */
export interface EmitTask {
  emit: {
    event: {
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
    };
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
/**
 * Allows workflows to iterate over a collection of items, executing a defined set of subtasks for each item in the collection. This task type is instrumental in handling scenarios such as batch processing, data transformation, and repetitive operations across datasets.
 */
export interface ForTask {
  for: {
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
  };
  /**
   * A runtime expression that represents the condition, if any, that must be met for the iteration to continue.
   */
  while?: string;
  do: TaskList;
  [k: string]: unknown;
}
/**
 * Provides a mechanism for workflows to await and react to external events, enabling event-driven behavior within workflow systems.
 */
export interface ListenTask {
  listen: {
    to: EventConsumptionStrategy;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
/**
 * An event filter is a mechanism used to selectively process or handle events based on predefined criteria, such as event type, source, or specific attributes.
 *
 * This interface was referenced by `Workflow`'s JSON-Schema
 * via the `definition` "eventFilter".
 */
export interface EventFilter {
  /**
   * An event filter is a mechanism used to selectively process or handle events based on predefined criteria, such as event type, source, or specific attributes.
   */
  with: {
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
  };
  /**
   * A correlation is a link between events and data, established by mapping event attributes to specific data attributes, allowing for coordinated processing or handling based on event characteristics.
   */
  correlate?: {
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
  };
  [k: string]: unknown;
}

/**
 * Intentionally triggers and propagates errors.
 */
export interface RaiseTask {
  raise: {
    error: Error;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}

/**
 * Provides the capability to execute external containers, shell commands, scripts, or workflows.
 */
export interface RunTask {
  run:
    | {
        container: {
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
        };
        [k: string]: unknown;
      }
    | {
        script:
          | {
              code: string;
              [k: string]: unknown;
            }
          | {
              source: ExternalResource;
              [k: string]: unknown;
            };
        [k: string]: unknown;
      }
    | {
        shell: {
          /**
           * The shell command to run.
           */
          command: string;
          /**
           * A list of the arguments of the shell command to run.
           */
          arguments?: {
            [k: string]: unknown;
          };
          /**
           * A key/value mapping of the environment variables, if any, to use when running the configured process.
           */
          environment?: {
            [k: string]: unknown;
          };
          [k: string]: unknown;
        };
        [k: string]: unknown;
      }
    | {
        workflow: {
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
          /**
           * The data, if any, to pass as input to the workflow to execute. The value should be validated against the target workflow's input schema, if specified.
           */
          input?: {
            [k: string]: unknown;
          };
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
  [k: string]: unknown;
}
/**
 * A task used to set data
 */
export interface SetTask {
  /**
   * The data to set
   */
  set: {
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
/**
 * Enables conditional branching within workflows, allowing them to dynamically select different paths based on specified conditions or criteria
 */
export interface SwitchTask {
  /**
   * @minItems 1
   */
  switch: [
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
        /**
         * The flow directive to execute when the case matches.
         */
        then?: ('continue' | 'exit' | 'end') | string;
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
        /**
         * The flow directive to execute when the case matches.
         */
        then?: ('continue' | 'exit' | 'end') | string;
        [k: string]: unknown;
      };
    }[],
  ];
  [k: string]: unknown;
}
/**
 * Serves as a mechanism within workflows to handle errors gracefully, potentially retrying failed tasks before proceeding with alternate ones.
 */
export interface TryTask {
  try: TaskList;
  catch: {
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
  };
  [k: string]: unknown;
}
/**
 * The retry policy to use, if any, when catching errors.
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
  /**
   * The retry duration backoff.
   */
  backoff?:
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
   * The retry limit, if any
   */
  limit?: {
    attempt?: {
      /**
       * The maximum amount of retry attempts, if any.
       */
      count?: number;
      duration?: Duration;
      [k: string]: unknown;
    };
    duration?: Duration;
    [k: string]: unknown;
  };
  /**
   * The parameters, if any, that control the randomness or variability of the delay between retry attempts.
   */
  jitter?: {
    from: Duration;
    to: Duration;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
/**
 * The duration to wait between retry attempts.
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
 * Allows workflows to pause or delay their execution for a specified period of time.
 */
export interface WaitTask {
  wait: Duration;
  [k: string]: unknown;
}

/**
 * The workflow's timeout configuration, if any.
 */
export interface Timeout {
  after: Duration;
  [k: string]: unknown;
}

/**
 * Configures the workflow's output.
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
 * This interface was referenced by `Workflow`'s JSON-Schema
 * via the `definition` "taskBase".
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
  /**
   * The flow directive to be performed upon completion of the task.
   */
  then?: ('continue' | 'exit' | 'end') | string;
  [k: string]: unknown;
}

/**
 * Export task output to context.
 */
export interface Export {
  schema?: Schema;
  /**
   * A runtime expression, if any, used to export the output data to the context.
   */
  as?: string;
  [k: string]: unknown;
}
