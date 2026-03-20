import { readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const run = (command, args, cwd = repoRoot) => {
  const result = spawnSync(command, args, {
    cwd,
    shell: process.platform === 'win32',
    stdio: 'inherit',
  });

  if (result.status !== 0) {
    throw new Error(`Command failed: ${command} ${args.join(' ')}`);
  }
};

const tarballName = readdirSync(repoRoot)
  .filter((fileName) => fileName.endsWith('.tgz'))
  .sort(
    (left, right) => statSync(path.resolve(repoRoot, right)).mtimeMs - statSync(path.resolve(repoRoot, left)).mtimeMs,
  )
  .at(0);

if (!tarballName) {
  throw new Error('Unable to find a packed tarball in the repository root. Run `npm run pack:dist` first.');
}

run('npx', ['publint', './dist']);
run('npx', ['attw', path.resolve(repoRoot, tarballName)]);
