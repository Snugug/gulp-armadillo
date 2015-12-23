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
  gulp.task('build', function (cb) {
    armadillo('Building');
    return sequence(
      // Clean everything
      config.tasks.build.clean,

      // Lint everything
      config.tasks.build.lint,

      // Build stuff
      config.tasks.build.build,

      // Callback
      cb
    );
  });
}
