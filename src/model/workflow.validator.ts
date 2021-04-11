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
import {Workflow} from "./workflow";


export class ValidatorFactory {
	
	workflowValidator(model: Workflow): WorkflowValidator {
		return new WorkflowValidator(model);
	}
}


export class ValidationErrors {
	constructor(private readonly _errors: ValidationError[]) {
	
	}
	
	errors(): ValidationError[] {
		return this._errors;
	}
	
}

export class ValidationError {
	constructor(private readonly _error: string) {
	
	}
	
	message(): string {
		return this._error;
	}
}


export class WorkflowValidator {
	constructor(private readonly model: Workflow) {
	
	}
	
	validate(): ValidationErrors {
		const errors: ValidationError[] = [];
		
		
		if (!this.model.id) {
			errors.push(WorkflowValidator.buildValidationError("id"));
		}
		
		if (!this.model.name) {
			errors.push(WorkflowValidator.buildValidationError("name"));
		}
		
		if (!this.model.version) {
			errors.push(WorkflowValidator.buildValidationError("version"));
		}
		
		if (!this.model.start) {
			errors.push(WorkflowValidator.buildValidationError("start"));
		}
		
		if (!this.model.states) {
			errors.push(WorkflowValidator.buildValidationError("states"));
		}
		
		return new ValidationErrors(errors);
		
	}
	
	isValid(): boolean {
		return this.validate().errors().length === 0;
	}
	
	private static buildValidationError(field: string) {
		return new ValidationError("Field workflow." + field + " can not be undefined");
	}
}
