module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/**/*.js");

  eleventyConfig.setBrowserSyncConfig({
    online: false,
  });

  return {
    dir: {
      input: "./",
      output: "./_site",
    },
  };
};
