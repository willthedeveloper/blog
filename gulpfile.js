const gulp = require("gulp");
const sass = require("gulp-sass");

// https://www.hawksworx.com/blog/keeping-sass-simple-and-speedy-on-eleventy/
// a task to generate the css with sass
gulp.task("css", function () {
	return gulp
		.src("./src/scss/main.scss")
		.pipe(
			sass({
				outputStyle: "compressed",
			}).on("error", sass.logError)
		)
		.pipe(gulp.dest("./src/_includes/css"));
});

gulp.task("watch", function () {
	gulp.watch("./src/scss/**/*.scss", gulp.parallel("css"));
});

gulp.task("build", gulp.parallel("css"));
