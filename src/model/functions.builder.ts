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
import {FunctionList, Functions, URIDefinition} from "./types";

export class FunctionsBuilder {
	
	private URIDefinition: URIDefinition;
	private functions: FunctionList;
	
	withURIDefinition(value: URIDefinition): FunctionsBuilder {
		this.URIDefinition = value;
		return this;
	}
	
	
	withFunctions(value: FunctionList): FunctionsBuilder {
		this.functions = value;
		return this;
	}
	
	
	build(): Functions {
		
		//TODO validate
		if (this.URIDefinition) {
			return this.URIDefinition;
		}
		
		return this.functions;
		
	}
	
}
