import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  output: [
    { file: 'dist/cjs/index.cjs', exports: 'named', format: 'cjs', sourcemap: true },
    { file: 'dist/esm/index.js', format: 'es', sourcemap: true },
    { file: 'dist/umd/index.umd.js', name: 'serverWorkflowSdk', format: 'umd', sourcemap: true },
    {
      file: 'dist/umd/index.umd.min.js',
      name: 'serverWorkflowSdk',
      format: 'umd',
      sourcemap: true,
      plugins: [terser()],
    },
  ],
  plugins: [json(), typescript({ useTsconfigDeclarationDir: true }), commonjs(), resolve(), sourceMaps()],
};
