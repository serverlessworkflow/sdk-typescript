import {plainToClass} from 'class-transformer';
import 'es6-shim';
import 'reflect-metadata';
import {Builder, builder} from '../lib/builder';
import {validate} from '../lib/utils';

export class PocFunction {
	
	/**
	 * Unique function name
	 */
	name: string;
	/**
	 * If type is `rest`, <path_to_openapi_definition>#<operation_id>. If type is `rpc`, <path_to_grpc_proto_file>#<service_name>#<service_method>. If type is `expression`, defines the workflow expression.
	 */
	operation: string;
	/**
	 * Defines the function type. Is either `rest`, `rpc` or `expression`. Default is `rest`
	 */
	type?: 'rest' | 'rpc' | 'expression';

	constructor() {
		this.type = 'rest';
	}
	
	private static fn(data: PocFunction): () => PocFunction {
		return () => {
			
			
			validate('Function', data);
			
			return data;
		};
	}
	
	
	static fromString(value: string): PocFunction {
		
		const defaultValues = {
			type: 'rest',
		} as PocFunction;
		
		return plainToClass(PocFunction, Object.assign(defaultValues,  JSON.parse(value)));
		
	}
	
	static builder(): Builder<PocFunction> {
		return builder<PocFunction>(PocFunction.fn);
	}
	
}

