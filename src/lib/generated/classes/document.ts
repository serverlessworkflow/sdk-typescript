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

import { _DocumentTags } from './document-tags';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHook } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { deepCopy, isObject } from '../../utils';

class Document extends ObjectHydrator<Specification.Document> {
  constructor(model?: Partial<Specification.Document>) {
    super(model);
    const self = this as unknown as Specification.Document & object;
    if (isObject(model)) {
      if (typeof model.tags === 'object') self.tags = new _DocumentTags(model.tags);
    }
    getLifecycleHook('Document')?.constructor?.(this);
  }

  validate() {
    const copy = new Document(this as any) as Document & Specification.Document;
    getLifecycleHook('Document')?.preValidation?.(copy);
    validate('Document', deepCopy(copy)); // deepCopy prevents potential additional properties error for constructor, validate, normalize
    getLifecycleHook('Document')?.postValidation?.(copy);
  }

  normalize(): Document & Specification.Document {
    const copy = new Document(this as any) as Document & Specification.Document;
    return getLifecycleHook('Document')?.normalize?.(copy) || copy;
  }
}

export const _Document = Document as {
  new (model?: Partial<Specification.Document>): Document & Specification.Document;
};
