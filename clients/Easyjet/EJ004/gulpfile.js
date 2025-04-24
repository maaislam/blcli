const gulp = require("gulp");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const babelify = require("babelify");
const uglify = require("gulp-uglify");
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const nodemon = require('gulp-nodemon');
const folder = 'CRO-143-WORLDWIDE-FLIGHTS-IN-CALENDAR';
const jsFile = 'variant_1_homepage.js';

function buildJSFiles() {
	return browserify({
		entries: [`${folder}/js/${jsFile}`],
		transform: [babelify.configure({ presets: ["@babel/preset-env"] })],
		debug: true
	})
		.bundle()
		.pipe(source(`${jsFile}`))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest(`${folder}/dist/js`));
};

function buildSCSSFiles() {
	return gulp
		.src(`${folder}/scss/**/*.scss`)
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(autoprefixer({
						overrideBrowserslist: [
							'> 1%'
						]
					}))
		.pipe(gulp.dest(`${folder}/dist/css`));
};

function runIndex() {
	return nodemon({
			script: 'index.js'
		  })
};

function browsersyncServe(){
	browserSync.init({
    	port: 3000,
    	proxy: "https://www.easyjet.com/en/",
    	serveStatic: [`${folder}`],
    	snippetOptions: {
        	rule: {
           	 	match: /<\/head>/i,
            	fn: function (snippet, match) {
                	return `<script src="https://localhost:3000/dist/js/${jsFile}"></script>` + '<link rel="stylesheet" type="text/css" href="https://localhost:3000/dist/css/style.css"/>' + snippet + match;
            	}
        	}
    	}
	});
};

function watchFiles(){
	gulp.watch(`${folder}/scss/**/*`, gulp.series(buildSCSSFiles)).on('change', browserSync.reload);
	gulp.watch(`${folder}/js/*`, gulp.series(buildJSFiles)).on('change', browserSync.reload);
};

// Run using gulp or gulp build
exports.default = exports.build = gulp.series(
	// cleanup,
	gulp.parallel(buildJSFiles, buildSCSSFiles, browsersyncServe, watchFiles)
);

// Tasks left to covert to gulp 4 function
// function cleanup() {
// 	// return del([paths.build]);
// 	return del([`${folder}/dist/css`])
// }

// gulp.task('clean:css', () => {
// 	return del([`${folder}/dist/css`])
// });

// gulp.task('clean:js', () => {
//   	return del([`${folder}/dist/js`]);
// });
