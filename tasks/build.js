'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var armadillo = require('../helpers/armadillo'),
    sequence = require('run-sequence');

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp) {
  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('build', function (cb) {
    armadillo('Building');
    return sequence(
      // Clean everything
      'clean',

      // Lint everything
      ['eslint'],

      // Build stuff
      ['copy', 'sass', 'imagemin', 'pages'],

      // Callback
      cb
    );
  });
}
