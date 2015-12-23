'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var sequence = require('run-sequence'),
    armadillo = require('../helpers/armadillo');

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp, config) {

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('serve', function (cb) {
    armadillo('Serving');
    return sequence(
      // Build everything
      config.tasks.serve.build,

      // Serve everything
      config.tasks.serve.serve,

      // Callback
      cb
    );
  });
}
