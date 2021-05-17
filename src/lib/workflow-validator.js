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
import { validators } from './validators';
var WorkflowValidator = /** @class */ (function () {
    /**
     * Creates a new WorkflowValidator for the provided workflow
     * @param {Workflow} workflow The workflow to validate
     */
    function WorkflowValidator(workflow) {
        this.workflow = workflow;
        /** The validation errors after running validate(), if any */
        this.errors = [];
        this.validateFn = validators.get('Workflow');
    }
    /**
     * Validates the workflow, populates the errors if any
     * @returns {boolean} If the workflow is valid or not
     */
    WorkflowValidator.prototype.validate = function () {
        var isValid = this.validateFn(this.workflow);
        this.errors = this.validateFn.errors;
        return isValid;
    };
    return WorkflowValidator;
}());
export { WorkflowValidator };
//# sourceMappingURL=workflow-validator.js.map