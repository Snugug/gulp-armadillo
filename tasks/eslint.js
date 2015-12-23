'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var gutil = require('gulp-util'),
    eslint = require('gulp-eslint'),
    ifElse = require('gulp-if-else'),
    browserSync = require('browser-sync');

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp, config) {
  // Set value of paths to either the default or user entered
  var EslintPaths = [
    config.folders.javascript + '/**/*.js',
    '!' + config.folders.javascript + '/**/*.min.js'
  ];

  //////////////////////////////
  // Encapsulate task in function to choose path to work on
  //////////////////////////////
  var EslintTask = function (path, fail) {
    return gulp.src(EslintPaths)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(ifElse(fail === true, eslint.failOnError))
      .pipe(gulp.dest(config.folders.server + '/' + config.folders.javascript + '/'))
      .pipe(browserSync.stream());
  }

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('eslint', function () {
    return EslintTask(EslintPaths, true);
  });

  //////////////////////////////
  // Watch Task
  //////////////////////////////
  gulp.task('eslint:watch', function () {
    return gulp.watch(EslintPaths)
      .on('change', function (event) {
        // Add absolute and relative (to Gulpfile) paths
        event.path = {
          absolute: event.path,
          relative: event.path.replace(__dirname.replace('/tasks', '') + '/', '')
        }

        // Notify user of the change
        gutil.log('File ' + gutil.colors.magenta(event.path.relative) + ' was ' + event.type);

        // Call the task
        return EslintTask(event.path.absolute, false);
      });
  });
}
