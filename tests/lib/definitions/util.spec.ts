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
 *
 */

import { overwriteProperties, overwritePropertyAsPlainType } from '../../../src/lib/definitions/utils';
import { Properties } from '../../../src/lib/definitions/types';

describe('Util ', () => {
  describe('overwritePropertyAsPlainType  ', () => {
    it('should create a copy of data property', () => {
      class HasData {
        data?: {
          key: string;
        };
      }

      const source = {
        data: {
          key: 'action',
        },
      } as HasData;

      const target = {} as HasData;
      Object.assign(target, source);
      overwritePropertyAsPlainType('data', target);

      expect(target.data!.key).toBe('action');
      source.data!.key = 'action2';
      expect(target.data!.key).toBe('action');
    });

    it('should create a copy of data property', () => {
      class HasData {
        data?:
          | string
          | {
              [key: string]: any;
            };
      }

      const source = {
        data: {
          key1: 'value1',
        },
      } as HasData;

      const target = {} as HasData;
      Object.assign(target, source);
      overwritePropertyAsPlainType('data', target);

      // @ts-ignore
      expect(target!.data['key1']).toBe('value1');
      // @ts-ignore
      source!.data['key1'] = 'value2';
      // @ts-ignore
      expect(target!.data['key1']).toBe('value1');
    });
  });

  describe('overwriteProperties  ', () => {
    class HasProperties {
      properties: string | Properties;
    }

    it('should create an instance of Basicpropsdef', () => {
      const source = {
        properties: {
          username: 'name',
          password: 'pwd',
        },
      } as HasProperties;

      const target = Object.assign({}, source);
      overwriteProperties(target);
      expect(target.properties.constructor.name).toBe('Basicpropsdef');
    });

    it('should create an instance of Bearerpropsdef', () => {
      const source = {
        properties: {
          token: 'token',
        },
      } as HasProperties;

      const target = Object.assign({}, source);
      overwriteProperties(target);
      expect(target.properties.constructor.name).toBe('Bearerpropsdef');
    });

    it('should create an instance of Oauth2propsdef', () => {
      const source = {
        properties: {
          grantType: 'password',
          clientId: 'cid',
        },
      } as HasProperties;

      const target = Object.assign({}, source);
      overwriteProperties(target);
      expect(target.properties.constructor.name).toBe('Oauth2propsdef');
    });

    it('should not create an instance of Properties type', () => {
      const source = {
        properties: 'any value',
      } as HasProperties;

      const target = Object.assign({}, source);
      overwriteProperties(target);
      expect(target.properties.constructor.name).toBe('String');
    });
  });
});
