module.exports = function (eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/assets");

  // Watch targets
  eleventyConfig.addWatchTarget("src/css/");
  eleventyConfig.addWatchTarget("src/js/");

  return {
    dir: {
      input: "pages",
      includes: "../_includes",
      data: "../_data",
      output: "_site"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
