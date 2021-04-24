/*
 * Copyright 2021-Present The Serverless Workflow Specification Authors
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import {Function, FunctionType} from "./types";

export class FunctionBuilder {
	
	// @ts-ignore
	private model: Function = {
		type: "rest",
	};
	
	withName(value: string): FunctionBuilder {
		this.model.name = value;
		return this;
	}
	
	withOperation(value: string): FunctionBuilder {
		this.model.operation = value;
		return this;
	}
	
	withType(value: FunctionType): any {
		this.model.type = value;
		return this;
	}
	
	build(): Function {
		
		
		const errors: string[] = [];
		
		if (!this.model.name) {
			errors.push("Field name can not be undefined or empty");
		}
		
		if (!this.model.operation) {
			errors.push("Field operation can not be undefined or empty");
		}
		
		if (errors.length > 0) {
			throw new Error(errors.map(e => e).join("; "));
		}
		
		return this.model;
	}
	
}
