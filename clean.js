import * as fs from "fs";

fs.rmSync("_site", { recursive: true, force: true });
