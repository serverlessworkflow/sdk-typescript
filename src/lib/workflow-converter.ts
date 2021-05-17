/*
 * Copyright 2021-Present The Serverless Workflow Specification Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * oUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import * as yaml from 'js-yaml';
import { Specification } from './definitions';

/**
 * Exposes utils to parse and serialize Workflow
 */
export const WorkflowConverter = {
  /**
   * Parses the provided string as Workflow
   * @param {string} data The JSON or YAML workflow to parse
   * @returns {Workflow} The parse Workflow
   */
  fromString: (data: string): Specification.Workflow => {
    try {
      return yaml.load(data) as Specification.Workflow;
    } catch (ex) {
      throw new Error('Format not supported');
    }
  },
  /**
   * Stringifies the provided workflow to the JSON format
   * @param {Workflow} workflow The workflow to strigify
   * @returns {string} The workflow as JSON
   */
  toJson: (workflow: Specification.Workflow): string => JSON.stringify(workflow),
  /**
   * Stringifies the provided workflow to the YAML format
   * @param {Workflow} workflow The workflow to strigify
   * @returns {string} The workflow as YAML
   */
  toYaml: (workflow: Specification.Workflow): string => yaml.dump(workflow),
};
