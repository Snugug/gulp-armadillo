'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var armadillo = require('../helpers/armadillo'),
    sequence = require('../helpers/sequence');

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp, config) {
  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('dist', function (cb) {
    armadillo('Dist-readying');
    return sequence(config.tasks.dist, cb);
  });
}
