'use strict';

const config = require('config');
const sequence = require('../lib/helpers/sequence');
const armadillo = require('../lib/helpers/armadillo');

module.exports = gulp => {
  gulp.task('build', 'Builds all files', cb => {
    process.env.DEST = 'dist';
    armadillo('Building');
    return sequence(config.tasks.build, cb);
  });
}
