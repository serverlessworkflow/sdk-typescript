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
import {ParallelState} from './workflow';
import {Branches, CompletionType, End} from './types';

export class ParallelStateBuilder {
	private model: ParallelState = {
		type: "parallel",
	};
	
	
	withName(value: string): ParallelStateBuilder {
		this.model.name = value;
		return this;
		
	}
	
	withCompletionType(value: CompletionType): ParallelStateBuilder {
		this.model.completionType = value;
		return this;
		
	}
	
	withBranches(value: Branches): ParallelStateBuilder {
		this.model.branches = value;
		return this;
	}
	
	withEnd(value: End): ParallelStateBuilder {
		this.model.end = value;
		return this;
		
	}
	
	build(): ParallelState {
		return this.model;
	}
	
	
}
