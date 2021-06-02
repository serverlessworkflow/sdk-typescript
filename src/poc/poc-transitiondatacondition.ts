import {Metadata, Transition} from '../lib/definitions/workflow';
import {plainToClass} from 'class-transformer';
import 'es6-shim';
import 'reflect-metadata';
import {Builder, builder} from '../lib/builder';
import {validate} from '../lib/utils';

export class PocTransitiondatacondition {
	
	/**
	 * Data condition name
	 */
	name?: string;
	/**
	 * Workflow expression evaluated against state data. Must evaluate to true or false
	 */
	condition: string;
	/**
	 * Workflow transition if condition is evaluated to true
	 */
	transition: Transition;
	metadata?: /* Metadata information */ Metadata;
	
	private static fn(data: PocTransitiondatacondition): () => PocTransitiondatacondition {
		return () => {
			
			Object.assign(data, new PocTransitiondatacondition());
			
			validate('Transitiondatacondition', data);
			
			return data;
		};
	}
	
	
	static fromSource(value: string): PocTransitiondatacondition {
		return plainToClass(PocTransitiondatacondition, JSON.parse(value));
	}
	
	static builder(): Builder<PocTransitiondatacondition> {
		return builder<PocTransitiondatacondition>(PocTransitiondatacondition.fn);
	}
	
}

