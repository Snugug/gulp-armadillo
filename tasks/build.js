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
  gulp.task('build', function (cb) {
    armadillo('Building');
    return sequence(config.tasks.build, cb);
  });
}
