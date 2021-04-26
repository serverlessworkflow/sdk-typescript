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
import {Arguments, FunctionRefImplType} from "./types";

export class ArgumentsBuilder {
    // @ts-ignore
    private model: FunctionRefImplType = {};


    withRefName(value: string): ArgumentsBuilder {
        this.model.refName = value;
        return this;

    }

    withArguments(value: Arguments): ArgumentsBuilder {
        this.model.arguments = value;
        return this;
    }

    build(): FunctionRefImplType {
        return this.model;
    }

}
