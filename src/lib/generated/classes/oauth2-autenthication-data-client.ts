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

import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';

/**
 * Represents the intersection between the OAuth2AutenthicationDataClient class and type
 */
export type OAuth2AutenthicationDataClientIntersection = OAuth2AutenthicationDataClient &
  Specification.OAuth2AutenthicationDataClient;

/**
 * Represents a constructor for the intersection of the OAuth2AutenthicationDataClient class and type
 */
export interface OAuth2AutenthicationDataClientConstructor {
  new (model?: Partial<Specification.OAuth2AutenthicationDataClient>): OAuth2AutenthicationDataClientIntersection;
}

/**
 * Represents a OAuth2AutenthicationDataClient with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class OAuth2AutenthicationDataClient extends ObjectHydrator<Specification.OAuth2AutenthicationDataClient> {
  /**
   * Instanciates a new instance of the OAuth2AutenthicationDataClient class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the OAuth2AutenthicationDataClient.
   */
  constructor(model?: Partial<Specification.OAuth2AutenthicationDataClient>) {
    super(model);

    getLifecycleHooks('OAuth2AutenthicationDataClient')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the OAuth2AutenthicationDataClient.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new OAuth2AutenthicationDataClient(this as any) as OAuth2AutenthicationDataClientIntersection;
    validate('OAuth2AutenthicationDataClient', copy, workflow);
  }

  /**
   * Normalizes the current instance of the OAuth2AutenthicationDataClient.
   * Creates a copy of the OAuth2AutenthicationDataClient, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the OAuth2AutenthicationDataClient instance.
   */
  normalize(): OAuth2AutenthicationDataClient & Specification.OAuth2AutenthicationDataClient {
    const copy = new OAuth2AutenthicationDataClient(this as any) as OAuth2AutenthicationDataClientIntersection;
    return getLifecycleHooks('OAuth2AutenthicationDataClient')?.normalize?.(copy) || copy;
  }
}

export const _OAuth2AutenthicationDataClient =
  OAuth2AutenthicationDataClient as OAuth2AutenthicationDataClientConstructor;
