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
import {CronDef, CronExpression} from '../index';

export class CronDefBuilder {
	private cronExpresion: CronExpression;
	private validUntil: string;
	
	withCronExpresion(value: CronExpression): CronDefBuilder {
		this.cronExpresion = value;
		return this;
	}
	
	withValidUntil(value: string): CronDefBuilder {
		this.validUntil = value;
		return this;
	}
	
	build(): CronDef {
		
		if (!this.cronExpresion) {
			throw new Error("Field cronExpresion can not be undefined");
		}
		
		if (!this.validUntil) {
			return this.cronExpresion;
		}
		
		return {
			expression: this.cronExpresion,
			validUntil: this.validUntil,
		};
		
	}
}
