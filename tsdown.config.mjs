import { defineConfig } from 'tsdown';

const sharedConfig = {
  entry: ['src/index.ts'],
  outDir: 'dist',
  platform: 'neutral',
  sourcemap: true,
  fixedExtension: true,
  hash: false,
  report: false,
};

export default defineConfig([
  {
    ...sharedConfig,
    format: ['esm', 'cjs'],
    dts: true,
  },
  {
    ...sharedConfig,
    format: ['umd'],
    platform: 'browser',
    globalName: 'serverWorkflowSdk',
    dts: false,
    deps: {
      alwaysBundle: [/^ajv(?:\/.*)?$/, /^ajv-formats$/, /^js-yaml$/],
      onlyBundle: false,
    },
  },
  {
    ...sharedConfig,
    format: ['umd'],
    platform: 'browser',
    globalName: 'serverWorkflowSdk',
    dts: false,
    minify: true,
    deps: {
      alwaysBundle: [/^ajv(?:\/.*)?$/, /^ajv-formats$/, /^js-yaml$/],
      onlyBundle: false,
    },
    outExtensions: () => ({
      js: '.min.js',
    }),
  },
]);
