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

/**
 * Serverless Workflow specification - workflow schema
 */
export type Workflow = /* Serverless Workflow specification - workflow schema */
  | {
      /**
       * Workflow unique identifier
       */
      id: string;
      /**
       * Domain-specific workflow identifier
       */
      key?: string;
      /**
       * Workflow name
       */
      name?: string;
      /**
       * Workflow description
       */
      description?: string;
      /**
       * Workflow version
       */
      version?: string;
      /**
       * List of helpful terms describing the workflows intended purpose, subject areas, or other important qualities
       */
      annotations?: [string, ...string[]];
      dataInputSchema?:
        | string
        | {
            /**
             * URI of the JSON Schema used to validate the workflow data input
             */
            schema: string;
            /**
             * Determines if workflow execution should continue if there are validation errors
             */
            failOnValidationErrors: boolean;
          };
      secrets?: Secrets;
      constants?:
        | string /* uri */
        | {
            [key: string]: any;
          };
      start?: Startdef;
      /**
       * Serverless Workflow schema version
       */
      specVersion: string;
      /**
       * Identifies the expression language used for workflow expressions. Default is 'jq'
       */
      expressionLang?: string;
      timeouts?: Timeouts;
      errors?: Errors;
      /**
       * If 'true', workflow instances is not terminated when there are no active execution paths. Instance can be terminated via 'terminate end definition' or reaching defined 'workflowExecTimeout'
       */
      keepActive?: boolean;
      metadata?: /* Metadata information */ Metadata;
      events?: Events;
      functions?: Functions;
      /**
       * If set to true, actions should automatically be retried on unchecked errors. Default is false
       */
      autoRetries?: boolean;
      retries?: Retries;
      auth?: Auth;
      /**
       * State definitions
       */
      states: [
        (
          | /* Causes the workflow execution to sleep for a specified duration */ Sleepstate
          | /* This state is used to wait for events from event sources, then consumes them and invoke one or more actions to run in sequence or parallel */ Eventstate
          | /* Defines actions be performed. Does not wait for incoming events */ Operationstate
          | /* Consists of a number of states that are executed in parallel */ Parallelstate
          | Switchstate
          | /* Inject static data into state data. Does not perform any actions */ Injectstate
          | /* Execute a set of defined actions or workflows for each element of a data array */ Foreachstate
          | /* This state performs an action, then waits for the callback event that denotes completion of the action */ Callbackstate
        ),
        ...(
          | /* Causes the workflow execution to sleep for a specified duration */ Sleepstate
          | /* This state is used to wait for events from event sources, then consumes them and invoke one or more actions to run in sequence or parallel */ Eventstate
          | /* Defines actions be performed. Does not wait for incoming events */ Operationstate
          | /* Consists of a number of states that are executed in parallel */ Parallelstate
          | Switchstate
          | /* Inject static data into state data. Does not perform any actions */ Injectstate
          | /* Execute a set of defined actions or workflows for each element of a data array */ Foreachstate
          | /* This state performs an action, then waits for the callback event that denotes completion of the action */ Callbackstate
        )[]
      ];
    }
  | {
      /**
       * Workflow unique identifier
       */
      id?: string;
      /**
       * Domain-specific workflow identifier
       */
      key: string;
      /**
       * Workflow name
       */
      name?: string;
      /**
       * Workflow description
       */
      description?: string;
      /**
       * Workflow version
       */
      version?: string;
      /**
       * List of helpful terms describing the workflows intended purpose, subject areas, or other important qualities
       */
      annotations?: [string, ...string[]];
      dataInputSchema?:
        | string
        | {
            /**
             * URI of the JSON Schema used to validate the workflow data input
             */
            schema: string;
            /**
             * Determines if workflow execution should continue if there are validation errors
             */
            failOnValidationErrors: boolean;
          };
      secrets?: Secrets;
      constants?:
        | string /* uri */
        | {
            [key: string]: any;
          };
      start?: Startdef;
      /**
       * Serverless Workflow schema version
       */
      specVersion: string;
      /**
       * Identifies the expression language used for workflow expressions. Default is 'jq'
       */
      expressionLang?: string;
      timeouts?: Timeouts;
      errors?: Errors;
      /**
       * If 'true', workflow instances is not terminated when there are no active execution paths. Instance can be terminated via 'terminate end definition' or reaching defined 'workflowExecTimeout'
       */
      keepActive?: boolean;
      metadata?: /* Metadata information */ Metadata;
      events?: Events;
      functions?: Functions;
      /**
       * If set to true, actions should automatically be retried on unchecked errors. Default is false
       */
      autoRetries?: boolean;
      retries?: Retries;
      auth?: Auth;
      /**
       * State definitions
       */
      states: [
        (
          | /* Causes the workflow execution to sleep for a specified duration */ Sleepstate
          | /* This state is used to wait for events from event sources, then consumes them and invoke one or more actions to run in sequence or parallel */ Eventstate
          | /* Defines actions be performed. Does not wait for incoming events */ Operationstate
          | /* Consists of a number of states that are executed in parallel */ Parallelstate
          | Switchstate
          | /* Inject static data into state data. Does not perform any actions */ Injectstate
          | /* Execute a set of defined actions or workflows for each element of a data array */ Foreachstate
          | /* This state performs an action, then waits for the callback event that denotes completion of the action */ Callbackstate
        ),
        ...(
          | /* Causes the workflow execution to sleep for a specified duration */ Sleepstate
          | /* This state is used to wait for events from event sources, then consumes them and invoke one or more actions to run in sequence or parallel */ Eventstate
          | /* Defines actions be performed. Does not wait for incoming events */ Operationstate
          | /* Consists of a number of states that are executed in parallel */ Parallelstate
          | Switchstate
          | /* Inject static data into state data. Does not perform any actions */ Injectstate
          | /* Execute a set of defined actions or workflows for each element of a data array */ Foreachstate
          | /* This state performs an action, then waits for the callback event that denotes completion of the action */ Callbackstate
        )[]
      ];
    };
export type Action =
  | {
      /**
       * Unique action definition name
       */
      name?: string;
      functionRef: Functionref;
      eventRef?: /* Event References */ Eventref;
      subFlowRef?: Subflowref;
      sleep?: Sleep;
      /**
       * References a defined workflow retry definition. If not defined the default retry policy is assumed
       */
      retryRef?: string;
      /**
       * List of unique references to defined workflow errors for which the action should not be retried. Used only when `autoRetries` is set to `true`
       */
      nonRetryableErrors?: [string, ...string[]];
      /**
       * List of unique references to defined workflow errors for which the action should be retried. Used only when `autoRetries` is set to `false`
       */
      retryableErrors?: [string, ...string[]];
      actionDataFilter?: Actiondatafilter;
    }
  | {
      /**
       * Unique action definition name
       */
      name?: string;
      functionRef?: Functionref;
      eventRef: /* Event References */ Eventref;
      subFlowRef?: Subflowref;
      sleep?: Sleep;
      /**
       * References a defined workflow retry definition. If not defined the default retry policy is assumed
       */
      retryRef?: string;
      /**
       * List of unique references to defined workflow errors for which the action should not be retried. Used only when `autoRetries` is set to `true`
       */
      nonRetryableErrors?: [string, ...string[]];
      /**
       * List of unique references to defined workflow errors for which the action should be retried. Used only when `autoRetries` is set to `false`
       */
      retryableErrors?: [string, ...string[]];
      actionDataFilter?: Actiondatafilter;
    }
  | {
      /**
       * Unique action definition name
       */
      name?: string;
      functionRef?: Functionref;
      eventRef?: /* Event References */ Eventref;
      subFlowRef: Subflowref;
      sleep?: Sleep;
      /**
       * References a defined workflow retry definition. If not defined the default retry policy is assumed
       */
      retryRef?: string;
      /**
       * List of unique references to defined workflow errors for which the action should not be retried. Used only when `autoRetries` is set to `true`
       */
      nonRetryableErrors?: [string, ...string[]];
      /**
       * List of unique references to defined workflow errors for which the action should be retried. Used only when `autoRetries` is set to `false`
       */
      retryableErrors?: [string, ...string[]];
      actionDataFilter?: Actiondatafilter;
    };
/**
 * Single actions definition execution timeout duration (ISO 8601 duration format)
 */
export type ActionExecTimeout = string;
export interface Actiondatafilter {
  /**
   * Workflow expression that selects state data that the state action can use
   */
  fromStateData?: string;
  /**
   * Workflow expression that filters the actions data results
   */
  results?: string;
  /**
   * Workflow expression that selects a state data element to which the action results should be added/merged into. If not specified, denote, the top-level state data element
   */
  toStateData?: string;
}
export type Auth = string /* uri */ | [Authdef, ...Authdef[]];
export interface Authdef {
  /**
   * Unique auth definition name
   */
  name: string;
  /**
   * Defines the auth type
   */
  scheme?: 'basic' | 'bearer' | 'oauth2';
  properties: string | Basicpropsdef | Bearerpropsdef | Oauth2propsdef;
}
export type Basicpropsdef =
  | string
  | {
      /**
       * String or a workflow expression. Contains the user name
       */
      username: string;
      /**
       * String or a workflow expression. Contains the user password
       */
      password: string;
      metadata?: /* Metadata information */ Metadata;
    };
export type Bearerpropsdef =
  | string
  | {
      /**
       * String or a workflow expression. Contains the token
       */
      token: string;
      metadata?: /* Metadata information */ Metadata;
    };
/**
 * Branch Definition
 */
export interface Branch {
  /**
   * Branch name
   */
  name: string;
  /**
   * State specific timeouts
   */
  timeouts?: {
    actionExecTimeout?: /* Single actions definition execution timeout duration (ISO 8601 duration format) */ ActionExecTimeout;
    branchExecTimeout?: /* Single branch execution timeout duration (ISO 8601 duration format) */ BranchExecTimeout;
  };
  /**
   * Actions to be executed in this branch
   */
  actions: Action[];
}
/**
 * Single branch execution timeout duration (ISO 8601 duration format)
 */
export type BranchExecTimeout = string;
/**
 * This state performs an action, then waits for the callback event that denotes completion of the action
 */
export interface Callbackstate {
  /**
   * Unique state id
   */
  id?: string;
  /**
   * State name
   */
  name?: string;
  /**
   * State type
   */
  type?: 'callback';
  /**
   * Defines the action to be executed
   */
  action?: Action;
  /**
   * References an unique callback event name in the defined workflow events
   */
  eventRef?: string;
  /**
   * State specific timeouts
   */
  timeouts?: {
    stateExecTimeout?: StateExecTimeout;
    actionExecTimeout?: /* Single actions definition execution timeout duration (ISO 8601 duration format) */ ActionExecTimeout;
    eventTimeout?: /* Timeout duration to wait for consuming defined events (ISO 8601 duration format) */ EventTimeout;
  };
  /**
   * Event data filter
   */
  eventDataFilter?: Eventdatafilter;
  /**
   * State data filter
   */
  stateDataFilter?: Statedatafilter;
  /**
   * States error handling definitions
   */
  onErrors?: Error[];
  /**
   * Next transition of the workflow after all the actions have been performed
   */
  transition?: Transition;
  /**
   * State end definition
   */
  end?: End;
  /**
   * Unique Name of a workflow state which is responsible for compensation of this state
   */
  compensatedBy?: string;
  /**
   * If true, this state is used to compensate another state. Default is false
   */
  usedForCompensation?: boolean;
  metadata?: /* Metadata information */ Metadata;
}
export type Continueasdef =
  | string
  | {
      /**
       * Unique id of the workflow to continue execution as
       */
      workflowId: string;
      /**
       * Version of the workflow to continue execution as
       */
      version?: string;
      /**
       * If string type, an expression which selects parts of the states data output to become the workflow data input of continued execution. If object type, a custom object to become the workflow data input of the continued execution
       */
      data?:
        | string
        | {
            [key: string]: any;
          };
      /**
       * Workflow execution timeout to be used by the workflow continuing execution. Overwrites any specific settings set by that workflow
       */
      workflowExecTimeout?: WorkflowExecTimeout;
    };
/**
 * CloudEvent correlation definition
 */
export interface CorrelationDef {
  /**
   * CloudEvent Extension Context Attribute name
   */
  contextAttributeName: string;
  /**
   * CloudEvent Extension Context Attribute value
   */
  contextAttributeValue?: string;
}
export type Crondef =
  | string
  | {
      /**
       * Repeating interval (cron expression) describing when the workflow instance should be created
       */
      expression: string;
      /**
       * Specific date and time (ISO 8601 format) when the cron expression invocation is no longer valid
       */
      validUntil?: string;
    };
/**
 * Permits transitions to other states based on data conditions
 */
export interface Databasedswitch {
  /**
   * Unique State id
   */
  id?: string;
  /**
   * State name
   */
  name: string;
  /**
   * State type
   */
  type: 'switch';
  /**
   * State data filter
   */
  stateDataFilter?: Statedatafilter;
  /**
   * State specific timeouts
   */
  timeouts?: {
    stateExecTimeout?: StateExecTimeout;
  };
  /**
   * Defines conditions evaluated against state data
   */
  dataConditions: Datacondition[];
  /**
   * States error handling definitions
   */
  onErrors?: Error[];
  /**
   * Default transition of the workflow if there is no matching data conditions. Can include a transition or end definition
   */
  defaultCondition?: /* DefaultCondition definition. Can be either a transition or end definition */ Defaultconditiondef;
  /**
   * Unique Name of a workflow state which is responsible for compensation of this state
   */
  compensatedBy?: string;
  /**
   * If true, this state is used to compensate another state. Default is false
   */
  usedForCompensation?: boolean;
  metadata?: /* Metadata information */ Metadata;
}
export type Datacondition = /* Switch state data based condition */
  | Transitiondatacondition
  | /* Switch state data based condition */ Enddatacondition;
/**
 * DefaultCondition definition. Can be either a transition or end definition
 */
export type Defaultconditiondef = /* DefaultCondition definition. Can be either a transition or end definition */
  | {
      transition: Transition;
      end?: End;
    }
  | {
      transition?: Transition;
      end: End;
    };
export type End =
  | boolean
  | {
      /**
       * If true, completes all execution flows in the given workflow instance
       */
      terminate?: boolean;
      /**
       * Defines events that should be produced
       */
      produceEvents?: /* Produce an event and set its data */ Produceeventdef[];
      /**
       * If set to true, triggers workflow compensation. Default is false
       */
      compensate?: boolean;
      continueAs?: Continueasdef;
    };
/**
 * Switch state data based condition
 */
export interface Enddatacondition {
  /**
   * Data condition name
   */
  name?: string;
  /**
   * Workflow expression evaluated against state data. Must evaluate to true or false
   */
  condition: string;
  /**
   * Workflow end definition
   */
  end: End;
  metadata?: /* Metadata information */ Metadata;
}
/**
 * Switch state data event condition
 */
export interface Enddeventcondition {
  /**
   * Event condition name
   */
  name?: string;
  /**
   * References an unique event name in the defined workflow events
   */
  eventRef: string;
  /**
   * Explicit transition to end
   */
  end: End;
  /**
   * Event data filter definition
   */
  eventDataFilter?: Eventdatafilter;
  metadata?: /* Metadata information */ Metadata;
}
export type Error =
  | {
      /**
       * Reference to a unique workflow error definition. Used of errorRefs is not used
       */
      errorRef: string;
      /**
       * References one or more workflow error definitions. Used if errorRef is not used
       */
      errorRefs?: [string, ...string[]];
      transition: Transition;
      end?: End;
    }
  | {
      /**
       * Reference to a unique workflow error definition. Used of errorRefs is not used
       */
      errorRef: string;
      /**
       * References one or more workflow error definitions. Used if errorRef is not used
       */
      errorRefs?: [string, ...string[]];
      transition?: Transition;
      end: End;
    }
  | {
      /**
       * Reference to a unique workflow error definition. Used of errorRefs is not used
       */
      errorRef?: string;
      /**
       * References one or more workflow error definitions. Used if errorRef is not used
       */
      errorRefs: [string, ...string[]];
      transition: Transition;
      end?: End;
    }
  | {
      /**
       * Reference to a unique workflow error definition. Used of errorRefs is not used
       */
      errorRef?: string;
      /**
       * References one or more workflow error definitions. Used if errorRef is not used
       */
      errorRefs: [string, ...string[]];
      transition?: Transition;
      end: End;
    };
export interface Errordef {
  /**
   * Domain-specific error name
   */
  name: string;
  /**
   * Error code. Can be used in addition to the name to help runtimes resolve to technical errors/exceptions. Should not be defined if error is set to '*'
   */
  code?: string;
  /**
   * Error description
   */
  description?: string;
}
export type Errors = string /* uri */ | [Errordef, ...Errordef[]];
/**
 * Timeout duration to wait for consuming defined events (ISO 8601 duration format)
 */
export type EventTimeout = string;
/**
 * Permits transitions to other states based on events
 */
export interface Eventbasedswitch {
  /**
   * Unique State id
   */
  id?: string;
  /**
   * State name
   */
  name: string;
  /**
   * State type
   */
  type: 'switch';
  /**
   * State data filter
   */
  stateDataFilter?: Statedatafilter;
  /**
   * State specific timeouts
   */
  timeouts?: {
    stateExecTimeout?: StateExecTimeout;
    eventTimeout?: /* Timeout duration to wait for consuming defined events (ISO 8601 duration format) */ EventTimeout;
  };
  /**
   * Defines conditions evaluated against events
   */
  eventConditions: Eventcondition[];
  /**
   * States error handling definitions
   */
  onErrors?: Error[];
  /**
   * Default transition of the workflow if there is no matching data conditions. Can include a transition or end definition
   */
  defaultCondition?: /* DefaultCondition definition. Can be either a transition or end definition */ Defaultconditiondef;
  /**
   * Unique Name of a workflow state which is responsible for compensation of this state
   */
  compensatedBy?: string;
  /**
   * If true, this state is used to compensate another state. Default is false
   */
  usedForCompensation?: boolean;
  metadata?: /* Metadata information */ Metadata;
}
export type Eventcondition = /* Switch state data event condition */
  | Transitioneventcondition
  | /* Switch state data event condition */ Enddeventcondition;
export interface Eventdatafilter {
  /**
   * Workflow expression that filters the received event/payload (default: '${ . }')
   */
  data?: string;
  /**
   *  Workflow expression that selects a state data element to which the filtered event should be added/merged into. If not specified, denotes, the top-level state data element.
   */
  toStateData?: string;
}
export interface Eventdef {
  /**
   * Unique event name
   */
  name?: string;
  /**
   * CloudEvent source
   */
  source?: string;
  /**
   * CloudEvent type
   */
  type?: string;
  /**
   * Defines the CloudEvent as either 'consumed' or 'produced' by the workflow. Default is 'consumed'
   */
  kind?: 'consumed' | 'produced';
  /**
   * CloudEvent correlation definitions
   */
  correlation?: [
    /* CloudEvent correlation definition */ CorrelationDef,
    .../* CloudEvent correlation definition */ CorrelationDef[]
  ];
  /**
   * If `true`, only the Event payload is accessible to consuming Workflow states. If `false`, both event payload and context attributes should be accessible
   */
  dataOnly?: boolean;
  /**
   * Metadata information
   */
  metadata?: /* Metadata information */ Metadata;
}
/**
 * Event References
 */
export interface Eventref {
  /**
   * Reference to the unique name of a 'produced' event definition
   */
  triggerEventRef: string;
  /**
   * Reference to the unique name of a 'consumed' event definition
   */
  resultEventRef: string;
  /**
   * If string type, an expression which selects parts of the states data output to become the data (payload) of the event referenced by 'triggerEventRef'. If object type, a custom object to become the data (payload) of the event referenced by 'triggerEventRef'.
   */
  data?:
    | string
    | {
        [key: string]: any;
      };
  /**
   * Add additional extension context attributes to the produced event
   */
  contextAttributes?: {
    [name: string]: string;
  };
}
export type Events = string /* uri */ | [Eventdef, ...Eventdef[]];
/**
 * This state is used to wait for events from event sources, then consumes them and invoke one or more actions to run in sequence or parallel
 */
export type Eventstate =
  /* This state is used to wait for events from event sources, then consumes them and invoke one or more actions to run in sequence or parallel */
    | {
        /**
         * Unique State id
         */
        id?: string;
        /**
         * State name
         */
        name: string;
        /**
         * State type
         */
        type: 'event';
        /**
         * If true consuming one of the defined events causes its associated actions to be performed. If false all of the defined events must be consumed in order for actions to be performed
         */
        exclusive?: boolean;
        /**
         * Define the events to be consumed and optional actions to be performed
         */
        onEvents: Onevents[];
        /**
         * State specific timeouts
         */
        timeouts?: {
          stateExecTimeout?: StateExecTimeout;
          actionExecTimeout?: /* Single actions definition execution timeout duration (ISO 8601 duration format) */ ActionExecTimeout;
          eventTimeout?: /* Timeout duration to wait for consuming defined events (ISO 8601 duration format) */ EventTimeout;
        };
        stateDataFilter?: Statedatafilter;
        /**
         * States error handling definitions
         */
        onErrors?: Error[];
        transition?: Transition;
        end: End;
        /**
         * Unique Name of a workflow state which is responsible for compensation of this state
         */
        compensatedBy?: string;
        metadata?: /* Metadata information */ Metadata;
      }
    | {
        /**
         * Unique State id
         */
        id?: string;
        /**
         * State name
         */
        name: string;
        /**
         * State type
         */
        type: 'event';
        /**
         * If true consuming one of the defined events causes its associated actions to be performed. If false all of the defined events must be consumed in order for actions to be performed
         */
        exclusive?: boolean;
        /**
         * Define the events to be consumed and optional actions to be performed
         */
        onEvents: Onevents[];
        /**
         * State specific timeouts
         */
        timeouts?: {
          stateExecTimeout?: StateExecTimeout;
          actionExecTimeout?: /* Single actions definition execution timeout duration (ISO 8601 duration format) */ ActionExecTimeout;
          eventTimeout?: /* Timeout duration to wait for consuming defined events (ISO 8601 duration format) */ EventTimeout;
        };
        stateDataFilter?: Statedatafilter;
        /**
         * States error handling definitions
         */
        onErrors?: Error[];
        transition: Transition;
        end?: End;
        /**
         * Unique Name of a workflow state which is responsible for compensation of this state
         */
        compensatedBy?: string;
        metadata?: /* Metadata information */ Metadata;
      };
/**
 * Execute a set of defined actions or workflows for each element of a data array
 */
export interface Foreachstate {
  /**
   * Unique State id
   */
  id?: string;
  /**
   * State name
   */
  name?: string;
  /**
   * State type
   */
  type?: 'foreach';
  /**
   * State end definition
   */
  end?: End;
  /**
   * Workflow expression selecting an array element of the states data
   */
  inputCollection?: string;
  /**
   * Workflow expression specifying an array element of the states data to add the results of each iteration
   */
  outputCollection?: string;
  /**
   * Name of the iteration parameter that can be referenced in actions/workflow. For each parallel iteration, this param should contain an unique element of the inputCollection array
   */
  iterationParam?: string;
  /**
   * Specifies how many iterations may run in parallel at the same time. Used if 'mode' property is set to 'parallel' (default)
   */
  batchSize?: number | string;
  /**
   * Actions to be executed for each of the elements of inputCollection
   */
  actions?: Action[];
  /**
   * State specific timeouts
   */
  timeouts?: {
    stateExecTimeout?: StateExecTimeout;
    actionExecTimeout?: /* Single actions definition execution timeout duration (ISO 8601 duration format) */ ActionExecTimeout;
  };
  /**
   * State data filter
   */
  stateDataFilter?: Statedatafilter;
  /**
   * States error handling definitions
   */
  onErrors?: Error[];
  /**
   * Next transition of the workflow after state has completed
   */
  transition?: Transition;
  /**
   * Unique Name of a workflow state which is responsible for compensation of this state
   */
  compensatedBy?: string;
  /**
   * If true, this state is used to compensate another state. Default is false
   */
  usedForCompensation?: boolean;
  /**
   * Specifies how iterations are to be performed (sequentially or in parallel)
   */
  mode?: 'sequential' | 'parallel';
  metadata?: /* Metadata information */ Metadata;
}
export interface Function {
  /**
   * Unique function name
   */
  name: string;
  /**
   * If type is `rest`, <path_to_openapi_definition>#<operation_id>. If type is `asyncapi`, <path_to_asyncapi_definition>#<operation_id>. If type is `rpc`, <path_to_grpc_proto_file>#<service_name>#<service_method>. If type is `graphql`, <url_to_graphql_endpoint>#<literal \"mutation\" or \"query\">#<query_or_mutation_name>. If type is `odata`, <URI_to_odata_service>#<Entity_Set_Name>. If type is `expression`, defines the workflow expression.
   */
  operation: string;
  /**
   * Defines the function type. Is either `rest`, `asyncapi, `rpc`, `graphql`, `odata`, `expression`, or `custom`. Default is `rest`
   */
  type?: 'rest' | 'asyncapi' | 'rpc' | 'graphql' | 'odata' | 'expression' | 'custom';
  /**
   * References an auth definition name to be used to access to resource defined in the operation parameter
   */
  authRef?: string;
  metadata?: /* Metadata information */ Metadata;
}
export type Functionref =
  | string
  | {
      /**
       * Name of the referenced function
       */
      refName: string;
      /**
       * Function arguments/inputs
       */
      arguments?: {
        [key: string]: any;
      };
      /**
       * Only used if function type is 'graphql'. A string containing a valid GraphQL selection set
       */
      selectionSet?: string;
    };
export type Functions = string /* uri */ | [Function, ...Function[]];
/**
 * Inject static data into state data. Does not perform any actions
 */
export interface Injectstate {
  /**
   * Unique state id
   */
  id?: string;
  /**
   * State name
   */
  name?: string;
  /**
   * State type
   */
  type?: 'inject';
  /**
   * State end definition
   */
  end?: End;
  /**
   * JSON object which can be set as states data input and can be manipulated via filters
   */
  data?: {
    [key: string]: any;
  };
  /**
   * State specific timeouts
   */
  timeouts?: {
    stateExecTimeout?: StateExecTimeout;
  };
  /**
   * State data filter
   */
  stateDataFilter?: Statedatafilter;
  /**
   * Next transition of the workflow after injection has completed
   */
  transition?: Transition;
  /**
   * Unique Name of a workflow state which is responsible for compensation of this state
   */
  compensatedBy?: string;
  /**
   * If true, this state is used to compensate another state. Default is false
   */
  usedForCompensation?: boolean;
  metadata?: /* Metadata information */ Metadata;
}
/**
 * Metadata information
 */
export interface Metadata {
  [name: string]: string;
}
export type Oauth2propsdef =
  | string
  | {
      /**
       * String or a workflow expression. Contains the authority information
       */
      authority?: string;
      /**
       * Defines the grant type
       */
      grantType: 'password' | 'clientCredentials' | 'tokenExchange';
      /**
       * String or a workflow expression. Contains the client identifier
       */
      clientId: string;
      /**
       * Workflow secret or a workflow expression. Contains the client secret
       */
      clientSecret?: string;
      /**
       * Array containing strings or workflow expressions. Contains the OAuth2 scopes
       */
      scopes?: [string, ...string[]];
      /**
       * String or a workflow expression. Contains the user name. Used only if grantType is 'resourceOwner'
       */
      username?: string;
      /**
       * String or a workflow expression. Contains the user password. Used only if grantType is 'resourceOwner'
       */
      password?: string;
      /**
       * Array containing strings or workflow expressions. Contains the OAuth2 audiences
       */
      audiences?: [string, ...string[]];
      /**
       * String or a workflow expression. Contains the subject token
       */
      subjectToken?: string;
      /**
       * String or a workflow expression. Contains the requested subject
       */
      requestedSubject?: string;
      /**
       * String or a workflow expression. Contains the requested issuer
       */
      requestedIssuer?: string;
      metadata?: /* Metadata information */ Metadata;
    };
export interface Onevents {
  /**
   * References one or more unique event names in the defined workflow events
   */
  eventRefs: [string, ...string[]];
  /**
   * Specifies how actions are to be performed (in sequence or in parallel)
   */
  actionMode?: 'sequential' | 'parallel';
  /**
   * Actions to be performed if expression matches
   */
  actions?: Action[];
  /**
   * Event data filter
   */
  eventDataFilter?: Eventdatafilter;
}
/**
 * Defines actions be performed. Does not wait for incoming events
 */
export interface Operationstate {
  /**
   * Unique State id
   */
  id?: string;
  /**
   * State name
   */
  name?: string;
  /**
   * State type
   */
  type?: 'operation';
  /**
   * State end definition
   */
  end?: End;
  /**
   * State data filter
   */
  stateDataFilter?: Statedatafilter;
  /**
   * Specifies whether actions are performed in sequence or in parallel
   */
  actionMode?: 'sequential' | 'parallel';
  /**
   * Actions to be performed
   */
  actions?: Action[];
  /**
   * State specific timeouts
   */
  timeouts?: {
    stateExecTimeout?: StateExecTimeout;
    actionExecTimeout?: /* Single actions definition execution timeout duration (ISO 8601 duration format) */ ActionExecTimeout;
  };
  /**
   * States error handling definitions
   */
  onErrors?: Error[];
  /**
   * Next transition of the workflow after all the actions have been performed
   */
  transition?: Transition;
  /**
   * Unique Name of a workflow state which is responsible for compensation of this state
   */
  compensatedBy?: string;
  /**
   * If true, this state is used to compensate another state. Default is false
   */
  usedForCompensation?: boolean;
  metadata?: /* Metadata information */ Metadata;
}
/**
 * Consists of a number of states that are executed in parallel
 */
export interface Parallelstate {
  /**
   * Unique State id
   */
  id?: string;
  /**
   * State name
   */
  name?: string;
  /**
   * State type
   */
  type?: 'parallel';
  /**
   * State end definition
   */
  end?: End;
  /**
   * State data filter
   */
  stateDataFilter?: Statedatafilter;
  /**
   * State specific timeouts
   */
  timeouts?: {
    stateExecTimeout?: StateExecTimeout;
    branchExecTimeout?: /* Single branch execution timeout duration (ISO 8601 duration format) */ BranchExecTimeout;
  };
  /**
   * Branch Definitions
   */
  branches?: /* Branch Definition */ Branch[];
  /**
   * Option types on how to complete branch execution.
   */
  completionType?: 'allOf' | 'atLeast';
  /**
   * Used when completionType is set to 'atLeast' to specify the minimum number of branches that must complete before the state will transition.
   */
  numCompleted?: number | string;
  /**
   * States error handling definitions
   */
  onErrors?: Error[];
  /**
   * Next transition of the workflow after all branches have completed execution
   */
  transition?: Transition;
  /**
   * Unique Name of a workflow state which is responsible for compensation of this state
   */
  compensatedBy?: string;
  /**
   * If true, this state is used to compensate another state. Default is false
   */
  usedForCompensation?: boolean;
  metadata?: /* Metadata information */ Metadata;
}
/**
 * Produce an event and set its data
 */
export interface Produceeventdef {
  /**
   * References a name of a defined event
   */
  eventRef: string;
  /**
   * If String, expression which selects parts of the states data output to become the data of the produced event. If object a custom object to become the data of produced event.
   */
  data?:
    | string
    | {
        [key: string]: any;
      };
  /**
   * Add additional event extension context attributes
   */
  contextAttributes?: {
    [name: string]: string;
  };
}
export type Retries = string /* uri */ | [Retrydef, ...Retrydef[]];
export interface Retrydef {
  /**
   * Unique retry strategy name
   */
  name: string;
  /**
   * Time delay between retry attempts (ISO 8601 duration format)
   */
  delay?: string;
  /**
   * Maximum time delay between retry attempts (ISO 8601 duration format)
   */
  maxDelay?: string;
  /**
   * Static value by which the delay increases during each attempt (ISO 8601 time format)
   */
  increment?: string;
  /**
   * Numeric value, if specified the delay between retries is multiplied by this value.
   */
  multiplier?: number | string;
  /**
   * Maximum number of retry attempts.
   */
  maxAttempts: number | string;
  /**
   * If float type, maximum amount of random time added or subtracted from the delay between each retry relative to total delay (between 0 and 1). If string type, absolute maximum amount of random time added or subtracted from the delay between each retry (ISO 8601 duration format)
   */
  jitter?: number | string;
}
export type Schedule =
  | string
  | /* Start state schedule definition */ (
      | {
          /**
           * Time interval (must be repeating interval) described with ISO 8601 format. Declares when workflow instances will be automatically created.
           */
          interval: string;
          cron?: Crondef;
          /**
           * Timezone name used to evaluate the interval & cron-expression. (default: UTC)
           */
          timezone?: string;
        }
      | {
          /**
           * Time interval (must be repeating interval) described with ISO 8601 format. Declares when workflow instances will be automatically created.
           */
          interval?: string;
          cron: Crondef;
          /**
           * Timezone name used to evaluate the interval & cron-expression. (default: UTC)
           */
          timezone?: string;
        }
    );
export type Secrets = string /* uri */ | [string, ...string[]];
export type Sleep =
  | {
      /**
       * Amount of time (ISO 8601 duration format) to sleep before function/subflow invocation. Does not apply if 'eventRef' is defined.
       */
      before: string;
      /**
       * Amount of time (ISO 8601 duration format) to sleep after function/subflow invocation. Does not apply if 'eventRef' is defined.
       */
      after?: string;
    }
  | {
      /**
       * Amount of time (ISO 8601 duration format) to sleep before function/subflow invocation. Does not apply if 'eventRef' is defined.
       */
      before?: string;
      /**
       * Amount of time (ISO 8601 duration format) to sleep after function/subflow invocation. Does not apply if 'eventRef' is defined.
       */
      after: string;
    }
  | {
      /**
       * Amount of time (ISO 8601 duration format) to sleep before function/subflow invocation. Does not apply if 'eventRef' is defined.
       */
      before: string;
      /**
       * Amount of time (ISO 8601 duration format) to sleep after function/subflow invocation. Does not apply if 'eventRef' is defined.
       */
      after: string;
    };
/**
 * Causes the workflow execution to sleep for a specified duration
 */
export interface Sleepstate {
  /**
   * Unique State id
   */
  id?: string;
  /**
   * State name
   */
  name?: string;
  /**
   * State type
   */
  type?: 'sleep';
  /**
   * State end definition
   */
  end?: End;
  /**
   * State data filter
   */
  stateDataFilter?: Statedatafilter;
  /**
   * Duration (ISO 8601 duration format) to sleep
   */
  duration?: string;
  /**
   * State specific timeouts
   */
  timeouts?: {
    stateExecTimeout?: StateExecTimeout;
  };
  /**
   * States error handling definitions
   */
  onErrors?: Error[];
  /**
   * Next transition of the workflow after the workflow sleep
   */
  transition?: Transition;
  /**
   * Unique Name of a workflow state which is responsible for compensation of this state
   */
  compensatedBy?: string;
  /**
   * If true, this state is used to compensate another state. Default is false
   */
  usedForCompensation?: boolean;
  metadata?: /* Metadata information */ Metadata;
}
export type Startdef =
  | string
  | {
      /**
       * Name of the starting workflow state
       */
      stateName: string;
      /**
       * Define the time/repeating intervals or cron at which workflow instances should be automatically started.
       */
      schedule: Schedule;
    };
export type StateExecTimeout =
  | string
  | {
      /**
       * Single state execution timeout, not including retries (ISO 8601 duration format)
       */
      single?: string;
      /**
       * Total state execution timeout, including retries (ISO 8601 duration format)
       */
      total: string;
    };
export interface Statedatafilter {
  /**
   * Workflow expression to filter the state data input
   */
  input?: string;
  /**
   * Workflow expression that filters the state data output
   */
  output?: string;
}
export type Subflowref =
  | string
  | {
      /**
       * Unique id of the sub-workflow to be invoked
       */
      workflowId: string;
      /**
       * Version of the sub-workflow to be invoked
       */
      version?: string;
    };
export type Switchstate = /* Permits transitions to other states based on data conditions */
  | Databasedswitch
  | /* Permits transitions to other states based on events */ Eventbasedswitch;
export type Timeouts =
  | string /* uri */
  | {
      workflowExecTimeout?: WorkflowExecTimeout;
      stateExecTimeout?: StateExecTimeout;
      actionExecTimeout?: /* Single actions definition execution timeout duration (ISO 8601 duration format) */ ActionExecTimeout;
      branchExecTimeout?: /* Single branch execution timeout duration (ISO 8601 duration format) */ BranchExecTimeout;
      eventTimeout?: /* Timeout duration to wait for consuming defined events (ISO 8601 duration format) */ EventTimeout;
    };
export type Transition =
  | string
  | {
      /**
       * Name of state to transition to
       */
      nextState: string;
      /**
       * Array of events to be produced before the transition happens
       */
      produceEvents?: /* Produce an event and set its data */ Produceeventdef[];
      /**
       * If set to true, triggers workflow compensation when before this transition is taken. Default is false
       */
      compensate?: boolean;
    };
/**
 * Switch state data based condition
 */
export interface Transitiondatacondition {
  /**
   * Data condition name
   */
  name?: string;
  /**
   * Workflow expression evaluated against state data. Must evaluate to true or false
   */
  condition: string;
  /**
   * Workflow transition if condition is evaluated to true
   */
  transition: Transition;
  metadata?: /* Metadata information */ Metadata;
}
/**
 * Switch state data event condition
 */
export interface Transitioneventcondition {
  /**
   * Event condition name
   */
  name?: string;
  /**
   * References an unique event name in the defined workflow events
   */
  eventRef: string;
  /**
   * Next transition of the workflow if there is valid matches
   */
  transition: Transition;
  /**
   * Event data filter definition
   */
  eventDataFilter?: Eventdatafilter;
  metadata?: /* Metadata information */ Metadata;
}
export type WorkflowExecTimeout =
  | string
  | {
      /**
       * Workflow execution timeout duration (ISO 8601 duration format). If not specified should be 'unlimited'
       */
      duration: string;
      /**
       * If `false`, workflow instance is allowed to finish current execution. If `true`, current workflow execution is abrupted.
       */
      interrupt?: boolean;
      /**
       * Name of a workflow state to be executed before workflow instance is terminated
       */
      runBefore?: string;
    };
