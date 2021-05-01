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
import {ActionDataFilter, Action, EventRef, FunctionRef} from "./types";

export class ActionBuilder {
	
	private model: Action = {};
	
	
	withFunctionRef(value: FunctionRef): ActionBuilder {
		this.model.functionRef = value;
		return this;
	}
	
	withEventRef(value: EventRef): ActionBuilder {
		this.model.eventRef = value;
		return this;
	}
	
	withName(value: string): ActionBuilder {
		this.model.name = value;
		return this;
	}
	
	withTimeOut(value: string): ActionBuilder {
		this.model.timeout = value;
		return this;
		
	}
	
	withActionDataFilter(value: ActionDataFilter): ActionBuilder {
		this.model.actionDataFilter = value;
		return this;
		
	}
	
	build(): Action {
		
		if (!this.model.eventRef && !this.model.functionRef) {
			throw new Error("Either eventRef or functionRef have to be defined");
		}
		
		if (this.model.eventRef && this.model.functionRef) {
			throw new Error("Only one eventRef or functionRef can be set");
		}
		
		
		return this.model;
	}
	
}
