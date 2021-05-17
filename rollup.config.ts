import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    { file: 'dist/umd/index.umd.js', name: 'serverWorkflowSdk', format: 'umd', sourcemap: true },
    {
      file: 'dist/umd/index.umd.min.js',
      name: 'serverWorkflowSdk',
      format: 'umd',
      sourcemap: true,
      plugins: [terser()],
    },
    { file: 'dist/esm/index.esm.js', format: 'es', sourcemap: true },
    { file: 'dist/esm/index.esm.min.js', format: 'es', sourcemap: true, plugins: [terser()] },
    { file: 'dist/systemjs/index.systemjs.js', format: 'system', sourcemap: true },
    { file: 'dist/systemjs/index.systemjs.min.js', format: 'system', sourcemap: true, plugins: [terser()] },
  ],
  plugins: [json(), typescript({ useTsconfigDeclarationDir: true }), commonjs(), resolve(), sourceMaps()],
};
