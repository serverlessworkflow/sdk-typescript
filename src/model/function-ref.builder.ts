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
import {Arguments, FunctionName, FunctionRef} from "./types";

export class FunctionRefBuilder {
	private refName: FunctionName;
	private arguments: Arguments;
	
	
	withRefName(value: FunctionName): FunctionRefBuilder {
		this.refName = value;
		return this;
		
	}
	
	withArguments(value: Arguments): FunctionRefBuilder {
		this.arguments = value;
		return this;
	}
	
	build(): FunctionRef {
		if (!this.arguments) {
			return this.refName;
		}
		
		
		return {
			refName: this.refName,
			arguments: this.arguments,
		};
	}
	
}
