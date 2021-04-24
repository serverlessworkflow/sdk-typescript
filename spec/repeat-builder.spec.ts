import {RepeatBuilder} from '../src/model/repeat.builder';

describe('repeat builder', () => {
	
	it("Should create empty object", () => {
		
		expect(new RepeatBuilder().build()).toEqual({});
		
	});
	
	it("should create an object with all possible fields", () => {
		
		expect(new RepeatBuilder()
			.withExpression("anyExpression")
			.withCheckBefore(true)
			.withMax(3)
			.withContinueOnError(true)
			.withStopOnEvents(["onStopEvent"])
			.build())
			.toEqual({
				expression: "anyExpression",
				checkBefore: true,
				max: 3,
				continueOnError: true,
				stopOnEvents: ["onStopEvent"],
			});
		
	});
	
});
