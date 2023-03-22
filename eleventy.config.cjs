module.exports = function (eleventyConfig) {
  eleventyConfig.addLayoutAlias("page", "layouts/page.html");
  eleventyConfig.addLayoutAlias("test", "layouts/test.html");
  eleventyConfig.addPassthroughCopy("bookmarklets/*");
  eleventyConfig.addPassthroughCopy("data/*");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("favicon.svg");

  eleventyConfig.setBrowserSyncConfig({
    online: false,
  });

  return {
    dir: {
      data: "data",
      input: "./",
      output: "./_site",
    },
    pathPrefix: "/bookmarklets",
  };
};
