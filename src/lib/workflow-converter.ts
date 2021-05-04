import * as yaml from "js-yaml";
import Workflow = ServerlessWorkflow.Workflow;

/**
 * Exposes utils to parse and serialize Workflow
 */
export const WorkflowConverter = {
  /**
   * Parses the provided string as Workflow
   * @param {string} data The JSON or YAML workflow to parse
   * @returns {Workflow} The parse Workflow
   */
  fromString: (data: string): Workflow => {
    try {
      return yaml.load(data) as Workflow;
    }
    catch (ex) {
      throw new Error('Format not supported');
    }
  },
  /**
   * Stringifies the provided workflow to the JSON format
   * @param {Workflow} workflow The workflow to strigify
   * @returns {string} The workflow as JSON
   */
  toJson: (workflow: Workflow): string => JSON.stringify(workflow),
  /**
   * Stringifies the provided workflow to the YAML format
   * @param {Workflow} workflow The workflow to strigify
   * @returns {string} The workflow as YAML
   */
  toYaml: (workflow: Workflow): string => yaml.dump(workflow),
}