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

import { Metadata } from './metadata';
import { overwriteMetadata } from './utils';
export class Oauth2propsdef {
  constructor(model: any) {
    Object.assign(this, model);
    overwriteMetadata(this);
  }

  /**
   * String or a workflow expression. Contains the authority information
   */
  authority?: string;
  /**
   * Defines the grant type
   */
  grantType: 'password' | 'clientCredentials' | 'tokenExchange';
  /**
   * String or a workflow expression. Contains the client identifier
   */
  clientId: string;
  /**
   * Workflow secret or a workflow expression. Contains the client secret
   */
  clientSecret?: string;
  /**
   * Array containing strings or workflow expressions. Contains the OAuth2 scopes
   */
  scopes?: [string, ...string[]];
  /**
   * String or a workflow expression. Contains the user name. Used only if grantType is 'resourceOwner'
   */
  username?: string;
  /**
   * String or a workflow expression. Contains the user password. Used only if grantType is 'resourceOwner'
   */
  password?: string;
  /**
   * Array containing strings or workflow expressions. Contains the OAuth2 audiences
   */
  audiences?: [string, ...string[]];
  /**
   * String or a workflow expression. Contains the subject token
   */
  subjectToken?: string;
  /**
   * String or a workflow expression. Contains the requested subject
   */
  requestedSubject?: string;
  /**
   * String or a workflow expression. Contains the requested issuer
   */
  requestedIssuer?: string;
  metadata?: /* Metadata information */ Metadata;
}
