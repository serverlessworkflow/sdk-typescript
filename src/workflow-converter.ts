import * as yaml from "js-yaml";
import WorkflowJson = ServerlessworkflowOrg.Core.WorkflowJson;

/**
 * Exposes utils to parse and serialize WorkflowJson
 */
export const WorkflowConverter = {
  /**
   * Parses the provided string as WorkflowJson
   * @param {string} data The JSON or YAML workflow to parse
   * @returns {WorkflowJson} The parse WorkflowJson
   */
  fromString: (data: string): WorkflowJson => {
    try {
      return yaml.load(data) as WorkflowJson;
    }
    catch (ex) {
      throw new Error('Format not supported');
    }
  },
  /**
   * Stringifies the provided workflow to the JSON format
   * @param {WorkflowJson} workflow The workflow to strigify
   * @returns {string} The workflow as JSON
   */
  toJson: (workflow: WorkflowJson): string => JSON.stringify(workflow),
  /**
   * Stringifies the provided workflow to the YAML format
   * @param {WorkflowJson} workflow The workflow to strigify
   * @returns {string} The workflow as YAML
   */
  toYaml: (workflow: WorkflowJson): string => yaml.dump(workflow),
}