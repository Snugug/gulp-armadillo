'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var clean = require('del');

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp, config) {
  //////////////////////////////
  // Clean Server
  //////////////////////////////
  gulp.task('clean', function (cb) {
    return clean([
      config.folders.server + '/**/*'
    ], cb);
  });

  gulp.task('clean:dist', function (cb) {
    return clean([
      config.folders.output + '/**/*'
    ], cb);
  });
}
