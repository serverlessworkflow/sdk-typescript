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
import {EventName, ProduceEventDef} from '../index';

export class ProduceEventDefBuilder {
	// @ts-ignore
	private readonly model: ProduceEventDef = {};
	
	
	withEventRef(value: EventName): ProduceEventDefBuilder {
		this.model.eventRef = value;
		return this;
	}
	
	withData(value: object): ProduceEventDefBuilder {
		this.model.data = value;
		return this;
		
	}
	
	withContextAttributes(value: object): any {
		this.model.contextAttributes = value;
		return this;
	}
	
	build(): ProduceEventDef {
		if (!this.model.eventRef) {
			throw new Error("Field eventRef can not be undefined");
		}
		return this.model;
	}
	
}
