    /**
     * Serverless Workflow specification - workflow schema
     */
    export interface Workflow {
        /**
         * Workflow unique identifier
         */
        id: string;
        /**
         * Workflow name
         */
        name: string;
        /**
         * Workflow description
         */
        description?: string;
        /**
         * Workflow version
         */
        version: string;
        start: Startdef;
        /**
         * Serverless Workflow schema version
         */
        schemaVersion?: string;
        /**
         * Identifies the expression language used for workflow expressions. Default is 'jq'
         */
        expressionLang?: string;
        execTimeout?: Exectimeout;
        /**
         * If 'true', workflow instances is not terminated when there are no active execution paths. Instance can be terminated via 'terminate end definition' or reaching defined 'execTimeout'
         */
        keepActive?: boolean;
        metadata?: /* Metadata information */ Metadata;
        events?: Events;
        functions?: Functions;
        retries?: Retries;
        /**
         * State definitions
         */
        states: [
            (/* Causes the workflow execution to delay for a specified duration */ Delaystate | /* This state is used to wait for events from event sources, then consumes them and invoke one or more actions to run in sequence or parallel */ Eventstate | /* Defines actions be performed. Does not wait for incoming events */ Operationstate | /* Consists of a number of states that are executed in parallel */ Parallelstate | Switchstate | /* Defines a sub-workflow to be executed */ Subflowstate | /* Inject static data into state data. Does not perform any actions */ Injectstate | /* Execute a set of defined actions or workflows for each element of a data array */ Foreachstate | /* This state performs an action, then waits for the callback event that denotes completion of the action */ Callbackstate),
            ...(/* Causes the workflow execution to delay for a specified duration */ Delaystate | /* This state is used to wait for events from event sources, then consumes them and invoke one or more actions to run in sequence or parallel */ Eventstate | /* Defines actions be performed. Does not wait for incoming events */ Operationstate | /* Consists of a number of states that are executed in parallel */ Parallelstate | Switchstate | /* Defines a sub-workflow to be executed */ Subflowstate | /* Inject static data into state data. Does not perform any actions */ Injectstate | /* Execute a set of defined actions or workflows for each element of a data array */ Foreachstate | /* This state performs an action, then waits for the callback event that denotes completion of the action */ Callbackstate)[]
        ];
    }
    export type Action = {
        /**
         * Unique action definition name
         */
        name?: string;
        functionRef: string | {
            /**
             * Name of the referenced function
             */
            refName: string;
            /**
             * Function arguments
             */
            arguments?: {
                [key: string]: any;
            };
        };
        eventRef?: /* Event References */ Eventref;
        /**
         * Time period to wait for function execution to complete
         */
        timeout?: string;
        actionDataFilter?: Actiondatafilter;
    } | {
        /**
         * Unique action definition name
         */
        name?: string;
        functionRef?: string | {
            /**
             * Name of the referenced function
             */
            refName: string;
            /**
             * Function arguments
             */
            arguments?: {
                [key: string]: any;
            };
        };
        eventRef: /* Event References */ Eventref;
        /**
         * Time period to wait for function execution to complete
         */
        timeout?: string;
        actionDataFilter?: Actiondatafilter;
    };
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
    /**
     * Branch Definition
     */
    export type Branch = /* Branch Definition */ {
        /**
         * Branch name
         */
        name: string;
        /**
         * Actions to be executed in this branch
         */
        actions?: Action[];
        /**
         * Unique Id of a workflow to be executed in this branch
         */
        workflowId: string;
    } | {
        /**
         * Branch name
         */
        name: string;
        /**
         * Actions to be executed in this branch
         */
        actions: Action[];
        /**
         * Unique Id of a workflow to be executed in this branch
         */
        workflowId?: string;
    };
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
        type?: "callback";
        /**
         * Defines the action to be executed
         */
        action?: Action;
        /**
         * References an unique callback event name in the defined workflow events
         */
        eventRef?: string;
        /**
         * Time period to wait for incoming events (ISO 8601 format)
         */
        timeout?: string;
        /**
         * Event data filter
         */
        eventDataFilter?: Eventdatafilter;
        /**
         * State data filter
         */
        stateDataFilter?: Statedatafilter;
        /**
         * States error handling and retries definitions
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
    export type Crondef = string | {
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
        type: "switch";
        /**
         * State data filter
         */
        stateDataFilter?: Statedatafilter;
        /**
         * Defines conditions evaluated against state data
         */
        dataConditions: Datacondition[];
        /**
         * States error handling and retries definitions
         */
        onErrors?: Error[];
        /**
         * Default transition of the workflow if there is no matching data conditions. Can include a transition or end definition
         */
        default?: /* Default definition. Can be either a transition or end definition */ Defaultdef;
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
    export type Datacondition = /* Switch state data based condition */ Transitiondatacondition | /* Switch state data based condition */ Enddatacondition;
    /**
     * Default definition. Can be either a transition or end definition
     */
    export type Defaultdef = /* Default definition. Can be either a transition or end definition */ {
        transition: Transition;
        end?: End;
    } | {
        transition?: Transition;
        end: End;
    };
    /**
     * Causes the workflow execution to delay for a specified duration
     */
    export interface Delaystate {
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
        type?: "delay";
        /**
         * State end definition
         */
        end?: End;
        /**
         * State data filter
         */
        stateDataFilter?: Statedatafilter;
        /**
         * Amount of time (ISO 8601 format) to delay
         */
        timeDelay?: string;
        /**
         * States error handling and retries definitions
         */
        onErrors?: Error[];
        /**
         * Next transition of the workflow after the time delay
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
    export type End = boolean | {
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
    export type Error = {
        /**
         * Domain-specific error name, or '*' to indicate all possible errors
         */
        error: string;
        /**
         * Error code. Can be used in addition to the name to help runtimes resolve to technical errors/exceptions. Should not be defined if error is set to '*'
         */
        code?: string;
        /**
         * References a unique name of a retry definition.
         */
        retryRef?: string;
        transition: Transition;
        end?: End;
    } | {
        /**
         * Domain-specific error name, or '*' to indicate all possible errors
         */
        error: string;
        /**
         * Error code. Can be used in addition to the name to help runtimes resolve to technical errors/exceptions. Should not be defined if error is set to '*'
         */
        code?: string;
        /**
         * References a unique name of a retry definition.
         */
        retryRef?: string;
        transition?: Transition;
        end: End;
    };
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
        type: "switch";
        /**
         * State data filter
         */
        stateDataFilter?: Statedatafilter;
        /**
         * Defines conditions evaluated against events
         */
        eventConditions: Eventcondition[];
        /**
         * States error handling and retries definitions
         */
        onErrors?: Error[];
        /**
         * If eventConditions is used, defines the time period to wait for events (ISO 8601 format)
         */
        eventTimeout?: string;
        /**
         * Default transition of the workflow if there is no matching data conditions. Can include a transition or end definition
         */
        default?: /* Default definition. Can be either a transition or end definition */ Defaultdef;
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
    export type Eventcondition = /* Switch state data event condition */ Transitioneventcondition | /* Switch state data event condition */ Enddeventcondition;
    export interface Eventdatafilter {
        /**
         * Workflow expression that filters of the event data (payload)
         */
        data?: string;
        /**
         *  Workflow expression that selects a state data element to which the event payload should be added/merged into. If not specified, denotes, the top-level state data element.
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
        kind?: "consumed" | "produced";
        /**
         * CloudEvent correlation definitions
         */
        correlation?: [
            /* CloudEvent correlation definition */ CorrelationDef,
            .../* CloudEvent correlation definition */ CorrelationDef[]
        ];
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
        data?: string | {
            [key: string]: any;
        };
        /**
         * Add additional extension context attributes to the produced event
         */
        contextAttributes?: {
            [name: string]: string;
        };
    }
    export type Events = string /* uri */ | [
        Eventdef,
        ...Eventdef[]
    ];
    /**
     * This state is used to wait for events from event sources, then consumes them and invoke one or more actions to run in sequence or parallel
     */
    export type Eventstate = /* This state is used to wait for events from event sources, then consumes them and invoke one or more actions to run in sequence or parallel */ {
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
        type: "event";
        /**
         * If true consuming one of the defined events causes its associated actions to be performed. If false all of the defined events must be consumed in order for actions to be performed
         */
        exclusive?: boolean;
        /**
         * Define the events to be consumed and optional actions to be performed
         */
        onEvents: Onevents[];
        /**
         * Time period to wait for incoming events (ISO 8601 format)
         */
        timeout?: string;
        stateDataFilter?: Statedatafilter;
        /**
         * States error handling and retries definitions
         */
        onErrors?: Error[];
        transition?: Transition;
        end: End;
        /**
         * Unique Name of a workflow state which is responsible for compensation of this state
         */
        compensatedBy?: string;
        metadata?: /* Metadata information */ Metadata;
    } | {
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
        type: "event";
        /**
         * If true consuming one of the defined events causes its associated actions to be performed. If false all of the defined events must be consumed in order for actions to be performed
         */
        exclusive?: boolean;
        /**
         * Define the events to be consumed and optional actions to be performed
         */
        onEvents: Onevents[];
        /**
         * Time period to wait for incoming events (ISO 8601 format)
         */
        timeout?: string;
        stateDataFilter?: Statedatafilter;
        /**
         * States error handling and retries definitions
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
    export interface Exectimeout {
        /**
         * Timeout duration (ISO 8601 duration format)
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
    }
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
        type?: "foreach";
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
         * Specifies how upper bound on how many iterations may run in parallel
         */
        max?: number | string;
        /**
         * Actions to be executed for each of the elements of inputCollection
         */
        actions?: Action[];
        /**
         * Unique Id of a workflow to be executed for each of the elements of inputCollection
         */
        workflowId?: string;
        /**
         * State data filter
         */
        stateDataFilter?: Statedatafilter;
        /**
         * States error handling and retries definitions
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
        metadata?: /* Metadata information */ Metadata;
    }
    export interface Function {
        /**
         * Unique function name
         */
        name: string;
        /**
         * If type is `rest`, <path_to_openapi_definition>#<operation_id>. If type is `rpc`, <path_to_grpc_proto_file>#<service_name>#<service_method>. If type is `expression`, defines the workflow expression.
         */
        operation: string;
        /**
         * Defines the function type. Is either `rest`, `rpc` or `expression`. Default is `rest`
         */
        type?: "rest" | "rpc" | "expression";
    }
    export type Functions = string /* uri */ | [
        Function,
        ...Function[]
    ];
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
        type?: "inject";
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
         * State data filter
         */
        stateDataFilter?: Statedatafilter;
        /**
         * Next transition of the workflow after subflow has completed
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
    export interface Onevents {
        /**
         * References one or more unique event names in the defined workflow events
         */
        eventRefs: [
            string,
            ...string[]
        ];
        /**
         * Specifies how actions are to be performed (in sequence of parallel)
         */
        actionMode?: "sequential" | "parallel";
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
        type?: "operation";
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
        actionMode?: "sequential" | "parallel";
        /**
         * Actions to be performed
         */
        actions?: Action[];
        /**
         * States error handling and retries definitions
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
        type?: "parallel";
        /**
         * State end definition
         */
        end?: End;
        /**
         * State data filter
         */
        stateDataFilter?: Statedatafilter;
        /**
         * Branch Definitions
         */
        branches?: /* Branch Definition */ Branch[];
        /**
         * Option types on how to complete branch execution.
         */
        completionType?: "and" | "xor" | "n_of_m";
        /**
         * Used when completionType is set to 'n_of_m' to specify the 'N' value
         */
        n?: number | string;
        /**
         * States error handling and retries definitions
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
        data?: string | {
            [key: string]: any;
        };
        /**
         * Add additional event extension context attributes
         */
        contextAttributes?: {
            [name: string]: string;
        };
    }
    export interface Repeat {
        /**
         * Expression evaluated against SubFlow state data. SubFlow will repeat execution as long as this expression is true or until the max property count is reached
         */
        expression?: string;
        /**
         * If true, the expression is evaluated before each repeat execution, if false the expression is evaluated after each repeat execution
         */
        checkBefore?: boolean;
        /**
         * Sets the maximum amount of repeat executions
         */
        max?: number;
        /**
         * If true, repeats executions in a case unhandled errors propagate from the sub-workflow to this state
         */
        continueOnError?: boolean;
        /**
         * List referencing defined consumed workflow events. SubFlow will repeat execution until one of the defined events is consumed, or until the max property count is reached
         */
        stopOnEvents?: [
            string,
            ...string[]
        ];
    }
    export type Retries = string /* uri */ | [
        Retrydef,
        ...Retrydef[]
    ];
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
    export type Schedule = string | /* Start state schedule definition */ ({
        /**
         * Time interval (must be repeating interval) described with ISO 8601 format. Declares when workflow instances will be automatically created.
         */
        interval: string;
        cron?: Crondef;
        /**
         * Timezone name used to evaluate the interval & cron-expression. (default: UTC)
         */
        timezone?: string;
    } | {
        /**
         * Time interval (must be repeating interval) described with ISO 8601 format. Declares when workflow instances will be automatically created.
         */
        interval?: string;
        cron: Crondef;
        /**
         * Timezone name used to evaluate the interval & cron-expression. (default: UTC)
         */
        timezone?: string;
    });
    export type Startdef = string | {
        /**
         * Name of the starting workflow state
         */
        stateName: string;
        /**
         * Define the time/repeating intervals or cron at which workflow instances should be automatically started.
         */
        schedule: Schedule;
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
    /**
     * Defines a sub-workflow to be executed
     */
    export interface Subflowstate {
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
        type?: "subflow";
        /**
         * State end definition
         */
        end?: End;
        /**
         * Workflow execution must wait for sub-workflow to finish before continuing
         */
        waitForCompletion?: boolean;
        /**
         * Sub-workflow unique id
         */
        workflowId?: string;
        /**
         * SubFlow state repeat exec definition
         */
        repeat?: Repeat;
        /**
         * State data filter
         */
        stateDataFilter?: Statedatafilter;
        /**
         * States error handling and retries definitions
         */
        onErrors?: Error[];
        /**
         * Next transition of the workflow after SubFlow has completed execution
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
    export type Switchstate = /* Permits transitions to other states based on data conditions */ Databasedswitch | /* Permits transitions to other states based on events */ Eventbasedswitch;
    export type Transition = string | {
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