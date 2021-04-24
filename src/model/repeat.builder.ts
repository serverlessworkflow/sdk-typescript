import {EventsName, RepeatType} from './types';

export class RepeatBuilder {
	private model: RepeatType = {};
	
	
	withExpression(value: string): RepeatBuilder {
		this.model.expression = value;
		return this;
	}
	
	
	withCheckBefore(value: boolean): RepeatBuilder {
		this.model.checkBefore = value;
		return this;
	}
	
	withMax(value: number): RepeatBuilder {
		this.model.max = value;
		return this;
	}
	
	withContinueOnError(value: boolean): RepeatBuilder {
		this.model.continueOnError = value;
		return this;
	}
	
	
	withStopOnEvents(value: EventsName): RepeatBuilder {
		this.model.stopOnEvents = value;
		return this;
	}
	
	build(): RepeatType {
		return this.model;
	}
	
}
