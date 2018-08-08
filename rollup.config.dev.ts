import precss from 'precss';
import autoprefixer from 'autoprefixer';
import serve from 'rollup-plugin-serve';
import postcss from 'rollup-plugin-postcss';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import typescript from 'rollup-plugin-typescript2';
import sourceMaps from 'rollup-plugin-sourcemaps';
import nodeResolve from 'rollup-plugin-node-resolve';
import html from 'rollup-plugin-generate-html-template';

// Pwd: <PROJECT_ROOT>
// Exec: rollup.config.dev.js

// Example directory.
const example: string = 'example';

// Tmp directory.
const tmp: string = 'tmp/reload';

// Dev config.
// tslint:disable-next-line: no-default-export
export default {
  // Bundle entry.
  input: `${example}/index.ts`,

  // Bundle output.
  output: {
    // Output file.
    file: `${tmp}/index.js`,

    // Bundle format.
    format: 'iife',

    // IIFE export name.
    name: 'Demo',

    // Source map.
    sourcemap: true
  },

  // Skip tree-shaking.
  treeshake: false,

  // External plugins.
  plugins: [
    // Convert CommonJS modules to ES6, so they
    // can be included in a Rollup bundle.
    commonjs(),

    // Locate modules using the Node resolution algorithm,
    // for using third party modules in node_modules.
    nodeResolve(),

    // Convert next generation CSS to compatible version
    // and automate routine CSS operations.
    postcss({
      plugins: [precss(), autoprefixer()]
    }),

    // Convert TS strict syntactical superset of JavaScript
    // to plain browser compatible JS.
    typescript({
      cacheRoot: 'tmp/.ts_cache',
      tsconfigOverride: {
        compilerOptions: {
          target: 'es5',
          sourcemap: true
        }
      }
    }),

    // Retrieve source map.
    sourceMaps(),

    // Auto-inject the resulting rollup bundle
    // via a script tag into a HTML template.
    html({
      template: `${example}/index.html`
    }),

    // Serve by dev-server.
    serve({
      contentBase: [tmp]
    }),

    // Reload changes.
    livereload({
      watch: tmp
    })
  ]
};
