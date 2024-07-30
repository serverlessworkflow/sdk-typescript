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

import { ExportedDeclarations, Project, QuoteKind, Type, Symbol as TsMorphSymbol, Node } from 'ts-morph';

/**
 * Describes an object property
 */
type PropertyInfo = {
  /** The property name */
  name: string;
  /** The property type name */
  type: string;
  /** The original ts-morph type */
  originalType: Type;
  /** The original declaration */
  originalDeclaration: string;
  /** True if the property type is anonymous */
  isAnonymous: boolean;
  /** True if the property type has an indexed signature */
  hasIndexedSignature: boolean;
};

/** The result of an hydration call */
type HydrationResult = {
  /** The list of types to import */
  imports: string[];
  /** The hydration code */
  code: string;
};

/**
 * Get the exported declarations of the provided TypeScript code
 * @param tsSource The TypeScript code to parse
 * @returns An array containing the name of the exported declarations
 */
export const getExportedDeclarations = (tsSource: string): ReadonlyMap<string, ExportedDeclarations[]> => {
  const project = new Project({
    useInMemoryFileSystem: true,
    manipulationSettings: {
      quoteKind: QuoteKind.Single,
    },
  });
  const sourceFile = project.createSourceFile('declarations.ts', tsSource);
  return sourceFile.getExportedDeclarations();
};

/**
 * Gets a type, its union, intersection and tuple subtypes
 * @param type The source type
 * @returns An array containing the type and its subtypes
 */
export const getUnderlyingTypes = (type: Type): Type[] =>
  [
    type,
    ...type.getUnionTypes().flatMap((t) => getUnderlyingTypes(t)),
    ...type.getIntersectionTypes().flatMap((t) => getUnderlyingTypes(t)),
    ...type.getTupleElements().flatMap((t) => getUnderlyingTypes(t)),
  ].filter(
    (t, idx, arr) => arr.findIndex((tt) => tt.getText() === t.getText()) === idx && !t.isArray() && !t.isTuple(),
  );

/**
 * Checks if the provided type has an indexed signature
 * @param type The type to check
 * @returns True if the type has an indexed signature
 */
const hasStringIndexedSignature = (type: Type): boolean => !!type.getStringIndexType();

/**
 * Checks if the provided type is a value type or a union/intersection/tuple of value types
 * @param type The type to check
 * @returns True if the type, or its subtypes, is a value type
 */
const isValueType = (type: Type): boolean =>
  type.isString() ||
  type.isNumber() ||
  type.isBoolean() ||
  type.isBigInt() ||
  type.isEnum() ||
  type.isAny() ||
  type.isUnknown() ||
  type.isLiteral() ||
  (type.isUnion() && type.getUnionTypes().every((t) => isValueType(t))) ||
  (type.isIntersection() && type.getIntersectionTypes().every((t) => isValueType(t))) ||
  (type.isTuple() && type.getTupleElements().every((t) => isValueType(t))) ||
  (type.isArray() && isValueType(type.getArrayElementTypeOrThrow())) ||
  (type.isAnonymous() && hasStringIndexedSignature(type) && isValueType(type.getStringIndexType()!));
/**
 * Cleans the type name
 * @param type The type to get the name from
 * @param replacement The replacement text
 * @returns The type name
 */
export const getTypeName = (type: Type, replacement: string = '') =>
  type.getText().replace('import("/declarations").', replacement);

/**
 * Returns the properties of the give type
 * @param node The node containing the type
 * @param type The type to get the properties from
 * @returns An array of Symbol for the type's properties
 */
const getProperties = (node: Node, type: Type): TsMorphSymbol[] =>
  getUnderlyingTypes(type)
    .filter((t) => t.isObject())
    .flatMap((t) => t.getProperties());
/**
 * Transforms the provided property Symbol to a PropertyInfo
 * @param property The property to transform
 * @param node The node the property belongs to
 * @returns The PropertyInfo for the provided property
 */
function asPropertyInfo(property: TsMorphSymbol, node: Node): PropertyInfo {
  const name = property.getName();
  const originalType = property.getTypeAtLocation(node).getNonNullableType();
  const originalDeclaration = originalType.getText();
  const isAnonymous = originalType.isAnonymous();
  const hasIndexedSignature = hasStringIndexedSignature(originalType);
  let typeTxt = '';
  if (!isAnonymous || !hasIndexedSignature) {
    typeTxt = getTypeName(originalType);
  } else if (hasIndexedSignature) {
    typeTxt = getTypeName(originalType.getStringIndexType()!);
  }
  return {
    name,
    originalType,
    originalDeclaration,
    isAnonymous,
    hasIndexedSignature,
    type: typeTxt,
  };
}

/**
 * Gets a list of properties that could be hydrated
 * @param node The node containing the type
 * @param type The type to get the properties from
 * @param properties The type properties
 * @returns An array of hydratable PropertyInfo
 */
const getHydratableProperties = (node: Node, type: Type, properties: TsMorphSymbol[]): PropertyInfo[] =>
  properties
    .filter((p) => {
      const originalType = p.getTypeAtLocation(node).getNonNullableType();
      //debugType(originalType);
      return !isValueType(originalType);
    })
    .map((p) => asPropertyInfo(p, node))
    .concat(
      ...getUnderlyingTypes(type)
        .map((t) => t.getStringIndexType())
        .filter((t) => !!t && !isValueType(t))
        .reduce((props, t: Type) => {
          props.push({
            name: '',
            originalType: t,
            originalDeclaration: t.getText(),
            isAnonymous: t.isAnonymous(),
            hasIndexedSignature: true,
            type: getTypeName(t),
          });
          return props;
        }, [] as PropertyInfo[]),
    );

/**
 * Gets a list of literal properties
 * @param node The node containing the type
 * @param properties The type properties
 * @returns An array of literal PropertyInfo
 */
const getConstantProperties = (node: Node, properties: TsMorphSymbol[]): PropertyInfo[] =>
  properties
    .filter((p) => {
      const originalType = p.getTypeAtLocation(node).getNonNullableType();
      //debugType(originalType);
      return originalType.isLiteral() && (!originalType.isUnion() || !originalType.isIntersection());
    })
    .map((p) => asPropertyInfo(p, node));

/**
 * Gets duplicate values from an array
 * @param input An array of values
 * @returns An array of values that are duplicate in the input array
 */
const getDuplicateValues = <T>(input: Array<T>): Array<T> =>
  input.filter((item, idx) => input.indexOf(item) === idx && input.lastIndexOf(item) !== idx);

/**
 * Produces the code to hydrate an object of the provided type
 * @param node The node containing the type
 * @param type The type to get the properties from
 * @returns The code to hydrate the provided type
 */
export function getObjectHydration(node: Node, type: Type): HydrationResult {
  const properties = getProperties(node, type);
  const hydratableProperties = getHydratableProperties(node, type, properties);
  let constantProperties = getConstantProperties(node, properties);
  const duplicateConstantProperties = getDuplicateValues(constantProperties.map((p) => p.name));
  duplicateConstantProperties.forEach((name) => {
    console.warn(`Found duplicate property '${name}' in '${type.getAliasSymbol()?.getName()}', ignored.`);
  });
  constantProperties = constantProperties.filter((prop) => !duplicateConstantProperties.includes(prop.name));
  let namedProperties = hydratableProperties.filter((prop) => !!prop.name);
  const duplicateNamedProperties = getDuplicateValues(namedProperties.map((p) => p.name));
  duplicateNamedProperties.forEach((name) => {
    console.warn(`Found duplicate property '${name}' in '${type.getAliasSymbol()?.getName()}', ignored.`);
  });
  namedProperties = namedProperties.filter((prop) => !duplicateNamedProperties.includes(prop.name));
  const imports: string[] = [...namedProperties.map((p) => p.type)].filter((type, i, arr) => arr.indexOf(type) === i);
  const lines: string[] = [
    ...constantProperties.map((prop) => `self.${prop.name} = ${prop.type} as const;`),
    ...namedProperties.map((prop) => {
      const propName = !type.isUnion() ? prop.name : `${prop.name} as Specification.${prop.type}`;
      if (!prop.isAnonymous) {
        return `if (typeof model.${prop.name} === 'object') self.${prop.name} = new _${prop.type}(model.${propName}) ${prop.originalType.isTuple() ? `as Specification.${prop.type}` : ''};`;
      }
      if (prop.isAnonymous) {
        return `if (typeof model.${prop.name} === 'object') self.${prop.name} = Object.fromEntries(
            Object.entries(model.${propName}).map(([key, value]) => [key, new _${prop.type}(value)] )
          );`;
      }
    }),
  ].filter((line): line is string => !!line?.trim());
  const indexedProperty = hydratableProperties.find((p) => !p.name);
  if (indexedProperty && !indexedProperty.isAnonymous) {
    imports.push(indexedProperty.type);
    lines.push(
      `const knownProperties: string[] = [${[...constantProperties, ...namedProperties].map((p) => `'${p.name}'`).join(',')}];`,
    );
    lines.push(`Object.entries(model).filter(([key]) => !knownProperties.includes(key)).forEach(([key, value]) => {
      self[key] = new _${indexedProperty.type}(value);
    });`);
  }
  const code = lines.join('\n');
  return {
    imports,
    code,
  };
}

/**
 * Produces the code to hydrate an array of the provided type
 * @param type The array type to hydrate
 * @returns The code to hydrate the provided array
 */
export function getArrayHydration(type: Type): HydrationResult {
  const arrayType = type.getArrayElementType() || getUnderlyingTypes(type)[0];
  const lines: string[] = ['if (model?.length) {', 'this.splice(0, this.length);'];
  const imports: string[] = [];
  if (!arrayType.isAnonymous()) {
    const typeName = getTypeName(arrayType);
    imports.push(typeName);
    lines.push(`model.forEach(item => this.push(new _${typeName}(item)));`);
  } else {
    const typeName = getTypeName(arrayType.getStringIndexType()!);
    imports.push(typeName);
    lines.push(
      `model.forEach(item => this.push(Object.fromEntries(Object.entries(item).map(([key, value]) => [key, new _${typeName}(value)]))));`,
    );
  }
  lines.push('}');
  const code = lines.join('\n');
  return {
    imports,
    code,
  };
}
