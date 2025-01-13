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

import { Specification } from '../definitions';
import { ArrayHydrator } from '../../hydrator';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';

/**
 * Represents the intersection between the OAuth2AutenthicationDataAudiences class and type
 */
export type OAuth2AutenthicationDataAudiencesIntersection = OAuth2AutenthicationDataAudiences &
  Specification.OAuth2AutenthicationDataAudiences;

/**
 * Represents a constructor for the intersection of the OAuth2AutenthicationDataAudiences class and type
 */
export interface OAuth2AutenthicationDataAudiencesConstructor {
  new (model?: Array<string> | number): OAuth2AutenthicationDataAudiencesIntersection;
}

/**
 * Represents a collection of string.
 * Inherits from ArrayHydrator to handle array-specific hydration.
 */
export class OAuth2AutenthicationDataAudiences extends ArrayHydrator<string> {
  /**
   * Constructs a new instance of the OAuth2AutenthicationDataAudiences class.
   *
   * @param model - Optional parameter which can be an array of objects or a number representing the array length.
   */
  constructor(model?: Array<string> | number) {
    super(model);
    if (Array.isArray(model)) {
      if (model?.length) {
        this.splice(0, this.length);
        model.forEach((item) => this.push(item));
      }
    }
    Object.setPrototypeOf(this, Object.create(OAuth2AutenthicationDataAudiences.prototype));
    getLifecycleHooks('OAuth2AutenthicationDataAudiences')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the OAuth2AutenthicationDataAudiences.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new OAuth2AutenthicationDataAudiences(this);
    validate('OAuth2AutenthicationDataAudiences', copy, workflow);
  }

  /**
   * Normalizes the current instance of the OAuth2AutenthicationDataAudiences.
   * Creates a copy of the OAuth2AutenthicationDataAudiences, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the OAuth2AutenthicationDataAudiences instance.
   */
  normalize(): OAuth2AutenthicationDataAudiences {
    const copy = new OAuth2AutenthicationDataAudiences(this);
    return getLifecycleHooks('OAuth2AutenthicationDataAudiences')?.normalize?.(copy) || copy;
  }
}

export const _OAuth2AutenthicationDataAudiences =
  OAuth2AutenthicationDataAudiences as unknown as OAuth2AutenthicationDataAudiencesConstructor;
//export const _OAuth2AutenthicationDataAudiences = OAuth2AutenthicationDataAudiences; // could be exported directly, but it makes the job of building the index more straightforward as it's consistant with "object" classes
