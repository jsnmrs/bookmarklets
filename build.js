import * as fs from "fs";

const referenceData = fs.readFileSync("data/references.json"),
  references = JSON.parse(referenceData),
  dist = "./dist/";
let data = [];

references.forEach((reference) => {
  let distPath = dist + reference.file;
  const code = fs.readFileSync(distPath, "utf-8");

  data.push({
    name: reference.name,
    src: reference.file,
    dist: code,
  });
});

// write bookmarklet JSON file to disk
fs.writeFileSync(
  "data/bookmarklets.json",
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
