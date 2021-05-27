import pkg from './package.json';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/js/index.js',
    output: [
      {
        file: 'src/js.min.js',
        format: 'cjs',
      },
    ],
    external: [...Object.keys(pkg.dependencies || {})],
    plugins: [terser()],
  },
];
