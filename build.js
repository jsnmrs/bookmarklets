import * as esbuild from "esbuild";
import bookmarkletPlugin from "esbuild-plugin-bookmarklet"

esbuild.build({
  entryPoints: ['src/alt-text.js', 'src/strip-onpaste.js'], // points to normal javascript
  bundle: true,
  minify: true,
  write: false,
  outdir: 'dist/',
  format: 'iife',
  plugins: [bookmarkletPlugin]
})
