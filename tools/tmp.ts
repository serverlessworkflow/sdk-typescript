/* eslint-disable */
import { definitionsDir } from './utils';
import * as path from 'path';
import { promises as fsPromises } from 'fs';
import { Project, QuoteKind, Type, Node, Symbol, printNode } from 'ts-morph';
import { getArrayHydration, getObjectHydration } from './reflection';

const { readFile, writeFile } = fsPromises;

const definitionFile = path.resolve(definitionsDir, 'specification.ts');

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
  //var tuples = Array.from(exportedDeclarations).filter(([k, v]) => v[0]!.getType().isTuple());
  //var arrays = Array.from(exportedDeclarations).filter(([k, v]) => v[0]!.getType().isArray());
  // var node = exportedDeclarations.get('ExternalResource')![0];
  // var target = node.getType();
  // var props = getProperties(node, target);
  var node = exportedDeclarations.get('AuthenticationPolicyOauth2')![0];
  var target = node.getType();
  var declarations = !target.isArray() ? getObjectHydration(node, target) : getArrayHydration(target);
  console.log(declarations.code);
}

test()
  .then(() => console.log('done'))
  .catch((err) => console.error(err));
/* eslint-enable */
