const gulp = require("gulp");
const sass = require("gulp-sass");
const fs = require("fs-extra");

gulp.task("clean", async function () {
	await fs.remove("_site");
	console.log("Removed _site.");
});

// "https://www.hawksworx.com/blog/keeping-sass-simple-and-speedy-on-eleventy/
gulp.task("css", function () {
	return gulp
		.src("./src/scss/main.scss")
		.pipe(
			sass({
				outputStyle: "compressed"
			}).on("error", sass.logError)
		)
		.pipe(gulp.dest("./src/_includes/css"));
});

// Watches SCSS
gulp.task("watch", function () {
	gulp.watch("./src/scss/**/*.scss", gulp.parallel("css"));
});

// Build SCSS once
gulp.task("build", gulp.series("clean", "css"));