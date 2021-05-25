import {
	Actiondatafilter,
	Eventref,
	Functionref,
} from '../lib/definitions/workflow';
import {plainToClass} from 'class-transformer';
import 'es6-shim';
import 'reflect-metadata';
import {Builder, builder} from '../lib/builder';
import {validate} from '../lib/utils';

export class PocAction {
	
	constructor() {
	}
	
	/**
	 * Unique action definition name
	 */
	name?: string;
	functionRef: Functionref;
	eventRef: /* Event References */ Eventref;
	/**
	 * Time period to wait for function execution to complete
	 */
	timeout?: string;
	actionDataFilter?: Actiondatafilter;
	
	
	
	static fromString(value: string): PocAction {
	
		
		return plainToClass(PocAction, JSON.parse(value));
		
	}
	
	static builder(): Builder<PocAction> {
		return builder<PocAction>(PocAction.fn);
	}
	
	
	private static fn(data: PocAction): () => PocAction {
		return () => {
			
			Object.assign(data, new PocAction());
			
			validate('Action', data);
			
			return data;
		};
	}
	
}

