import {
	Callbackstate,
	Delaystate,
	Events,
	Eventstate,
	Exectimeout,
	Foreachstate,
	Functions,
	Injectstate,
	Metadata,
	Operationstate,
	Parallelstate,
	Retries,
	Startdef,
	Subflowstate,
	Switchstate,
} from '../lib/definitions/workflow';
import {PocInjectstate} from './poc-injectstate';
import {plainToClass, Transform, Type, Expose} from 'class-transformer';
import 'es6-shim';
import 'reflect-metadata';
import {PocSubflowstate} from './poc-subflowstate';
import {Builder, builder} from '../lib/builder';
import {validate} from '../lib/utils';
import * as yaml from 'js-yaml';
import {PocDatabasedswitch} from './poc-databasedswitch';
import {PocOperationstate} from './poc-operationstate';
import {PocFunction} from './poc-function';



export class PocWorkflow {
	
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
	@Transform(({value}) => value || 'jq', { toClassOnly: true })
	@Expose({name: "expressionLang"})
	expressionLang?: string;
	
	execTimeout?: Exectimeout;
	/**
	 * If 'true', workflow instances is not terminated when there are no active execution paths. Instance can be terminated via 'terminate end definition' or reaching defined 'execTimeout'
	 */
	keepActive?: boolean;
	metadata?: /* Metadata information */ Metadata;
	events?: Events;
	
	
	@Transform(({ value }) => {
		if(typeof value  === typeof []){
			return value.map((v: string) => {
				return PocFunction.fromString(JSON.stringify(v));
			});
		}
		return value;
	})
	functions: Functions;
	
	retries?: Retries;
	
	
	/**
	 * State definitions
	 */
	@Type(() => Object, { //ideally this should be a super class
		discriminator: {
			property: 'type',
			subTypes: [
				{value: PocInjectstate, name: 'inject'},
				{value: PocSubflowstate, name: 'subflow'},
				{value: PocDatabasedswitch, name: 'switch'},
				{value: PocOperationstate, name: 'operation'},
			],
		},
	})
	states: [
		(
			| /* Causes the workflow execution to delay for a specified duration */ Delaystate
			| /* This state is used to wait for events from event sources, then consumes them and invoke one or more actions to run in sequence or parallel */ Eventstate
			| /* Defines actions be performed. Does not wait for incoming events */ Operationstate
			| /* Consists of a number of states that are executed in parallel */ Parallelstate
			| Switchstate
			| /* Defines a sub-workflow to be executed */ Subflowstate
			| /* Inject static data into state data. Does not perform any actions */ PocInjectstate
			| /* Execute a set of defined actions or workflows for each element of a data array */ Foreachstate
			| /* This state performs an action, then waits for the callback event that denotes completion of the action */ Callbackstate
			),
		...(
			| /* Causes the workflow execution to delay for a specified duration */ Delaystate
			| /* This state is used to wait for events from event sources, then consumes them and invoke one or more actions to run in sequence or parallel */ Eventstate
			| /* Defines actions be performed. Does not wait for incoming events */ Operationstate
			| /* Consists of a number of states that are executed in parallel */ Parallelstate
			| Switchstate
			| /* Defines a sub-workflow to be executed */ Subflowstate
			| /* Inject static data into state data. Does not perform any actions */ Injectstate
			| /* Execute a set of defined actions or workflows for each element of a data array */ Foreachstate
			| /* This state performs an action, then waits for the callback event that denotes completion of the action */ Callbackstate
			)[]
	];
	
	
	static fromString(value: string): PocWorkflow {
		return plainToClass(PocWorkflow, yaml.load(value));
	}
	
	static builder(): Builder<PocWorkflow> {
		return builder<PocWorkflow>(PocWorkflow.fn);
	}
	
	
	static toYaml(workflow: PocWorkflow): string {
		validate('Workflow', workflow);
		return yaml.dump(workflow);
	}

	static toJson(workflow: PocWorkflow): string {
		validate('Workflow', workflow);
		return JSON.stringify(workflow);
		
	}

	private static fn(data: PocWorkflow): () => PocWorkflow {
		return () => {
			Object.assign(data, new PocWorkflow());
			validate('Workflow', data);
			return data;
		};
	}
	
}



