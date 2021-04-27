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
import {End, EventState, OnEvents} from '../index';

export class EventStateBuilder {
	// @ts-ignore
	private model: EventState = {
		type: "event",
	};
	
	
	withName(value: string): EventStateBuilder {
		this.model.name = value;
		return this;
	}
	
	withOnEvents(value: OnEvents): EventStateBuilder {
		this.model.onEvents = value;
		return this;
		
	}
	
	withExclusive(value: boolean): EventStateBuilder {
		this.model.exclusive = value;
		return this;
	}
	
	build(): EventState {
		return this.model;
	}
	
	withEnd(value: End): EventStateBuilder {
		this.model.end = value;
		return this;
		
	}
}
