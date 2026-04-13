/**
 * Materializes the publishable package metadata inside `dist/`.
 *
 * The build emits compiled assets into `dist/`, but npm publishing happens from
 * that directory rather than from the repository root. This script writes a
 * trimmed `dist/package.json` containing only the fields that should ship to
 * consumers, then copies the top-level README and LICENSE alongside it.
 */
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
  type: packageJson.type,
  main: packageJson.main,
  module: packageJson.module,
  browser: packageJson.browser,
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
