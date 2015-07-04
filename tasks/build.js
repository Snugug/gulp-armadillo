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
  armadillo('Let\'s Build');

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('build', function (cb) {
    return sequence(
      // Clean everything
      'clean',

      // Lint everything
      ['eslint'],

      // Build stuff
      ['copy', 'sass', 'imagemin'],

      // Callback
      cb
    );
  });
}
