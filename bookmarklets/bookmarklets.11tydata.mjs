import path from "path";

export default {
  layout: "test",
  eleventyComputed: {
    file: (data) => {
      const basename = path.basename(data.page.inputPath, ".html");
      return `${basename}.js`;
    },
    permalink: (data) => {
      const basename = path.basename(data.page.inputPath, ".html");
      return `/${basename}/`;
    },
    title: (data) => {
      const file = `${path.basename(data.page.inputPath, ".html")}.js`;
      const bookmarklet = data.bookmarklets?.find((b) => b.file === file);
      return bookmarklet?.bookmarklet || "";
    },
  },
};
