/**
 * Prevents `npm pack` and `npm publish` from running from the repository root.
 *
 * This project publishes from `dist/`, so packaging from any other directory
 * would produce the wrong artifact set and bypass the dist-specific metadata.
 */
import path from 'node:path';

if (path.basename(process.cwd()) !== 'dist') {
  console.error('Packaging and publishing must be executed from ./dist/.');
  process.exitCode = 1;
}
