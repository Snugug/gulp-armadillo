'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var clean = require('del');

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp) {
  //////////////////////////////
  // Clean Server
  //////////////////////////////
  gulp.task('clean', function (cb) {
    return clean([
      '.www/**/*'
    ], cb);
  });

  gulp.task('clean:dist', function (cb) {
    return clean([
      '.dist/**/*'
    ], cb);
  });
}
