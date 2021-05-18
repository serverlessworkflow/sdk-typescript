import {foreachstateBuilder} from '../../../src';

describe("foreachstateBuilder" , ()=> {


	it("should build an object with default usedForCompensation = false", ()=> {
		
		const forEachEstate = foreachstateBuilder()
			.name("forEachEstate")
			.inputCollection('${ .expressions }')
			.iterationParam('singleexpression')
			.workflowId("workflowId")
			.end(true)
			.build();
		
		expect(forEachEstate.usedForCompensation).toBeFalse();
		
	});
	
	
	
	it("should allow overwrite usedForCompensation default value", ()=> {
		
		const forEachEstate = foreachstateBuilder()
			.name("forEachEstate")
			.inputCollection('${ .expressions }')
			.iterationParam('singleexpression')
			.workflowId("workflowId")
			.usedForCompensation(true)
			.build();
		
		expect(forEachEstate.usedForCompensation).toBeTrue();
		
	});
})
