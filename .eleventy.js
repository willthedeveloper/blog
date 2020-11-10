module.exports = function (eleventyConfig) {
	// Make dates local timezone
	eleventyConfig.addLiquidFilter("toUTC", function(date) {
		return `${date.getUTCMonth() + 1}-${date.getUTCDay() - 1}-${date.getUTCFullYear()}`;
	});

	// Build
	eleventyConfig.addPassthroughCopy("src/assets/fonts");
	eleventyConfig.addPassthroughCopy("src/assets/img");

	return {
		dir: {
			input: "src",
		},
		filePassthroughCopy: true,
	};
};
