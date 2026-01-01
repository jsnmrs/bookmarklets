const esbuild = require("esbuild");
const { rmSync, existsSync, readdirSync } = require("fs");
const { writeFile, readFile, mkdir } = require("fs").promises;
const netscape = require("netscape-bookmarks");
const { join } = require("path");

(async () => {
  await setup();
  const { bookmarklets, validationResults } = await buildBookmarklets();
  await exportBookmarklets();

  // Run validation and report results
  const { errors, warnings } = validationResults;
  reportValidation(errors, warnings);

  // Exit with error code if there are validation errors
  if (errors.length > 0) {
    process.exit(1);
  }
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
 * Check if a file is marked as a helper (not a bookmarklet).
 * Helper files are excluded from bookmarklet processing.
 */
function isHelperFile(source) {
  return /@helper\s+true/.test(source);
}

/**
 * Discover and parse all bookmarklet files from the bookmarklets directory.
 * Returns { bookmarklets, helpers } where helpers are non-bookmarklet JS files.
 */
async function discoverBookmarklets() {
  const bookmarkletDir = "bookmarklets";
  const files = readdirSync(bookmarkletDir).filter((f) => f.endsWith(".js"));

  const bookmarklets = [];
  const helpers = [];

  for (const file of files) {
    const source = await readFile(join(bookmarkletDir, file), "utf8");

    // Skip helper files (they're not bookmarklets)
    if (isHelperFile(source)) {
      helpers.push(file);
      continue;
    }

    const metadata = parseMetadata(source, file);

    if (metadata && metadata.bookmarklet) {
      bookmarklets.push(metadata);
    } else {
      console.warn(`Warning: ${file} is missing required metadata`);
    }
  }

  return { bookmarklets, helpers };
}

// Valid tag taxonomy
const VALID_CATEGORIES = ["accessibility", "diagnostic", "utility"];
const VALID_MODIFIERS = ["external"];
const WCAG_PATTERN = /^wcag:\d+\.\d+\.\d+$/;

/**
 * Validate a single tag against the taxonomy.
 * Returns null if valid, or an error message if invalid.
 */
function validateTag(tag) {
  if (VALID_CATEGORIES.includes(tag)) {
    return null;
  }
  if (VALID_MODIFIERS.includes(tag)) {
    return null;
  }
  if (WCAG_PATTERN.test(tag)) {
    return null;
  }
  return `Invalid tag "${tag}". Must be a category (${VALID_CATEGORIES.join(", ")}), modifier (${VALID_MODIFIERS.join(", ")}), or WCAG reference (wcag:X.X.X)`;
}

/**
 * Validate bookmarklets for completeness and consistency.
 * Returns errors (build-breaking) and warnings (informational).
 */
function validateBookmarklets(bookmarklets, allJsFiles, helpers) {
  const errors = [];
  const warnings = [];
  const bookmarkletDir = "bookmarklets";

  // Track which JS files have valid metadata or are helpers
  const filesWithMetadata = new Set(bookmarklets.map((b) => b.file));
  const helperFiles = new Set(helpers);

  // 1. Orphan detection: JS files without metadata (excluding helpers)
  for (const file of allJsFiles) {
    if (!filesWithMetadata.has(file) && !helperFiles.has(file)) {
      errors.push(`${file}: Missing required @bookmarklet metadata`);
    }
  }

  // 2. Validate each bookmarklet
  for (const bookmarklet of bookmarklets) {
    const { file } = bookmarklet;

    // Required fields check
    if (!bookmarklet.description) {
      warnings.push(`${file}: Missing @description`);
    }

    // Test page validation
    if (bookmarklet.pageTest === true) {
      const htmlFile = file.replace(/\.js$/, ".html");
      const htmlPath = join(bookmarkletDir, htmlFile);
      if (!existsSync(htmlPath)) {
        errors.push(`${file}: Has @pageTest true but missing ${htmlFile}`);
      }
    }

    // Optional fields warnings
    if (!bookmarklet.source) {
      warnings.push(`${file}: Missing @author`);
    }
    if (!bookmarklet.sourceUrl) {
      warnings.push(`${file}: Missing @authorUrl`);
    }
    if (!bookmarklet.tags || bookmarklet.tags.length === 0) {
      warnings.push(`${file}: Missing @tags`);
    } else {
      // Validate tag taxonomy
      let hasCategory = false;
      for (const tag of bookmarklet.tags) {
        const tagError = validateTag(tag);
        if (tagError) {
          warnings.push(`${file}: ${tagError}`);
        }
        if (VALID_CATEGORIES.includes(tag)) {
          hasCategory = true;
        }
      }
      if (!hasCategory) {
        warnings.push(`${file}: Missing category tag (${VALID_CATEGORIES.join(", ")})`);
      }
    }
    if (bookmarklet.pageTest === undefined) {
      warnings.push(`${file}: Missing @pageTest`);
    }
  }

  return { errors, warnings };
}

/**
 * Report validation results to console.
 */
function reportValidation(errors, warnings) {
  if (warnings.length > 0) {
    console.log("\n⚠️  Validation Warnings:");
    for (const warning of warnings) {
      console.log(`   ${warning}`);
    }
  }

  if (errors.length > 0) {
    console.log("\n❌ Validation Errors:");
    for (const error of errors) {
      console.log(`   ${error}`);
    }
    console.log("\nBuild failed due to validation errors.\n");
  } else if (warnings.length > 0) {
    console.log("\nBuild completed with warnings.\n");
  } else {
    console.log("\n✅ All validations passed.\n");
  }
}

async function buildBookmarklets() {
  const bookmarkletDir = "bookmarklets";

  // Get all JS files for validation
  const allJsFiles = readdirSync(bookmarkletDir).filter((f) => f.endsWith(".js"));

  // Auto-discover bookmarklets from JS files instead of reading from JSON
  const { bookmarklets: references, helpers } = await discoverBookmarklets();

  // Run validation
  const validationResults = validateBookmarklets(references, allJsFiles, helpers);

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

  return { bookmarklets: bookmarkletsJson, validationResults };
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
