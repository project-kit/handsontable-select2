import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import nodeResolve from 'rollup-plugin-node-resolve';
import autoExternal from 'rollup-plugin-auto-external';

// Pwd: <PROJECT_ROOT>
// Exec: rollup.config.prod.js

// Package config.
const pkg = require('./package.json');

// Prod config.
export default [
  {
    // Bundle entry.
    input: pkg.config.entry,

    // Bundle output.
    output: [
      {
        // Output location.
        file: pkg.main,

        // Representing iife/umd.
        name: 'HTSelect2',

        // Format of the bundle.
        format: 'umd',

        // Source map.
        sourcemap: true,

        // Global libraries.
        globals: {
          jquery: 'jQuery',
          handsontable: 'Handsontable'
        }
      },
      {
        // Output location.
        file: pkg.module,

        // Format of the bundle.
        format: 'es',

        // Source map.
        sourcemap: true
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
        cacheRoot: 'tmp/.ts_cache',
        tsconfig: './tsconfig.prod.json',
        useTsconfigDeclarationDir: true
      }),

      // Resolve source maps.
      sourceMaps()
    ]
  }
];
