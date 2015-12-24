'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var gutil = require('gulp-util'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

//////////////////////////////
// Internal Vars
//////////////////////////////
var toServer = [
  '.www/'
];

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp, config) {
  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('browser-sync', function () {
    browserSync.init({
      'server': {
        'baseDir' : config.folders.server
      }
    })
  });
}
