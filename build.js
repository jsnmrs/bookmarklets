import * as esbuild from "esbuild";
import { rmSync, existsSync } from "fs";
import { writeFile, readFile, mkdir } from "fs/promises";
import netscape from "netscape-bookmarks";
import { join } from "path";

(async () => {
  await setup();
  await buildBookmarklets();
  await exportBookmarklets();
})();

async function setup() {
  rmSync("dist", { recursive: true, force: true });
  rmSync("_site", { recursive: true, force: true });

  const dist = "./dist/";

  if (!existsSync(dist)) {
    await mkdir(dist);
  }
}

async function buildBookmarklets() {
  const references = JSON.parse(
    await readFile("data/bookmarklets.json", "utf8")
  );
  const bookmarkletsJson = await Promise.all(
    references.map(esbuildBookMarklet)
  );

  bookmarkletsJson.sort((a, b) => a.bookmarklet.localeCompare(b.bookmarklet));

  try {
    await writeFile(
      "data/bookmarklets.json",
      JSON.stringify(bookmarkletsJson, null, 2),
      "utf8"
    );
    console.log("Saved data/bookmarklets.json!");
  } catch (err) {
    console.error(err);
  }
}

async function esbuildBookMarklet(bookmarklet) {
  const result = await esbuild.build({
    entryPoints: [join("bookmarklets", bookmarklet.file)],
    bundle: true,
    minify: true,
    outdir: "dist",
    write: false,
    format: "iife",
    plugins: [esbuildBookmarkPlugin],
    allowOverwrite: true,
  });

  const { outputFiles, errors } = result;

  if (errors.length) {
    throw Error(errors);
  }

  const outputFile = outputFiles[0];
  const decoder = new TextDecoder();
  const dist = decoder.decode(outputFile.contents);
  return {
    ...bookmarklet,
    dist,
  };
}

async function exportBookmarklets() {
  const bookmarklets = JSON.parse(await readFile("data/bookmarklets.json"));

  let bookmarks = {};
  for (const { dist, bookmarklet } of bookmarklets) {
    bookmarks[bookmarklet] = dist;
  }

  const html = netscape(bookmarks);

  // write bookmark HTML file to disk
  try {
    await writeFile("data/bookmarks.html", html, "utf8");
    console.log(`Saved data/bookmarks.html!`);
  } catch (err) {
    console.log(`Error writing file: ${err}`);
  }
}

const esbuildBookmarkPlugin = {
  name: "bookmarklet",
  setup(build) {
    build.onEnd(async (result) => {
      const encoder = new TextEncoder();
      const js = result.outputFiles.find((f) => f.path.match(/\.js$/));
      const modified = encodeURI("javascript:void " + js.text);
      js.contents = encoder.encode(modified);
      await writeFile(js.path, js.text);
      return;
    });
  },
};
