#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseArgs(args) {
  const result = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--name" && args[i + 1]) {
      result.name = args[++i];
    } else if (args[i] === "--author" && args[i + 1]) {
      result.author = args[++i];
    } else if (args[i] === "--url" && args[i + 1]) {
      result.url = args[++i];
    } else if (args[i] === "--description" && args[i + 1]) {
      result.description = args[++i];
    } else if (args[i] === "--tags" && args[i + 1]) {
      result.tags = args[++i];
    }
  }
  return result;
}

function showUsage() {
  console.log(`
Usage: npm run new -- --name "Bookmarklet Name" [options]

Options:
  --name        Bookmarklet display name (required)
  --author      Author name
  --url         Author URL
  --description Brief description
  --tags        Comma-separated tags

Example:
  npm run new -- --name "Show Headings" --author "Jane Doe" --tags "accessibility"
`);
}

const args = parseArgs(process.argv.slice(2));

if (!args.name) {
  showUsage();
  process.exit(1);
}

const slug = toSlug(args.name);
const jsPath = path.join("bookmarklets", `${slug}.js`);
const htmlPath = path.join("bookmarklets", `${slug}.html`);

if (fs.existsSync(jsPath)) {
  console.error(`Error: ${jsPath} already exists`);
  process.exit(1);
}

if (fs.existsSync(htmlPath)) {
  console.error(`Error: ${htmlPath} already exists`);
  process.exit(1);
}

const jsContent = `/**
 * @bookmarklet ${args.name}
 * @description ${args.description || "TODO: Add description"}
 * @author ${args.author || "TODO: Add author"}
 * @authorUrl ${args.url || "TODO: Add author URL"}
 * @tags ${args.tags || "TODO: Add tags"}
 * @pageTest true
 */
(function () {
  // TODO: Implement bookmarklet
  console.log("${args.name} bookmarklet executed");
})();
`;

const htmlContent = `<section>
  <p>TODO: Add test content for ${args.name}</p>
</section>
`;

fs.writeFileSync(jsPath, jsContent);
fs.writeFileSync(htmlPath, htmlContent);

console.log(`Created ${jsPath}`);
console.log(`Created ${htmlPath}`);
console.log(`\nNext steps:`);
console.log(`  1. Edit ${jsPath} to implement the bookmarklet`);
console.log(`  2. Edit ${htmlPath} to add test content`);
console.log(`  3. Run 'npm start' to test locally`);
