import * as esbuild from "esbuild";
import bookmarkletPlugin from "esbuild-plugin-bookmarklet";
import {readdirSync} from "fs";

// Using "bookmarklet-" prefix to allow JS reuse
const bookmarklets = readdirSync("src").filter((file) => file.startsWith("bookmarklet-"));

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
