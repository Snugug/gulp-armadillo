'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var sequence = require('run-sequence'),
    armadillo = require('../helpers/armadillo');

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp) {

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('serve', function (cb) {
    armadillo('Serving');
    return sequence(
      // Clean everything
      'build',

      // Lint everything
      ['browser-sync', 'watch'],

      // Callback
      cb
    );
  });
}
