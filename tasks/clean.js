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
  gulp.task('clean:server', 'Cleans server folder', cb => {
    armadillo('Cleaning server');

    return clean([
      `${config.folders.server}/**/*`,
    ], cb);
  });

  gulp.task('clean:build', 'Cleans build folder', cb => {
    armadillo('Cleaning build');

    return clean([
      `${config.folders.dist}/**/*`,
    ], cb);
  });
};
