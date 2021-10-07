
const cleanCSS = require("gulp-clean-css");
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass")(require('sass'));
// const uglify = require("gulp-uglify");
const sassGlob = require("gulp-sass-glob");
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync');

// CSS task
function css() {
	return gulp
		.src("stgwww.kohnan-eshop.com/css/**/*.scss", { sourcemaps: true })
		.pipe(sassGlob())
		.pipe(plumber({
			errorHandler: function (err) {
				console.log(err.messageFormatted);
				this.emit('end');
			}
		}))
		.pipe(sass({
			outputStyle: "expanded"
		}))
		.pipe(postcss([autoprefixer({
			cascade: false
		})]))
		.on("error", sass.logError)
		.pipe(cleanCSS())
		.pipe(gulp.dest("stgwww.kohnan-eshop.com/css/", { sourcemaps: '/' }))
}

// JS task
// function js() {
// 	return gulp
// 		.src([
// 			'./js/*.js',
// 			'!./js/*.min.js'
// 		])
// 		.pipe(uglify())
// 		.pipe(gulp.dest('../src/js'))
// 		.pipe(browsersync.stream());
// }

// Tasks
gulp.task("css", css);
// gulp.task("js", js);

// BrowserSync
function browser_Sync(done) {
	// browserSync.init({
	// 	proxy: "stgwww.kohnan-eshop.com/index.html"
	// });
	// done();
}

// BrowserSync Reload
function browserSyncReload(done) {
	browserSync.reload();
	done();
}
// gulp.task("ejs", function () {
// 	return gulp.src(["ejs/**/*.ejs", '!' + "ejs/**/_*.ejs"])
// 		.pipe(ejs({}, {}, { ext: '.html' }))
// 		.pipe(rename({ extname: ".html" }))
// 		.pipe(gulp.dest("../"));
// });
// Watch files
function watchFiles() {
	gulp.watch("stgwww.kohnan-eshop.com/css/**/*scss", css);
	// gulp.watch("../build/ejs/**/*.ejs", gulp.series("ejs"));
	// gulp.watch(["../build/js/**/*.js", "!./js/*.min.js"], js);
	gulp.watch("../**/*.html", browserSyncReload);
}


// dev task
gulp.task("default", gulp.parallel(watchFiles, browser_Sync));
