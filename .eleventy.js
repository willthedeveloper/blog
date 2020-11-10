const embedYouTube = require("eleventy-plugin-youtube-embed");

module.exports = function (eleventyConfig) {
	// Make dates local timezone
	eleventyConfig.addLiquidFilter("toUTC", function (date) {
		return `${date.getUTCMonth() + 1}-${date.getUTCDate()}-${date.getUTCFullYear()}`;
	});

	// Embeddable YouTube videos
	eleventyConfig.addPlugin(embedYouTube);

	// Copy image assets to build
	eleventyConfig.addPassthroughCopy("src/assets/img");
	eleventyConfig.addPassthroughCopy("src/posts/**/*.jpg");

	return {
		dir: {
			input: "src"
		},
		filePassthroughCopy: true
	};
};
