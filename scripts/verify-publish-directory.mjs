import path from 'node:path';

if (path.basename(process.cwd()) !== 'dist') {
  console.error('Packaging and publishing must be executed from ./dist/.');
  process.exitCode = 1;
}
