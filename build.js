import * as esbuild from "esbuild";
import bookmarkletPlugin from "esbuild-plugin-bookmarklet";

/* Option A 
Create an esbuild build for each bookmarklet you want to create
*/

esbuild.build({
  entryPoints: ["src/alt-text.js"], // points to normal javascript
  bundle: true,
  minify: true,
  outdir: "dist",
  write: false,
  format: "iife",
  plugins: [bookmarkletPlugin],
});

esbuild.build({
  entryPoints: ["src/strip-onpaste.js"], // points to normal javascript
  bundle: true,
  minify: true,
  outdir: "dist",
  write: false,
  format: "iife",
  plugins: [bookmarkletPlugin],
});

/* Option B - Loop through src folder and automatically create esbuild config for each bookmarklet

import {readdirSync} from "fs";

// You may need to create a repeatable pattern for each bookmarket's entrypoint file
// For example `strip-onpaste.js` could be `bookmarklet-strip-onpaste.js` and then update the filter below to check that the file begins with `bookmarklet-`
// Otherwise this will bundle the "alt-text-node.js" file into it's only file as well
const bookmarklets = readdirSync("src").filter((file) => file.endsWith(".js"));

for (const bookmarklet of bookmarklets) {
  esbuild.build({
    entryPoints: ["src/" + bookmarklet],
    bundle: true,
    minify: true,
    outdir: "dist",
    write: false,
    format: "iife",
    plugins: [bookmarkletPlugin],
  });
}
*/
