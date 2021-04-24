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
import {CronDef, Interval, Schedule} from '../index';

export class ScheduleBuilder {
	private interval: Interval;
	private cron: CronDef;
	private timezone: string;
	
	withInterval(value: Interval): ScheduleBuilder {
		this.interval = value;
		return this;
	}
	
	withCron(value: CronDef): ScheduleBuilder {
		this.cron = value;
		return this;
	}
	
	withTimezone(value: string): ScheduleBuilder {
		this.timezone = value;
		return this;
	}
	
	build(): Schedule {
		
		if (!this.interval) {
			throw new Error("Field interval can not be undefined");
		}
		
		if (this.cron) {
			return {
				interval: this.interval,
				cron: this.cron,
				timezone: this.timezone || "UTC",
			};
		}
		
		return this.interval;
	}
	
}
