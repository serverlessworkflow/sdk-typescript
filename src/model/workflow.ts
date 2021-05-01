/*
 * Copyright 2021-Present The Serverless Workflow Specification Authors
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import {
	ActionModeType,
	Actions, Branches, CompletionType,
	CronDef,
	DataConditions,
	DefaultTransitionType,
	End,
	EventName,
	Events,
	Functions,
	Interval,
	Metadata,
	ProduceEventsDef,
	Repeat,
	RetriesDef,
	StartScheduled,
	StateDataFilter,
	StateName,
	States,
} from "./types";


/**
 * Serverless Workflow specification - workflow schema
 */
export type Workflow = {
	/**
	 * Workflow unique identifier
	 */
	id?: string;
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
	start?: StartDef;
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
	/**
	 * Metadata information
	 */
	metadata?: Metadata;
	events?: Events;
	functions?: Functions;
	retries?: RetriesDef;
	/**
	 * State definitions
	 */
	states?: States;
	[k: string]: unknown;
} & {
	[k: string]: unknown;
};


export type StartDef =
	|
	/**
	 * Name of the starting workflow state
	 */
	StateName
	| StartScheduled;

export type Schedule =
	|
	/**
	 * Time interval (must be repeating interval) described with ISO 8601 format. Declares when workflow instances will be automatically created.  (UTC timezone is assumed)
	 */
	Interval
	|
	/**
	 * Start state schedule definition
	 */
	{
		/**
		 * Time interval (must be repeating interval) described with ISO 8601 format. Declares when workflow instances will be automatically created.
		 */
		interval?: Interval;
		cron?: CronDef;
		/**
		 * Timezone name used to evaluate the interval & cron-expression. (default: UTC)
		 */
		timezone?: string;
	};


export type SwitchState = DataDasedSwitch | EventBasedSwitch;
export type Transition =
	| StateName
	| {
	/**
	 * Name of state to transition to
	 */
	nextState: StateName;
	/**
	 * Array of events to be produced before the transition happens
	 */
	produceEvents?: ProduceEventsDef;
	/**
	 * If set to true, triggers workflow compensation when before this transition is taken. Default is false
	 */
	compensate?: boolean;
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
 * Causes the workflow execution to delay for a specified duration
 */
export interface DelayState {
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
	stateDataFilter?: StateDataFilter;
	/**
	 * Amount of time (ISO 8601 format) to delay
	 */
	timeDelay?: string;
	/**
	 * States error handling and retries definitions
	 */
	onErrors?: OnErrors;
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
	/**
	 * Metadata information
	 */
	metadata?: Metadata;
}


/**
 * Defines actions be performed. Does not wait for incoming events
 */
export interface OperationState {
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
	end?:
		End;
	/**
	 * State data filter
	 */
	stateDataFilter?: StateDataFilter;
	/**
	 * Specifies whether actions are performed in sequence or in parallel
	 */
	actionMode?: ActionModeType;
	/**
	 * Actions to be performed
	 */
	actions?: Actions;
	/**
	 * States error handling and retries definitions
	 */
	onErrors?: OnErrors;
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
	/**
	 * Metadata information
	 */
	metadata?: Metadata;
}


/**
 * Consists of a number of states that are executed in parallel
 */
export interface ParallelState {
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
	end?:
		End;
	/**
	 * State data filter
	 */
	stateDataFilter?: StateDataFilter;
	/**
	 * Branch Definitions
	 */
	branches?: Branches;
	/**
	 * Option model on how to complete branch execution.
	 */
	completionType?: CompletionType;
	/**
	 * Used when completionType is set to 'n_of_m' to specify the 'N' value
	 */
	n?: number | string;
	/**
	 * States error handling and retries definitions
	 */
	onErrors?: OnErrors;
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
	/**
	 * Metadata information
	 */
	metadata?: Metadata;
}


/**
 * Permits transitions to other states based on data conditions
 */
export interface DataDasedSwitch {
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
	stateDataFilter?: StateDataFilter;
	/**
	 * Defines conditions evaluated against state data
	 */
	dataConditions: DataConditions;
	/**
	 * States error handling and retries definitions
	 */
	onErrors?: OnErrors;
	/**
	 * Default transition of the workflow if there is no matching data conditions. Can include a transition or end definition
	 */
	default?: DefaultTransitionType;
	/**
	 * Unique Name of a workflow state which is responsible for compensation of this state
	 */
	compensatedBy?: string;
	/**
	 * If true, this state is used to compensate another state. Default is false
	 */
	usedForCompensation?: boolean;
	/**
	 * Metadata information
	 */
	metadata?: Metadata;
}


/**
 * Switch state data based condition
 */
export interface EndDataCondition {
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
	/**
	 * Metadata information
	 */
	metadata?: Metadata;
}

export type OnError = {
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
	/**
	 * Transition to next state to handle the error. If retryRef is defined, this transition is taken only if retries were unsuccessful.
	 */
	transition: Transition;
	/**
	 * End workflow execution in case of this error. If retryRef is defined, this ends workflow only if retries were unsuccessful.
	 */
	end: End;
};
export type OnErrors = OnError[];

export type EventConditions = (TransitionEventCondition | EnddEventCondition)[];

/**
 * Permits transitions to other states based on events
 */
export interface EventBasedSwitch {
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
	stateDataFilter?: StateDataFilter;
	/**
	 * Defines conditions evaluated against events
	 */
	eventConditions: EventConditions;
	/**
	 * States error handling and retries definitions
	 */
	onErrors?: OnErrors;
	/**
	 * If eventConditions is used, defines the time period to wait for events (ISO 8601 format)
	 */
	eventTimeout?: string;
	/**
	 * Default transition of the workflow if there is no matching data conditions. Can include a transition or end definition
	 */
	default?: DefaultTransitionType;
	/**
	 * Unique Name of a workflow state which is responsible for compensation of this state
	 */
	compensatedBy?: string;
	/**
	 * If true, this state is used to compensate another state. Default is false
	 */
	usedForCompensation?: boolean;
	/**
	 * Metadata information
	 */
	metadata?: Metadata;
}

/**
 * Switch state data event condition
 */
export interface TransitionEventCondition {
	/**
	 * Event condition name
	 */
	name?: string;
	/**
	 * References an unique event name in the defined workflow events
	 */
	eventRef: EventName;
	/**
	 * Next transition of the workflow if there is valid matches
	 */
	transition: Transition;
	/**
	 * Event data filter definition
	 */
	eventDataFilter?: {
		/**
		 * Workflow expression that filters of the event data (payload)
		 */
		data?: string;
		/**
		 *  Workflow expression that selects a state data element to which the event payload should be added/merged into. If not specified, denotes, the top-level state data element.
		 */
		toStateData?: string;
	};
	/**
	 * Metadata information
	 */
	metadata?: Metadata;
}

/**
 * Switch state data event condition
 */
export interface EnddEventCondition {
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
	end:
		End;
	/**
	 * Event data filter definition
	 */
	eventDataFilter?: {
		/**
		 * Workflow expression that filters of the event data (payload)
		 */
		data?: string;
		/**
		 *  Workflow expression that selects a state data element to which the event payload should be added/merged into. If not specified, denotes, the top-level state data element.
		 */
		toStateData?: string;
	};
	/**
	 * Metadata information
	 */
	metadata?: Metadata;
}


/**
 * Defines a sub-workflow to be executed
 */
export interface SubFlowState {
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
	end?:
		End;
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
	stateDataFilter?: StateDataFilter;
	/**
	 * States error handling and retries definitions
	 */
	onErrors?: OnErrors;
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
	/**
	 * Metadata information
	 */
	metadata?: Metadata;
}

/**
 * Inject static data into state data. Does not perform any actions
 */
export interface InjectState {
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
	end?:
		End;
	/**
	 * JSON object which can be set as states data input and can be manipulated via filters
	 */
	data?: {
		[k: string]: unknown;
	};
	/**
	 * State data filter
	 */
	stateDataFilter?: StateDataFilter;
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
	/**
	 * Metadata information
	 */
	metadata?: Metadata;
}

/**
 * Execute a set of defined actions or workflows for each element of a data array
 */
export interface ForEachState {
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
	end?:
		End;
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
	actions?: Actions;
	/**
	 * Unique Id of a workflow to be executed for each of the elements of inputCollection
	 */
	workflowId?: string;
	/**
	 * State data filter
	 */
	stateDataFilter?: StateDataFilter;
	/**
	 * States error handling and retries definitions
	 */
	onErrors?: OnErrors;
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
	 * Metadata information
	 */
	metadata?: Metadata;
}

/**
 * This state performs an action, then waits for the callback event that denotes completion of the action
 */
export interface CallbackState {
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
	action?:
		| {
		[k: string]: unknown;
	}
		| {
		[k: string]: unknown;
	};
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
	eventDataFilter?: {
		/**
		 * Workflow expression that filters of the event data (payload)
		 */
		data?: string;
		/**
		 *  Workflow expression that selects a state data element to which the event payload should be added/merged into. If not specified, denotes, the top-level state data element.
		 */
		toStateData?: string;
	};
	/**
	 * State data filter
	 */
	stateDataFilter?: StateDataFilter;
	/**
	 * States error handling and retries definitions
	 */
	onErrors?: OnErrors;
	/**
	 * Next transition of the workflow after all the actions have been performed
	 */
	transition?: Transition;
	/**
	 * State end definition
	 */
	end?:
		End;
	/**
	 * Unique Name of a workflow state which is responsible for compensation of this state
	 */
	compensatedBy?: string;
	/**
	 * If true, this state is used to compensate another state. Default is false
	 */
	usedForCompensation?: boolean;
	/**
	 * Metadata information
	 */
	metadata?: Metadata;
}



