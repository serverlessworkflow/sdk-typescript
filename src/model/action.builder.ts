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
import {ActionType, FunctionRefType} from "./types";

export class ActionBuilder {
    // @ts-ignore
    private model: ActionType = {};


    withFunctionRef(value: FunctionRefType): ActionBuilder {
        this.model.functionRef = value;
        return this;
    }

    build(): ActionType {
        //TODO validate either functionRef or eventRef
        return this.model;
    }


}
