import {End, Error, Metadata, Repeat, Statedatafilter, Transition} from '../lib/definitions/workflow';
import {Builder, builder} from '../lib/builder';
import {validate} from '../lib/utils';

export class PocSubflowstate {
	
	
	constructor() {
		this.type = "subflow";
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
	type?: 'subflow';
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
	
	static builder(): Builder<PocSubflowstate> {
		return builder<PocSubflowstate>(PocSubflowstate.fn);
	}
	
	
	
	private static fn(data: PocSubflowstate): () => PocSubflowstate {
		return () => {
			
			Object.assign(data, new PocSubflowstate());
			if (!data.transition) {
				data.end = true;
			}
			
			validate('Subflowstate', data);
			
			return data;
		};
	}
}


