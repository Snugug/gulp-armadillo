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
module.exports = function (gulp, UseminPaths, options) {
  // Set value of paths to either the default or user entered
  UseminPaths = UseminPaths || toUsemin;

  //////////////////////////////
  // Encapsulate task in function to choose path to work on
  //////////////////////////////
  var UseminTask = function (path) {
    return gulp.src(path)
      .pipe(useref({
        'searchPath': '.www'
      }))
      .pipe(gulpif('*.js', uglify()))
      .pipe(gulpif('*.css', minifyCSS()))
      .pipe(gulp.dest('.dist/'));
  }

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('usemin', function () {
    return UseminTask(UseminPaths);
  });
}
