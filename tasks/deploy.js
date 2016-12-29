'use strict';

const deploy = require('gulp-gh-pages');
const config = require('config');
const sequence = require('../lib/helpers/sequence');
const armadillo = require('../lib/helpers/armadillo');

module.exports = gulp => {
  gulp.task('gh-pages', 'Deploys site to GitHub Pages', () => {
    return gulp.src(`${config.folders.dist}/**/*`)
      .pipe(deploy(config.deploy));
  });

  gulp.task('deploy', 'Builds and deploys site', cb => {
    armadillo('Deploying');

    return sequence(config.tasks.deploy, cb);
  });
};
