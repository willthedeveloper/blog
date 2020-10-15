module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("src/assets/fonts");
	eleventyConfig.addPassthroughCopy("src/assets/img");

	return {
		dir: {
			input: "src",
		},
		filePassthroughCopy: true,
	};
};
