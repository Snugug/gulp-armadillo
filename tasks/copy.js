'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var gutil = require('gulp-util'),
    fs = require('fs-extra'),
    browserSync = require('browser-sync');

//////////////////////////////
// Internal Vars
//////////////////////////////
var toCopy = {
  'fonts': [
    'fonts/**/*'
  ],
  'audio': [
    'audio/**/*'
  ],
  'videos': [
    'videos/**/*'
  ],
  'bower_components': [
    'bower_components/**/*'
  ]
}

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp) {

  //////////////////////////////
  // Encapsulate task in function to choose path to work on
  //////////////////////////////
  var CopyTask = function (path, folder) {
    return gulp.src(path)
      .pipe(gulp.dest('.www/' + folder + '/'))
      .pipe(browserSync.stream());
  }

  var copyTasks = [];
  Object.keys(toCopy).forEach(function (key) {
    copyTasks.push('copy:' + key);
  });

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('copy', copyTasks);

  //////////////////////////////
  // Dist Task
  //////////////////////////////
  gulp.task('copy:dist', function () {
    return gulp.src([
        '.www/**/*',
        '!.www/bower_components/**/*',
        '!.www/css/**/*',
        '!.www/js/**/*'
      ])
      .pipe(gulp.dest('.dist/'));
  });

  //////////////////////////////
  // All Tasks
  //////////////////////////////
  Object.keys(toCopy).forEach(function (key) {
    gulp.task('copy:' + key, function () {
      return CopyTask(toCopy[key], key === 'html' ? '.' : key);
    });
  });

  //////////////////////////////
  // Watch Task
  //////////////////////////////
  gulp.task('copy:watch', function () {
    Object.keys(toCopy).forEach(function (key) {
      if (key !== 'dist') {
        gulp.watch(toCopy[key])
          .on('change', function (event) {
            // Add absolute and relative (to Gulpfile) paths
            event.path = {
              absolute: event.path,
              relative: event.path.replace(__dirname.replace('/tasks', '') + '/', '')
            }

            // Notify user of the change
            gutil.log('File ' + gutil.colors.magenta(event.path.relative) + ' was ' + event.type);


            if (event.type === 'deleted') {
              fs.removeSync('.www/' + event.path.relative);
              return;
            }

            // Call the task
            return CopyTask(event.path.absolute, key === 'html' ? '.' : key);
          });
      }
    });
  });
}
