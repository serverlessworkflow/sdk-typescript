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

/*****************************************************************************************
 *
 * /!\ This file is computer generated. Any manual modification can and will be lost. /!\
 *
 *****************************************************************************************/

import { _OAuth2AutenthicationDataClient } from './oauth2-autenthication-data-client';
import { _OAuth2TokenRequest } from './oauth2-token-request';
import { _OAuth2TokenDefinition } from './oauth2-token-definition';
import { _OAuth2AuthenticationPropertiesEndpoints } from './oauth2-authentication-properties-endpoints';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the OAuth2AuthenticationPolicyConfiguration class and type
 */
export type OAuth2AuthenticationPolicyConfigurationIntersection = OAuth2AuthenticationPolicyConfiguration &
  Specification.OAuth2AuthenticationPolicyConfiguration;

/**
 * Represents a constructor for the intersection of the OAuth2AuthenticationPolicyConfiguration class and type
 */
export interface OAuth2AuthenticationPolicyConfigurationConstructor {
  new (
    model?: Partial<Specification.OAuth2AuthenticationPolicyConfiguration>,
  ): OAuth2AuthenticationPolicyConfigurationIntersection;
}

/**
 * Represents a OAuth2AuthenticationPolicyConfiguration with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class OAuth2AuthenticationPolicyConfiguration extends ObjectHydrator<Specification.OAuth2AuthenticationPolicyConfiguration> {
  /**
   * Instanciates a new instance of the OAuth2AuthenticationPolicyConfiguration class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the OAuth2AuthenticationPolicyConfiguration.
   */
  constructor(model?: Partial<Specification.OAuth2AuthenticationPolicyConfiguration>) {
    super(model);
    const self = this as unknown as Specification.OAuth2AuthenticationPolicyConfiguration & object;
    if (isObject(model)) {
      if (typeof (model as Specification.OAuth2AutenthicationData).client === 'object')
        (self as Specification.OAuth2AutenthicationData).client = new _OAuth2AutenthicationDataClient(
          (model as Specification.OAuth2AutenthicationData).client as Specification.OAuth2AutenthicationDataClient,
        );
      if (typeof (model as Specification.OAuth2AutenthicationData).request === 'object')
        (self as Specification.OAuth2AutenthicationData).request = new _OAuth2TokenRequest(
          (model as Specification.OAuth2AutenthicationData).request as Specification.OAuth2TokenRequest,
        );
      if (typeof (model as Specification.OAuth2AutenthicationData).subject === 'object')
        (self as Specification.OAuth2AutenthicationData).subject = new _OAuth2TokenDefinition(
          (model as Specification.OAuth2AutenthicationData).subject as Specification.OAuth2TokenDefinition,
        );
      if (typeof (model as Specification.OAuth2AutenthicationData).actor === 'object')
        (self as Specification.OAuth2AutenthicationData).actor = new _OAuth2TokenDefinition(
          (model as Specification.OAuth2AutenthicationData).actor as Specification.OAuth2TokenDefinition,
        );
      if (
        typeof (model as { [k: string]: unknown; endpoints?: Specification.OAuth2AuthenticationPropertiesEndpoints })
          .endpoints === 'object'
      )
        (
          self as { [k: string]: unknown; endpoints?: Specification.OAuth2AuthenticationPropertiesEndpoints }
        ).endpoints = new _OAuth2AuthenticationPropertiesEndpoints(
          (model as { [k: string]: unknown; endpoints?: Specification.OAuth2AuthenticationPropertiesEndpoints })
            .endpoints as Specification.OAuth2AuthenticationPropertiesEndpoints,
        );
    }
    getLifecycleHooks('OAuth2AuthenticationPolicyConfiguration')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the OAuth2AuthenticationPolicyConfiguration.
   * Throws if invalid.
   */
  validate() {
    const copy = new OAuth2AuthenticationPolicyConfiguration(
      this as any,
    ) as OAuth2AuthenticationPolicyConfigurationIntersection;
    validate('OAuth2AuthenticationPolicyConfiguration', copy);
  }

  /**
   * Normalizes the current instance of the OAuth2AuthenticationPolicyConfiguration.
   * Creates a copy of the OAuth2AuthenticationPolicyConfiguration, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the OAuth2AuthenticationPolicyConfiguration instance.
   */
  normalize(): OAuth2AuthenticationPolicyConfiguration & Specification.OAuth2AuthenticationPolicyConfiguration {
    const copy = new OAuth2AuthenticationPolicyConfiguration(
      this as any,
    ) as OAuth2AuthenticationPolicyConfigurationIntersection;
    return getLifecycleHooks('OAuth2AuthenticationPolicyConfiguration')?.normalize?.(copy) || copy;
  }
}

export const _OAuth2AuthenticationPolicyConfiguration =
  OAuth2AuthenticationPolicyConfiguration as OAuth2AuthenticationPolicyConfigurationConstructor;
