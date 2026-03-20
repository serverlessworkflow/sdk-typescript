import { readdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

readdirSync(repoRoot)
  .filter((fileName) => fileName.endsWith('.tgz'))
  .forEach((fileName) => {
    rmSync(path.resolve(repoRoot, fileName), { force: true });
  });
