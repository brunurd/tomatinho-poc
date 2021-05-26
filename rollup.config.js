import pkg from './package.json';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/js/main.js',
    output: [
      {
        file: 'src/js.min.js',
      },
    ],
    external: [...Object.keys(pkg.dependencies || {})],
    plugins: [terser()],
  },
];
