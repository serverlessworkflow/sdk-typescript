/* eslint-disable */
import { definitionsDir } from './utils';
import * as path from 'path';
import { promises as fsPromises } from 'fs';
import { Project, QuoteKind, Type, Node, TypeNode } from 'ts-morph';

const { readFile, writeFile } = fsPromises;

const definitionFile = path.resolve(definitionsDir, 'specification.ts');

const getUnderlyingTypes = (type: Type): Type[] => [
  type,
  ...type.getUnionTypes().flatMap((t) => getUnderlyingTypes(t)),
  ...type.getIntersectionTypes().flatMap((t) => getUnderlyingTypes(t)),
]; //.filter(t => !t.isArray());

type PropertyInfo = {
  name: string;
  type: string;
  originalType: Type;
  originalDeclaration: string;
  isArray: boolean;
  isAnonymous: boolean;
  isLiteral: boolean;
  hasIndexedSignature: boolean;
};

const hasStringIndexedSignature = (type: Type): boolean => !!type.getStringIndexType();

const getProperties = (node: any, type: Type): PropertyInfo[] =>
  getUnderlyingTypes(type)
    .filter((t) => t.isObject())
    .flatMap((t) => t.getProperties())
    .filter((p, i, arr) => {
      const originalType = p.getTypeAtLocation(node).getNonNullableType();
      // originalType.isObject() doesn't return the expected result
      const isObject = !(
        (
          originalType.isString() ||
          originalType.isNumber() ||
          originalType.isBoolean() ||
          originalType.isBigInt() ||
          originalType.isEnum() ||
          originalType.isAny() ||
          originalType.isUnknown()
        )
        //|| originalType.isLiteral()
      );
      const isAnonymous = originalType.isAnonymous();
      const isAny = originalType.isAny();
      const isArray = originalType.isArray();
      const isBoolean = originalType.isBoolean();
      const isBooleanLiteral = originalType.isBooleanLiteral();
      const isClass = originalType.isClass();
      const isClassOrInterface = originalType.isClassOrInterface();
      const isEnum = originalType.isEnum();
      const isEnumLiteral = originalType.isEnumLiteral();
      const isInterface = originalType.isInterface();
      const isIntersection = originalType.isIntersection();
      const isLiteral = originalType.isLiteral();
      const isNull = originalType.isNull();
      const isNumber = originalType.isNumber();
      const isNumberLiteral = originalType.isNumberLiteral();
      //const isObject = originalType.isObject();
      const isString = originalType.isString();
      const isStringLiteral = originalType.isStringLiteral();
      const isTemplateLiteral = originalType.isTemplateLiteral();
      const isTuple = originalType.isTuple();
      const isUndefined = originalType.isUndefined();
      const isUnion = originalType.isUnion();
      const isUnionOrIntersection = originalType.isUnionOrIntersection();
      const isUnknown = originalType.isUnknown();
      return arr.indexOf(p) === i && isObject;
      //arr.findIndex(pp => pp.getName() === p.getName()) === i // removes duplicates based on names, but creates unwanted behavior
      // e.g. with Task, `with` can be of type `CallAsyncAPIWith`,`CallGRPCWith`...
    })
    .map((p) => {
      const name = p.getName();
      const originalType = p.getTypeAtLocation(node).getNonNullableType();
      const originalDeclaration = originalType.getText();
      const isArray = originalType.isArray();
      const isAnonymous = originalType.isAnonymous();
      const isLiteral = originalType.isLiteral();
      const hasIndexedSignature = hasStringIndexedSignature(originalType);
      let typeTxt = '';
      if (/*!isArray && */ !isAnonymous || !hasIndexedSignature) {
        typeTxt = originalType.getText();
      } else if (hasIndexedSignature) {
        typeTxt = originalType.getStringIndexType()!.getText();
      }
      /*else {
        const arrayType = originalType.getArrayElementType()!;
        if (!hasStringIndexedSignature(arrayType)) {
          typeTxt = arrayType.getText();
        }
        else {
          typeTxt = arrayType.getStringIndexType()!.getText();
        }
      }*/
      typeTxt = typeTxt.replace('import("/declarations").', '');
      return {
        name,
        originalType,
        originalDeclaration,
        isArray,
        isAnonymous,
        isLiteral,
        hasIndexedSignature,
        type: typeTxt,
      };
    })
    .concat(
      hasStringIndexedSignature(type)
        ? [
            {
              name: '',
              originalType: type.getStringIndexType()!,
              originalDeclaration: type.getStringIndexType()!.getText(),
              isArray: type.getStringIndexType()!.isArray(),
              isAnonymous: type.getStringIndexType()!.isAnonymous(),
              isLiteral: type.getStringIndexType()!.isLiteral(),
              hasIndexedSignature: true,
              type: type.getStringIndexType()!.getText(),
            },
          ]
        : [],
    );

async function test() {
  const source = await readFile(definitionFile, { encoding: 'utf-8' });
  const project = new Project({
    useInMemoryFileSystem: true,
    manipulationSettings: {
      quoteKind: QuoteKind.Single,
    },
    compilerOptions: {
      strictNullChecks: true,
    },
  });
  const sourceFile = project.createSourceFile('declarations.ts', source);
  const exportedDeclarations = sourceFile.getExportedDeclarations();
  // var node = exportedDeclarations.get('ExternalResource')![0];
  // var target = node.getType();
  // var props = getProperties(node, target);
  var node = exportedDeclarations.get('SwitchTaskSwitch')![0];
  var target = node.getType();
  var it = target.getIntersectionTypes();
  var props = getProperties(node, target);
  var declarations = !target.isArray() ? getObjectHydration(node, target) : 'IS ARRAY';
  /*
    Strange union
    - SwitchTaskSwitch

    Strange union (literal?)
    - CallHTTPWith / CallOpenAPIWith . output

    Array with object key-type
    - TaskList
    - UseExtensions
  */
  console.log(declarations);
}

function getObjectHydration(node: Node, type: Type): string {
  const properties = getProperties(node, type);
  const namedProperties = properties.filter((p, i, arr) => p.name && arr.findIndex((pp) => pp.name === p.name) === i);
  const lines: string[] = namedProperties
    .filter((p) => p.type !== 'unknown')
    .map((prop) => {
      if (prop.isLiteral) {
        return `self.${prop.name} = ${prop.type};`;
      } else if (/*!prop.isArray && */ !prop.isAnonymous) {
        return `if (model.${prop.name}) self.${prop.name} = new ${prop.type}(model.${prop.name});`;
      } /*if (prop.isAnonymous)*/ else {
        return `if (model.${prop.name}) self.${prop.name} = Object.fromEntries(
        Object.entries(model.${prop.name}).map(([key, value]) => [key, new ${prop.type}(value)] )
      );`;
      }
      /* Array should support their own constructor, like any object
    else {
      if (!prop.isAnonymous) {
        return `if (model.${prop.name}?.length) self.${prop.name} = model.${prop.name}.map(value => new ${prop.type}(value));`;
      }
      else { // assumes an array of { id: Type }
        return `if (model.${prop.name}?.length) self.${prop.name} = model.${prop.name}.map(obj => 
          Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [key, new ${prop.type}(value)])
          )
        );`;
      }
    }
    */
    });
  const indexedProperty = properties.find((p) => !p.name);
  if (indexedProperty && indexedProperty.type !== 'unknown' && !indexedProperty.isAnonymous) {
    lines.push(`const knownProperties = [${namedProperties.map((p) => `'${p.name}'`).join(',')}];`);
    lines.push(`Object.entries(model).filter(([key]) => !knownProperties.includes(key)).forEach(([key, value]) => {
      self[key] = new ${indexedProperty.type}(value);
    });`);
  }
  return lines.join('\n');
}

test()
  .then(() => console.log('done'))
  .catch((err) => console.error(err));
/* eslint-enable */
