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
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { cleanSourceModelProperty, normalizeType, overwriteMetadata, overwritePropertyAsPlainType } from './utils';

import { Metadata } from './metadata';

export class Function {
  sourceModel?: Function;
  /**
   * Unique function name
   */
  name: string;
  /**
   * If type is `rest`, <path_to_openapi_definition>#<operation_id>. If type is `asyncapi`, <path_to_asyncapi_definition>#<operation_id>. If type is `rpc`, <path_to_grpc_proto_file>#<service_name>#<service_method>. If type is `graphql`, <url_to_graphql_endpoint>#<literal \"mutation\" or \"query\">#<query_or_mutation_name>. If type is `odata`, <URI_to_odata_service>#<Entity_Set_Name>. If type is `expression`, defines the workflow expression.
   */
  operation: string;
  /**
   * Defines the function type. Is either `rest`, `asyncapi, `rpc`, `graphql`, `odata`, `expression`, or `custom`. Default is `rest`
   */
  type?: 'rest' | 'asyncapi' | 'rpc' | 'graphql' | 'odata' | 'expression' | 'custom';
  authRef?:
    | string
    | {
        /**
         * References an auth definition to be used to access the resource defined in the operation parameter
         */
        resource: string;
        /**
         * References an auth definition to be used to invoke the operation
         */
        invocation?: string;
      };
  metadata?: /* Metadata information */ Metadata;

  constructor(model: any) {
    this.sourceModel = Object.assign({}, model);

    const defaultModel = { type: 'rest' };
    Object.assign(this, defaultModel, model);
    overwritePropertyAsPlainType('authRef', this);
    overwriteMetadata(this);
  }

  /**
   * Normalize the value of each property by recursively deleting properties whose value is equal to its default value. Does not modify the object state.
   * @returns {Specification.Function} without deleted properties.
   */

  normalize = (): Function => {
    const clone = new Function(this);

    normalizeType(clone, this.sourceModel);

    cleanSourceModelProperty(clone);

    return clone;
  };
}
