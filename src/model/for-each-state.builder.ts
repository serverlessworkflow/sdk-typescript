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
import {Actions, End, ForEachState, StateDataFilter} from '../index';

export class ForEachStateBuilder {
	
	private model: ForEachState = {
		type: "foreach",
	};
	
	withName(value: string): ForEachStateBuilder {
		this.model.name = value;
		return this;
	}
	
	withInputCollection(value: string): ForEachStateBuilder {
		this.model.inputCollection = value;
		return this;
	}
	
	withIterationParam(value: string): ForEachStateBuilder {
		this.model.iterationParam = value;
		return this;
	}
	
	withOutputCollection(value: string): ForEachStateBuilder {
		this.model.outputCollection = value;
		return this;
	}
	
	withActions(value: Actions) {
		this.model.actions = value;
		return this;
		
	}
	
	withStateDataFilter(value: StateDataFilter): ForEachStateBuilder {
		this.model.stateDataFilter = value;
		return this;
	}
	
	withEnd(value: End): any {
		this.model.end = value;
		return this;
	}
	
	build(): ForEachState {
		return this.model;
	}
	
}
