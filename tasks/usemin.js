'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    bowerDirectory = require('bower-directory'),
    path = require('path'),
    gulpif = require('gulp-if');

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp, config) {
  // Set value of paths to either the default or user entered
  var bower = path.relative(process.cwd(), bowerDirectory.sync());
  var UseminPaths = [
    config.folders.server + '/**/*.html',
    '!' + config.folders.server + '/' + config.folders[bower] + '/**/*'
  ];

  console.log(UseminPaths);

  //////////////////////////////
  // Encapsulate task in function to choose path to work on
  //////////////////////////////
  var UseminTask = function (path) {
    return gulp.src(path)
      .pipe(useref({
        'searchPath': config.folders.server
      }))
      .pipe(gulpif('*.js', uglify()))
      .pipe(gulpif('*.css', minifyCSS()))
      .pipe(gulp.dest( config.folders.output + '/'));
  }

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('usemin', function () {
    return UseminTask(UseminPaths);
  });
}
