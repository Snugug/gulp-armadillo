'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    minifyCSS = require('gulp-minify-css'),
    gulpif = require('gulp-if');

//////////////////////////////
// Internal Vars
//////////////////////////////
var toUsemin = [
  '.www/**/*.html',
  '!.www/bower_components/**/*'
];

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp, UseminPaths) {
  // Set value of paths to either the default or user entered
  UseminPaths = UseminPaths || toUsemin;

  //////////////////////////////
  // Encapsulate task in function to choose path to work on
  //////////////////////////////
  var UseminTask = function (path) {
    var assets = useref.assets();

    return gulp.src(path)
      .pipe(assets)
      .pipe(gulpif('*.js', uglify()))
      .pipe(gulpif('*.css', minifyCSS()))
      .pipe(assets.restore())
      .pipe(useref())
      .pipe(gulp.dest('.dist/'));
  }

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('usemin', function () {
    return UseminTask(UseminPaths);
  });
}
