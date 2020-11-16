const embedYouTube = require("eleventy-plugin-youtube-embed");

module.exports = function (eleventyConfig) {
	// Liquid options
	eleventyConfig.setLiquidOptions({
		dynamicPartials: true,
		strict_filters: true
	});

	// Make dates local timezone
	eleventyConfig.addLiquidFilter("toUTC", function (date) {
		return `${date.getUTCMonth() + 1}-${date.getUTCDate()}-${date.getUTCFullYear()}`;
	});

	// Embeddable YouTube videos
	eleventyConfig.addPlugin(embedYouTube);

	// Copy image assets to build
	eleventyConfig.addPassthroughCopy("src/assets/img");
	eleventyConfig.addPassthroughCopy("src/posts/**/*.jpg");
	eleventyConfig.addPassthroughCopy("src/posts/**/*.png");

	return {
		dir: {
			input: "src"
		},
		filePassthroughCopy: true
	};
};
