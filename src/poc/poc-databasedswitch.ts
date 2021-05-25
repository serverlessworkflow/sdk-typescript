import {Datacondition, Defaultdef, Error, Metadata, Statedatafilter} from '../lib/definitions/workflow';
import {plainToClass} from 'class-transformer';
import 'es6-shim';
import 'reflect-metadata';
import {Builder, builder} from '../lib/builder';
import {validate} from '../lib/utils';

export class PocDatabasedswitch {
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

	constructor() {
		//constants
		this.type = "switch";
	}
	
	private static fn(data: PocDatabasedswitch): () => PocDatabasedswitch {
		return () => {
			
			Object.assign(data, new PocDatabasedswitch());
			
			
			validate('Databasedswitch', data);
			
			return data;
		};
	}
	
	
	static fromString(value: string): PocDatabasedswitch {
		
		const defaultValues = {
			usedForCompensation: false,
		} as PocDatabasedswitch;
		
		return plainToClass(PocDatabasedswitch, Object.assign(defaultValues,JSON.parse(value) ));
		
	}
	
	static builder(): Builder<PocDatabasedswitch> {
		return builder<PocDatabasedswitch>(PocDatabasedswitch.fn);
	}
	
}

