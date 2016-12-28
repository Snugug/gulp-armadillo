'use strict';

const config = require('config');
const sequence = require('../lib/helpers/sequence');
const armadillo = require('../lib/helpers/armadillo');

module.exports = gulp => {
  gulp.task('watch', 'Runs all watch tasks', cb => {
    armadillo('Watching');
    return sequence(config.tasks.watch, cb);
  });
}
