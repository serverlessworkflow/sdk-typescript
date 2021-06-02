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
* oUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*/

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
        functionRef: Functionref;
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
        functionRef?: Functionref;
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
