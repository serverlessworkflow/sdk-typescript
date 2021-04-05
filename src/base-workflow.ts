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
import * as fs from "fs";
import {PathLike} from "fs";
import {Workflow} from "./model/workflow";
import * as yaml from "js-yaml";

export class BaseWorkflow {

    static fromSource(filePath: PathLike): Workflow {

        if (!this.isJSON(filePath) && !this.isYAML(filePath)) {
            throw new Error("File format not supported")
        }

        const fileAsString = fs.readFileSync(filePath).toLocaleString();
        if (this.isJSON(filePath)) {
            return JSON.parse(fileAsString) as Workflow;
        }

        return yaml.load(fileAsString) as Workflow;

    }


    static toJSON(workflow: Workflow): string {
        return JSON.stringify(workflow);
    }

    static toYAML(workflow: Workflow): string {
        return yaml.dump(workflow);
    }

    private static isYAML(filePath: PathLike) {
        return filePath.toString().endsWith("yaml") || filePath.toString().endsWith("yml");
    }

    private static isJSON(filePath: PathLike) {
        return filePath.toString().endsWith("json");
    }


}
