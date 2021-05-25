import {End, Transition} from '../lib/definitions/workflow';
import {plainToClass} from 'class-transformer';
import 'es6-shim';
import 'reflect-metadata';
import {Builder, builder} from '../lib/builder';
import {validate} from '../lib/utils';

export class PocDefaultdef {
	
	
	transition: Transition;
	end: End;
	
	private static fn(data: PocDefaultdef): () => PocDefaultdef {
		return () => {
			
			Object.assign(data, new PocDefaultdef());
			
			if (!data.transition) {
				data.end = true;
			}
			
			validate('Defaultdef', data);
			
			return data;
		};
	}
	
	
	static fromString(value: string): PocDefaultdef {
		
		
		return plainToClass(PocDefaultdef, JSON.parse(value));
		
	}
	
	static builder(): Builder<PocDefaultdef> {
		return builder<PocDefaultdef>(PocDefaultdef.fn);
	}
	
}

