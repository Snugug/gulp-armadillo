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
  gulp.task('dist', function (cb) {
    armadillo('Dist-readying');
    return sequence(
      // Clean Dist, Build everything
      ['build', 'clean:dist'],

      // Move convent over
      ['copy:dist', 'usemin'],

      // Generate critical stuff
      ['critical'],

      // Callback
      cb
    );
  });
}
