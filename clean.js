import * as fs from "fs";

fs.rmSync("dist", { recursive: true, force: true });
fs.rmSync("_site", { recursive: true, force: true });
