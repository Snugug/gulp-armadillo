'use strict';

// ////////////////////////////
// Requires
// ////////////////////////////
const clean = require('del');
const config = require('config');
const armadillo = require('../lib/helpers/armadillo');

// ////////////////////////////
// Export
// ////////////////////////////
module.exports = gulp => {
  // ////////////////////////////
  // Clean Server
  // ////////////////////////////
  gulp.task('clean', 'Cleans output folder', cb => {
    armadillo('Cleaning');

    return clean([
      `${config.folders.output}/**/*`,
    ], cb);
  });
};
