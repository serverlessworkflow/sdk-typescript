import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const distDir = path.resolve(repoRoot, 'dist');
const packageJsonPath = path.resolve(distDir, 'package.json');

if (!existsSync(packageJsonPath)) {
  throw new Error(`Missing packaged manifest at '${packageJsonPath}'. Run the build first.`);
}

const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

const requiredFiles = [
  packageJson.main,
  packageJson.module,
  packageJson.browser,
  packageJson.types,
  'README.md',
  'LICENSE',
];

requiredFiles.forEach((relativePath) => {
  const resolvedPath = path.resolve(distDir, relativePath);
  if (!existsSync(resolvedPath)) {
    throw new Error(`Packaged file '${relativePath}' was not found in '${distDir}'.`);
  }
});

if (packageJson.engines?.node !== '>=22.0.0') {
  throw new Error(`Expected the packaged manifest to require Node >=22.0.0, received '${packageJson.engines?.node}'.`);
}

if (!packageJson.exports?.['.']?.import || !packageJson.exports?.['.']?.require) {
  throw new Error('The packaged manifest must expose both import and require entrypoints.');
}
