const esbuild = require("esbuild");
const { rmSync, existsSync, readdirSync } = require("fs");
const { writeFile, readFile, mkdir } = require("fs").promises;
const netscape = require("netscape-bookmarks");
const { join } = require("path");

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

/**
 * Parse JSDoc-style metadata from a bookmarklet source file.
 * Expected format:
 * /**
 *  * @bookmarklet Name of bookmarklet
 *  * @description What it does
 *  * @author Author name
 *  * @authorUrl https://example.com
 *  * @tags tag1, tag2
 *  * @auditing true
 *  * @pageTest true
 *  *\/
 */
function parseMetadata(source, filename) {
  const metadata = {
    file: filename,
  };

  // Match the JSDoc block at the start of the file
  const jsdocMatch = source.match(/^\/\*\*[\s\S]*?\*\//);
  if (!jsdocMatch) {
    return null;
  }

  const jsdoc = jsdocMatch[0];

  // Parse each @tag
  const tagPatterns = {
    bookmarklet: /@bookmarklet\s+(.+?)(?:\n|\*\/)/,
    description: /@description\s+(.+?)(?:\n|\*\/)/,
    author: /@author\s+(.+?)(?:\n|\*\/)/,
    authorUrl: /@authorUrl\s+(.+?)(?:\n|\*\/)/,
    tags: /@tags\s+(.+?)(?:\n|\*\/)/,
    auditing: /@auditing\s+(.+?)(?:\n|\*\/)/,
    pageTest: /@pageTest\s+(.+?)(?:\n|\*\/)/,
  };

  for (const [key, pattern] of Object.entries(tagPatterns)) {
    const match = jsdoc.match(pattern);
    if (match) {
      let value = match[1].replace(/\s*\*\s*$/, "").trim();

      // Convert to appropriate types
      if (key === "tags") {
        metadata.tags = value.split(",").map((t) => t.trim());
      } else if (key === "auditing") {
        metadata.auditing = value === "true";
      } else if (key === "pageTest") {
        if (value === "true") {
          metadata.pageTest = true;
        } else if (value === "false") {
          metadata.pageTest = false;
        } else {
          metadata.pageTest = value; // For "self" or other string values
        }
      } else if (key === "author") {
        metadata.source = value;
      } else if (key === "authorUrl") {
        metadata.sourceUrl = value;
      } else {
        metadata[key] = value;
      }
    }
  }

  return metadata;
}

/**
 * Discover and parse all bookmarklet files from the bookmarklets directory.
 */
async function discoverBookmarklets() {
  const bookmarkletDir = "bookmarklets";
  const files = readdirSync(bookmarkletDir).filter((f) => f.endsWith(".js"));

  const bookmarklets = [];

  for (const file of files) {
    const source = await readFile(join(bookmarkletDir, file), "utf8");
    const metadata = parseMetadata(source, file);

    if (metadata && metadata.bookmarklet) {
      bookmarklets.push(metadata);
    } else {
      console.warn(`Warning: ${file} is missing required metadata`);
    }
  }

  return bookmarklets;
}

async function buildBookmarklets() {
  // Auto-discover bookmarklets from JS files instead of reading from JSON
  const references = await discoverBookmarklets();

  const bookmarkletsJson = await Promise.all(
    references.map(esbuildBookMarklet)
  );

  bookmarkletsJson.sort((a, b) => a.file.localeCompare(b.file));
  const favorites = bookmarkletsJson.filter((d) => d.auditing === true);

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

  try {
    await writeFile(
      "data/auditing.json",
      JSON.stringify(favorites, null, 2),
      "utf8"
    );
    console.log("Saved data/auditing.json!");
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
  const bookmarklets = JSON.parse(await readFile("data/bookmarklets.json")),
    auditingBookmarklets = JSON.parse(await readFile("data/auditing.json"));

  let bookmarks = {},
    auditing = {};

  for (const { dist, bookmarklet } of bookmarklets) {
    bookmarks[bookmarklet] = dist;
  }

  for (const { dist, bookmarklet } of auditingBookmarklets) {
    auditing[bookmarklet] = dist;
  }

  const html = netscape(bookmarks),
    auditHtml = netscape(auditing);

  // write bookmark HTML file to disk
  try {
    await writeFile("data/bookmarks.html", html, "utf8");
    console.log(`Saved data/bookmarks.html!`);
  } catch (err) {
    console.log(`Error writing file: ${err}`);
  }

  try {
    await writeFile("data/auditing.html", auditHtml, "utf8");
    console.log(`Saved data/auditing.html!`);
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
