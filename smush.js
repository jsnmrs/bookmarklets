import * as esbuild from "esbuild";
import bookmarkletPlugin from "esbuild-plugin-bookmarklet";
import * as fs from "fs";

const referenceData = fs.readFileSync("data/references.json"),
  references = JSON.parse(referenceData),
  dist = "./dist/";

if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist);
}

references.forEach((reference) => {
  esbuild.build({
    entryPoints: ["bookmarklets/" + reference.file],
    bundle: true,
    minify: true,
    outdir: "dist",
    write: false,
    format: "iife",
    plugins: [bookmarkletPlugin],
    allowOverwrite: true,
  });
});
