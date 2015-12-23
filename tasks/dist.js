'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var armadillo = require('../helpers/armadillo'),
    sequence = require('run-sequence');

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp, config) {
  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('dist', function (cb) {
    armadillo('Dist-readying');
    return sequence(
      // Clean Dist, Build everything
      config.tasks.dist.build,

      // Move convent over
      config.tasks.dist.copy,

      // Generate critical stuff
      config.tasks.dist.optimize,

      // Callback
      cb
    );
  });
}
