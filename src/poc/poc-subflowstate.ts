import {End, Error, Metadata, Repeat, Statedatafilter, Transition} from '../lib/definitions/workflow';
import {Builder, builder} from '../lib/builder';
import {validate} from '../lib/utils';
import {Expose, Transform} from 'class-transformer';

export class PocSubflowstate {
	
	
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
	@Transform(({value}) => value || false, { toClassOnly: true })
	@Expose({name: "usedForCompensation"})
	usedForCompensation?: boolean;
	metadata?: /* Metadata information */ Metadata;

	constructor() {
		this.type = "subflow";
	}
	
	private static fn(data: PocSubflowstate): () => PocSubflowstate {
		return () => {
			
			Object.assign(data, new PocSubflowstate());
			
			if (!data.end && !data.transition) {
				data.end = true;
			}
			
			validate('Subflowstate', data);
			
			return data;
		};
	}
	
	static builder(): Builder<PocSubflowstate> {
		return builder<PocSubflowstate>(PocSubflowstate.fn);
	}
}


