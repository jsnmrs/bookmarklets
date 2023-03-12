import * as esbuild from "esbuild";
import bookmarkletPlugin from "esbuild-plugin-bookmarklet";
import { readdirSync } from "fs";
import * as fs from "fs";

// Using "bookmarklet-" prefix to allow JS reuse
const bookmarklets = readdirSync("src").filter((file) =>
  file.startsWith("bookmarklet-")
);

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

// Write JSON date from output
const bookmarkletData = readdirSync("dist").filter((file) =>
  file.endsWith(".js")
);
let data = [];

for (const bookmarkletItem of bookmarkletData) {
  let distPath = "dist/" + bookmarkletItem;
  const file = fs.readFileSync(distPath, "utf-8");
  // reformat file name to be more readable
  data.push({
    name: bookmarkletItem
      .replace("bookmarklet-", "")
      .replaceAll("-", " ")
      .replace(".js", ""),
    title: bookmarkletItem,
    code: file,
  });
}

// write file to disk
fs.writeFile(
  "_data/bookmarklets.json",
  JSON.stringify(data, null, 2),
  "utf8",
  (err) => {
    if (err) {
      console.log(`Error writing file: ${err}`);
    } else {
      console.log(`File is written successfully!`);
    }
  }
);
