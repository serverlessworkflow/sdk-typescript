import { cpSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const distDir = path.resolve(repoRoot, 'dist');
const packageJsonPath = path.resolve(repoRoot, 'package.json');

const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

const distPackageJson = {
  name: packageJson.name,
  version: packageJson.version,
  schemaVersion: packageJson.schemaVersion,
  description: packageJson.description,
  main: packageJson.main,
  browser: packageJson.browser,
  module: packageJson.module,
  types: packageJson.types,
  typings: packageJson.typings,
  exports: packageJson.exports,
  files: packageJson.files,
  sideEffects: packageJson.sideEffects,
  repository: packageJson.repository,
  author: packageJson.author,
  license: packageJson.license,
  bugs: packageJson.bugs,
  homepage: packageJson.homepage,
  engines: packageJson.engines,
  dependencies: packageJson.dependencies,
};

writeFileSync(path.resolve(distDir, 'package.json'), `${JSON.stringify(distPackageJson, null, 2)}\n`);
cpSync(path.resolve(repoRoot, 'README.md'), path.resolve(distDir, 'README.md'));
cpSync(path.resolve(repoRoot, 'LICENSE'), path.resolve(distDir, 'LICENSE'));
