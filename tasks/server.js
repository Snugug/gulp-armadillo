'use strict';

const config = require('config');

const sequence = require('../lib/helpers/sequence');
const armadillo = require('../lib/helpers/armadillo');
const browserSync = require('browser-sync');

module.exports = gulp => {
  gulp.task('server', 'Starts BrowserSync server', () => {
    browserSync.init({
      server: {
        baseDir: config.folders.output,
      },
    });
  });

  gulp.task('serve', 'Compiles and serves the static site, watching for changes, and recompiling the site on change', cb => {
    armadillo('Serving');

    return sequence(config.tasks.serve, cb);
  });
};
