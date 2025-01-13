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
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the OAuth2AutenthicationData class and type
 */
export type OAuth2AutenthicationDataIntersection = OAuth2AutenthicationData & Specification.OAuth2AutenthicationData;

/**
 * Represents a constructor for the intersection of the OAuth2AutenthicationData class and type
 */
export interface OAuth2AutenthicationDataConstructor {
  new (model?: Partial<Specification.OAuth2AutenthicationData>): OAuth2AutenthicationDataIntersection;
}

/**
 * Represents a OAuth2AutenthicationData with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class OAuth2AutenthicationData extends ObjectHydrator<Specification.OAuth2AutenthicationData> {
  /**
   * Instanciates a new instance of the OAuth2AutenthicationData class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the OAuth2AutenthicationData.
   */
  constructor(model?: Partial<Specification.OAuth2AutenthicationData>) {
    super(model);
    const self = this as unknown as Specification.OAuth2AutenthicationData & object;
    if (isObject(model)) {
      if (typeof model.client === 'object') self.client = new _OAuth2AutenthicationDataClient(model.client);
      if (typeof model.request === 'object') self.request = new _OAuth2TokenRequest(model.request);
      if (typeof model.subject === 'object') self.subject = new _OAuth2TokenDefinition(model.subject);
      if (typeof model.actor === 'object') self.actor = new _OAuth2TokenDefinition(model.actor);
    }
    getLifecycleHooks('OAuth2AutenthicationData')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the OAuth2AutenthicationData.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new OAuth2AutenthicationData(this as any) as OAuth2AutenthicationDataIntersection;
    validate('OAuth2AutenthicationData', copy, workflow);
  }

  /**
   * Normalizes the current instance of the OAuth2AutenthicationData.
   * Creates a copy of the OAuth2AutenthicationData, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the OAuth2AutenthicationData instance.
   */
  normalize(): OAuth2AutenthicationData & Specification.OAuth2AutenthicationData {
    const copy = new OAuth2AutenthicationData(this as any) as OAuth2AutenthicationDataIntersection;
    return getLifecycleHooks('OAuth2AutenthicationData')?.normalize?.(copy) || copy;
  }
}

export const _OAuth2AutenthicationData = OAuth2AutenthicationData as OAuth2AutenthicationDataConstructor;
