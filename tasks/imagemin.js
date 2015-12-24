'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var gutil = require('gulp-util'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync');

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp, config) {
  // Set value of paths to either the default or user entered
  var ImageminPaths = [
    config.folders.images + '/**/*'
  ];
  var imageminSettings = config.options.imagemin;

  //////////////////////////////
  // Encapsulate task in function to choose path to work on
  //////////////////////////////
  var ImageminTask = function (path) {
    return gulp.src(ImageminPaths)
      .pipe(gulp.dest(config.folders.server + '/' + config.folders.images + '/'))
      .pipe(browserSync.stream());
  }

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('imagemin', function () {
    return ImageminTask(ImageminPaths);
  });

  //////////////////////////////
  // Dist Task
  //////////////////////////////
  gulp.task('imagemin:dist', function () {
    return gulp.src(ImageminPaths)
      .pipe(imagemin(imageminSettings))
      .pipe(gulp.dest(config.folders.output + '/' + config.folders.images + '/'));
  });

  //////////////////////////////
  // Watch Task
  //////////////////////////////
  gulp.task('imagemin:watch', function () {
    return gulp.watch(ImageminPaths)
      .on('change', function (event) {
        // Add absolute and relative (to Gulpfile) paths
        event.path = {
          absolute: event.path,
          relative: event.path.replace(__dirname.replace('/tasks', '') + '/', '')
        }

        // Notify user of the change
        gutil.log('File ' + gutil.colors.magenta(event.path.relative) + ' was ' + event.type);

        // Call the task
        return ImageminTask(event.path.absolute);
      });
  });
}
