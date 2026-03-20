import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { gunzipSync as unzip } from 'node:zlib';
import ts from 'typescript';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const tempDir = path.resolve(repoRoot, '.pack-validation');
const packageExtractDir = path.resolve(tempDir, 'extracted');
const extractedPackageDir = path.resolve(packageExtractDir, 'package');
const consumerDir = path.resolve(tempDir, 'consumer');
const consumerNodeModulesDir = path.resolve(consumerDir, 'node_modules');
const consumerPackageDir = path.resolve(consumerNodeModulesDir, '@serverlessworkflow', 'sdk');

const readTarString = (buffer, start, length) =>
  buffer
    .subarray(start, start + length)
    .toString('utf8')
    .replace(/\0.*$/, '')
    .trim();

const parseTarSize = (buffer) => {
  const sizeValue = readTarString(buffer, 124, 12);
  return sizeValue ? Number.parseInt(sizeValue, 8) : 0;
};

const parsePaxHeader = (buffer) => {
  const metadata = {};
  let offset = 0;

  while (offset < buffer.length) {
    const spaceIndex = buffer.indexOf(0x20, offset);
    if (spaceIndex === -1) {
      break;
    }

    const recordLength = Number.parseInt(buffer.subarray(offset, spaceIndex).toString('utf8'), 10);
    if (!Number.isFinite(recordLength) || recordLength <= 0) {
      break;
    }

    const record = buffer.subarray(offset + (spaceIndex - offset) + 1, offset + recordLength - 1).toString('utf8');
    const separatorIndex = record.indexOf('=');
    if (separatorIndex !== -1) {
      metadata[record.slice(0, separatorIndex)] = record.slice(separatorIndex + 1);
    }

    offset += recordLength;
  }

  return metadata;
};

const extractTarball = (archivePath, destinationDir) => {
  const archive = unzip(readFileSync(archivePath));
  let offset = 0;
  let nextPathOverride;

  while (offset + 512 <= archive.length) {
    const header = archive.subarray(offset, offset + 512);
    offset += 512;

    if (header.every((byte) => byte === 0)) {
      break;
    }

    const size = parseTarSize(header);
    const typeFlag = readTarString(header, 156, 1) || '0';
    const name = readTarString(header, 0, 100);
    const prefix = readTarString(header, 345, 155);
    const body = archive.subarray(offset, offset + size);
    const defaultPath = [prefix, name].filter(Boolean).join('/');

    if (typeFlag === 'x') {
      const paxHeaders = parsePaxHeader(body);
      nextPathOverride = paxHeaders.path;
    } else if (typeFlag === 'L') {
      nextPathOverride = body.toString('utf8').replace(/\0.*$/, '');
    } else {
      const entryPath = nextPathOverride ?? defaultPath;
      nextPathOverride = undefined;

      if (!entryPath) {
        throw new Error('Encountered a tar entry without a path.');
      }

      const destinationPath = path.resolve(destinationDir, entryPath);
      if (!destinationPath.startsWith(destinationDir)) {
        throw new Error(`Tarball entry '${entryPath}' would escape the extraction directory.`);
      }

      if (typeFlag === '5') {
        mkdirSync(destinationPath, { recursive: true });
      } else if (typeFlag === '0' || typeFlag === '') {
        mkdirSync(path.dirname(destinationPath), { recursive: true });
        writeFileSync(destinationPath, body);
      }
    }

    offset += Math.ceil(size / 512) * 512;
  }
};

const formatDiagnostics = (diagnostics) =>
  ts.formatDiagnosticsWithColorAndContext(diagnostics, {
    getCanonicalFileName: (fileName) => fileName,
    getCurrentDirectory: () => consumerDir,
    getNewLine: () => '\n',
  });

const verifyTypeSmoke = (tsconfigPath) => {
  const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
  if (configFile.error) {
    throw new Error(formatDiagnostics([configFile.error]));
  }

  const parsedConfig = ts.parseJsonConfigFileContent(configFile.config, ts.sys, path.dirname(tsconfigPath));
  if (parsedConfig.errors.length > 0) {
    throw new Error(formatDiagnostics(parsedConfig.errors));
  }

  const program = ts.createProgram({
    rootNames: parsedConfig.fileNames,
    options: parsedConfig.options,
  });
  const diagnostics = ts.getPreEmitDiagnostics(program);

  if (diagnostics.length > 0) {
    throw new Error(formatDiagnostics(diagnostics));
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

const tarballPath = path.resolve(repoRoot, tarballName);

try {
  rmSync(tempDir, { force: true, recursive: true });
  mkdirSync(packageExtractDir, { recursive: true });
  mkdirSync(consumerNodeModulesDir, { recursive: true });
  mkdirSync(path.dirname(consumerPackageDir), { recursive: true });

  extractTarball(tarballPath, packageExtractDir);
  cpSync(extractedPackageDir, consumerPackageDir, { recursive: true });

  writeFileSync(
    path.resolve(consumerDir, 'package.json'),
    `${JSON.stringify({ name: 'sdk-pack-smoke', private: true, type: 'module' }, null, 2)}\n`,
  );

  writeFileSync(
    path.resolve(consumerDir, 'smoke-test.cjs'),
    `const sdk = require('@serverlessworkflow/sdk');
if (typeof sdk.Classes?.Workflow !== 'function') {
  throw new Error('Expected Classes.Workflow to be available from the CommonJS entrypoint.');
}
if (typeof sdk.workflowBuilder !== 'function') {
  throw new Error('Expected workflowBuilder to be available from the CommonJS entrypoint.');
}
`,
  );

  writeFileSync(
    path.resolve(consumerDir, 'smoke-test.mjs'),
    `import { Classes, workflowBuilder } from '@serverlessworkflow/sdk';
if (typeof Classes?.Workflow !== 'function') {
  throw new Error('Expected Classes.Workflow to be available from the ESM entrypoint.');
}
if (typeof workflowBuilder !== 'function') {
  throw new Error('Expected workflowBuilder to be available from the ESM entrypoint.');
}
`,
  );

  writeFileSync(
    path.resolve(consumerDir, 'smoke-browser.cjs'),
    `const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const context = {
  console,
  window: {},
  self: {},
  globalThis: {},
};

context.window = context;
context.self = context;
context.globalThis = context;

const bundlePath = path.resolve(__dirname, 'node_modules', '@serverlessworkflow', 'sdk', 'umd', 'index.umd.min.js');
const source = fs.readFileSync(bundlePath, 'utf8');

vm.runInNewContext(source, context, { filename: bundlePath });

if (typeof context.serverWorkflowSdk?.Classes?.Workflow !== 'function') {
  throw new Error('Expected the browser bundle to expose serverWorkflowSdk.Classes.Workflow.');
}
`,
  );

  writeFileSync(
    path.resolve(consumerDir, 'smoke-types.ts'),
    `import { Classes, type Specification, workflowBuilder } from '@serverlessworkflow/sdk';

const workflow: Specification.Workflow = {
  document: {
    dsl: '1.0.0',
    name: 'pack-smoke',
    namespace: 'test',
    version: '1.0.0',
  },
  do: [],
};

const instance = new Classes.Workflow(workflow);
workflowBuilder(workflow).build();
instance.validate();
`,
  );

  writeFileSync(
    path.resolve(consumerDir, 'tsconfig.json'),
    `${JSON.stringify(
      {
        compilerOptions: {
          module: 'NodeNext',
          moduleResolution: 'NodeNext',
          noEmit: true,
          strict: true,
          target: 'ES2022',
        },
        include: ['smoke-types.ts'],
      },
      null,
      2,
    )}\n`,
  );

  const consumerRequire = createRequire(path.resolve(consumerDir, 'package.json'));
  consumerRequire(path.resolve(consumerDir, 'smoke-test.cjs'));
  consumerRequire(path.resolve(consumerDir, 'smoke-browser.cjs'));
  await import(pathToFileURL(path.resolve(consumerDir, 'smoke-test.mjs')).href);
  verifyTypeSmoke(path.resolve(consumerDir, 'tsconfig.json'));
} finally {
  rmSync(tarballPath, { force: true });
  rmSync(tempDir, { force: true, recursive: true });
}
