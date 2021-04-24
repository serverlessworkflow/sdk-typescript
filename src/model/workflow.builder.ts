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
import {Exectimeout, StartDef, Workflow} from "./workflow";
import {EventsDef, FunctionsDef, MetadataType, RetriesDef, StatesType} from "./types";
import {ValidatorFactory} from "./workflow.validator";


export class WorkflowBuilder {
	private model: Workflow = {};
	
	constructor(private readonly validatorFactory: ValidatorFactory
		            = new ValidatorFactory()) {
	}
	
	withId(value: string): WorkflowBuilder {
		this.model.id = value;
		return this;
	}
	
	
	withVersion(value: string): WorkflowBuilder {
		this.model.version = value;
		return this;
	}
	
	
	withName(value: string): WorkflowBuilder {
		this.model.name = value;
		return this;
		
	}
	
	withDescription(value: string): WorkflowBuilder {
		this.model.description = value;
		return this;
		
	}
	
	withStart(value: StartDef): WorkflowBuilder {
		this.model.start = value;
		return this;
	}
	
	withFunctions(value: FunctionsDef): WorkflowBuilder {
		this.model.functions = value;
		return this;
	}
	
	
	withStates(value: StatesType): WorkflowBuilder {
		this.model.states = value;
		return this;
	}
	
	
	withSchemaVersion(value: string): WorkflowBuilder {
		this.model.schemaVersion = value;
		return this;
	}
	
	withExpressionLang(value: string): WorkflowBuilder {
		this.model.expressionLang = value;
		return this;
	}
	
	withExecTimeout(value: Exectimeout): WorkflowBuilder {
		this.model.execTimeout = value;
		return this;
	}
	
	withKeepActive(value: boolean): WorkflowBuilder {
		this.model.keepActive = value;
		return this;
	}
	
	withMetadata(value: MetadataType): WorkflowBuilder {
		this.model.metadata = value;
		return this;
	}
	
	withEvents(value: EventsDef): WorkflowBuilder {
		this.model.events = value;
		return this;
	}
	
	withRetries(value: RetriesDef): WorkflowBuilder {
		this.model.retries = value;
		return this;
	}
	
	build(): Workflow {
		const workflowValidator = this.validatorFactory.workflowValidator(this.model);
		if (!workflowValidator.isValid()) {
			throw new Error(workflowValidator.validate()
				.errors().map(e => e.message()).join("; "));
		}
		return this.model;
	}
	
}
