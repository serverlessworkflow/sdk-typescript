import {End, Metadata, Statedatafilter, Transition} from '../lib/definitions/workflow';
import {plainToClass} from 'class-transformer';
import 'es6-shim';
import 'reflect-metadata';
import {Builder, builder} from '../lib/builder';
import {validate} from '../lib/utils';

export class PocInjectstate {
	
	constructor() {
		//constants
		this.type = "inject";
	}
	
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
	
	
	
	static fromString(value: string): PocInjectstate {
	
		const defaultValues = {
			usedForCompensation: false
		} as PocInjectstate;
		
		return plainToClass(PocInjectstate, Object.assign(defaultValues, JSON.parse(value)));
		
	}
	
	static builder(): Builder<PocInjectstate> {
		return builder<PocInjectstate>(PocInjectstate.fn);
	}
	
	
	private static fn(data: PocInjectstate): () => PocInjectstate {
		return () => {
			
			Object.assign(data, new PocInjectstate());
			
			if (!data.transition) {
				data.end = true;
			}
			
			validate('Injectstate', data);
			
			return data;
		};
	}
	
}

