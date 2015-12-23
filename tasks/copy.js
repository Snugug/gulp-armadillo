'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var gutil = require('gulp-util'),
    fs = require('fs-extra'),
    bowerDirectory = require('bower-directory'),
    path = require('path'),
    browserSync = require('browser-sync');

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp, config) {
  var toCopy = {};
  var toDist;

  var bower = path.relative(process.cwd(), bowerDirectory.sync());

  config.assets.forEach(function (asset) {
    toCopy[asset] = [];
    toCopy[asset].push(config.folders[asset] + '/**/*');
  });

  toDist = [
    config.folders.server + '/**/*',
    '!' + config.folders.server + '/**/*.html',
    '!' + config.folders.server + '/' + config.folders[bower] + '/**/*',
    '!' + config.folders.server + '/' + config.folders.css + '/**/*',
    '!' + config.folders.server + '/' + config.folders.javascript + '/**/*'
  ];

  toDist = toDist.concat(config.options.copy);

  //////////////////////////////
  // Encapsulate task in function to choose path to work on
  //////////////////////////////
  var CopyTask = function (path, folder) {
    return gulp.src(path)
      .pipe(gulp.dest(config.folders.server + '/' + folder + '/'))
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
    return gulp.src(toDist)
      .pipe(gulp.dest(config.folders.output + '/'));
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
              fs.removeSync(config.folders.server + '/' + event.path.relative);
              return;
            }

            // Call the task
            return CopyTask(event.path.absolute, key === 'html' ? '.' : key);
          });
      }
    });
  });
}
