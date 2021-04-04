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
import {FunctionsType, StatesType} from "./types";


export class WorkflowBuilder {
    private model: Workflow = {};

    constructor() {
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

    withStart(value: string): WorkflowBuilder {
        this.model.start = value;
        return this;
    }

    withFunctions(value: FunctionsType): WorkflowBuilder {
        this.model.functions = value;
        return this;
    }


    withStates(value: StatesType): WorkflowBuilder {
        this.model.states = value;
        return this;
    }


    build(): Workflow {
        //TODO validate
        return this.model;
    }
}
