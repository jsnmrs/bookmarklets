import * as esbuild from "esbuild";
import bookmarkletPlugin from "esbuild-plugin-bookmarklet";
import glob from "glob";

esbuild.build({
  stdin: { contents: "" },
  inject: glob.sync("src/*.js"),
  bundle: true,
  minify: true,
  write: false,
  outdir: 'dist',
  format: 'iife',
  plugins: [bookmarkletPlugin]
})
