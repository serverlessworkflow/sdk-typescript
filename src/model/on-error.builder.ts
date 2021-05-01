import {OnError, Transition} from '../index';

export class OnErrorBuilder {
	// @ts-ignore
	private model: OnError = {};
	
	withError(value: string): OnErrorBuilder {
		this.model.error = value;
		return this;
	}
	
	withTransition(value: Transition): OnErrorBuilder {
		this.model.transition = value;
		return this;
	}
	
	build(): OnError {
		return this.model;
	}
	
}
