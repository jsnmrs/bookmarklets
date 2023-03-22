import netscape from "netscape-bookmarks";
import * as fs from "fs";

const bookmarkletData = fs.readFileSync("data/bookmarklets.json"),
  bookmarklets = JSON.parse(bookmarkletData);
let bookmarks = {};
let html;

for (const bookmarklet of bookmarklets) {
  let code = bookmarklet.dist,
    title = bookmarklet.name;
  bookmarks[title] = code;
}

html = netscape(bookmarks);

// write bookmark HTML file to disk
fs.writeFile("data/bookmarks.html", html, "utf8", (err) => {
  if (err) {
    console.log(`Error writing file: ${err}`);
  } else {
    console.log(`File is written successfully!`);
  }
});
