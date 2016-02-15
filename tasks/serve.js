'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var sequence = require('../helpers/sequence'),
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
    return sequence(config.tasks.serve, cb);
  });
}
