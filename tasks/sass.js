'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    ifElse = require('gulp-if-else'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync');

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp, config) {
  // Set value of paths to either the default or user entered
  var SassPaths = [
    config.folders.sass + '/**/*.sass',
    config.folders.sass + '/**/*.scss'
  ];
  var sassSettings = config.options.sass;

  //////////////////////////////
  // Encapsulate task in function to choose path to work on
  //////////////////////////////
  var SassTask = function (path, fail) {
    return gulp.src(SassPaths)
      .pipe(ifElse(fail === true, function () {
        return sass(sassSettings);
      }, function () {
        return sass(sassSettings).on('error', sass.logError);
      }))
      .pipe(autoprefixer({
        cascade: false
      }))
      .pipe(gulp.dest(config.folders.server + '/' + config.folders.css + '/'))
      .pipe(browserSync.stream());
  }

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('sass', function () {
    return SassTask(SassPaths, true);
  });

  //////////////////////////////
  // Watch Task
  //////////////////////////////
  gulp.task('sass:watch', function () {
    return gulp.watch(SassPaths)
      .on('change', function (event) {
        // Add absolute and relative (to Gulpfile) paths
        event.path = {
          absolute: event.path,
          relative: event.path.replace(__dirname.replace('/tasks', '') + '/', '')
        }

        // Notify user of the change
        gutil.log('File ' + gutil.colors.magenta(event.path.relative) + ' was ' + event.type);

        // Call the task
        return SassTask(event.path.absolute, false);
      });
  });
}
