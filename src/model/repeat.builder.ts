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
import {EventsName, RepeatType} from './types';

export class RepeatBuilder {
	private model: RepeatType = {};
	
	
	withExpression(value: string): RepeatBuilder {
		this.model.expression = value;
		return this;
	}
	
	
	withCheckBefore(value: boolean): RepeatBuilder {
		this.model.checkBefore = value;
		return this;
	}
	
	withMax(value: number): RepeatBuilder {
		this.model.max = value;
		return this;
	}
	
	withContinueOnError(value: boolean): RepeatBuilder {
		this.model.continueOnError = value;
		return this;
	}
	
	
	withStopOnEvents(value: EventsName): RepeatBuilder {
		this.model.stopOnEvents = value;
		return this;
	}
	
	build(): RepeatType {
		return this.model;
	}
	
}
