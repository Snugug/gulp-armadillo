'use strict';

const config = require('config');

const sequence = require('../lib/helpers/sequence');
const browserSync = require('browser-sync').create('armadillo');

module.exports = gulp => {
  gulp.task('server', () => {
    browserSync.init({
      server: {
        baseDir: config.dest.server,
      },
    });
  });

  gulp.task('serve', cb => {
    return sequence(config.tasks.serve, cb);
  });
}
