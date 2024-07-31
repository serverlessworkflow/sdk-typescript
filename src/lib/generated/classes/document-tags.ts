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
 * Represents the intersection between the DocumentTags class and type
 */
export type DocumentTagsIntersection = DocumentTags & Specification.DocumentTags;

/**
 * Represents a constructor for the intersection of the DocumentTags class and type
 */
export interface DocumentTagsConstructor {
  new (model?: Partial<Specification.DocumentTags>): DocumentTagsIntersection;
}

/**
 * Represents a DocumentTags with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class DocumentTags extends ObjectHydrator<Specification.DocumentTags> {
  /**
   * Instanciates a new instance of the DocumentTags class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the DocumentTags.
   */
  constructor(model?: Partial<Specification.DocumentTags>) {
    super(model);

    getLifecycleHooks('DocumentTags')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the DocumentTags.
   * Throws if invalid.
   */
  validate() {
    const copy = new DocumentTags(this as any) as DocumentTagsIntersection;
    validate('DocumentTags', copy);
  }

  /**
   * Normalizes the current instance of the DocumentTags.
   * Creates a copy of the DocumentTags, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the DocumentTags instance.
   */
  normalize(): DocumentTags & Specification.DocumentTags {
    const copy = new DocumentTags(this as any) as DocumentTagsIntersection;
    return getLifecycleHooks('DocumentTags')?.normalize?.(copy) || copy;
  }
}

export const _DocumentTags = DocumentTags as DocumentTagsConstructor;
