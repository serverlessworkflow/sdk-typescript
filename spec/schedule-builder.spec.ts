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
import {ScheduleBuilder} from '../src/model/schedule.builder';
import {CronDef} from '../src';


describe("ScheduleBuilder", () => {
	
	it("should throws an error if mandatory fields are not set ", () => {
		
		expect(() => new ScheduleBuilder().build()).toThrowError();
		
		expect(() => new ScheduleBuilder()
			.withInterval("").build())
			.toThrowError();
	});
	
	
	it("should create a valid object when interval is set", () => {
		expect(new ScheduleBuilder()
			.withInterval("PT2S").build())
			.toEqual("PT2S");
	});
	
	
	it("should create a valid object when interval and cron are set", () => {
		
		expect(new ScheduleBuilder()
			.withInterval("PT2S")
			.withCron(validCronDef())
			.build())
			.toEqual({
				interval: "PT2S",
				cron: validCronDef(),
				timezone: "UTC",
			});
	});
	
	
	it("should allow set timezone", () => {
		
		expect(new ScheduleBuilder()
			.withInterval("PT2S")
			.withCron(validCronDef())
			.withTimezone("CET")
			.build())
			.toEqual({
				interval: "PT2S",
				cron: validCronDef(),
				timezone: "CET",
			});
	});
});


function validCronDef(): CronDef {
	return "0 * * ? * *";
}


