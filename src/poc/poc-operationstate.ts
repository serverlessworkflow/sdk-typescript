import {Action, End, Error, Metadata, Statedatafilter, Transition} from '../lib/definitions/workflow';
import {Builder, builder} from '../lib/builder';
import {validate} from '../lib/utils';
import {PocAction} from './poc-action';
import {Type} from 'class-transformer';

export class PocOperationstate {
	
	
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
		
		
	@Type(() => PocAction)
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

	constructor() {
		this.type = "operation";
	}
	
	private static fn(data: PocOperationstate): () => PocOperationstate {
		return () => {
			
			Object.assign(data, new PocOperationstate());
			if (!data.transition) {
				data.end = true;
			}
			
			validate('Operationstate', data);
			
			return data;
		};
	}
	
	static builder(): Builder<PocOperationstate> {
		return builder<PocOperationstate>(PocOperationstate.fn);
	}
}


