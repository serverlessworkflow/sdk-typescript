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
import {EventRef} from '../index';

export class EventRefBuilder {
	
	private readonly model: EventRef = {};
	
	
	withResultEventRef(value: string): EventRefBuilder {
		this.model.resultEventRef = value;
		return this;
	}
	
	withTriggerEventRef(value: string): EventRefBuilder {
		this.model.triggerEventRef = value;
		return this;
	}
	
	
	withData(value: object): EventRefBuilder {
		this.model.data = value;
		return this;
	}
	
	withContextAttributes(value: object): EventRefBuilder {
		this.model.contextAttributes = value;
		return this;
	}
	
	build(): EventRef {
		
		if (!this.model.resultEventRef) {
			throw new Error("Field resultEventRef can not be undefined");
		}
		
		if (!this.model.triggerEventRef) {
			throw new Error("Field triggerEventRef can not be undefined");
		}
		
		return this.model;
	}
}
