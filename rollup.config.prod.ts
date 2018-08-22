import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import nodeResolve from 'rollup-plugin-node-resolve';
import autoExternal from 'rollup-plugin-auto-external';

// Pwd: <PROJECT_ROOT>
// Exec: rollup.config.prod.js

// Package config.
// tslint:disable-next-line: no-require-imports no-var-requires
const pkg: any = require('./package.json');

// Prod config.
// tslint:disable-next-line: no-default-export
export default [
  {
    // Bundle entry.
    input: pkg.config.entry,

    // Bundle output.
    output: [
      {
        // Output file.
        file: pkg.main,

        // UMD export name.
        name: pkg.config.name,

        // Bundle format.
        format: 'umd',

        // Source map.
        sourcemap: true,

        // Global libs.
        globals: {
          jquery: 'jQuery',
          handsontable: 'Handsontable'
        }
      }
    ],

    // External plugins.
    plugins: [
      // Convert CommonJS modules to es2015, so they
      // can be included in a Rollup bundle.
      commonjs(),

      // Locate modules using the Node resolution algorithm,
      // for using third party modules in node_modules.
      nodeResolve(),

      // Automatically exclude package.json dependencies
      // and peerDependencies from bundle.
      autoExternal(),

      // Convert TS strict syntactical superset of JavaScript
      // to plain browser compatible JS.
      typescript({
        cacheRoot: 'temporary/.ts_cache',
        tsconfig: './tsconfig.prod.json',
        useTsconfigDeclarationDir: true
      }),

      // Retrieve source maps.
      sourceMaps()
    ]
  }
];
