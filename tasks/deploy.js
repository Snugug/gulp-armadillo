'use strict';

const publish = require('gulp-gh-pages');
const config = require('config');
const sequence = require('../lib/helpers/sequence');
const armadillo = require('../lib/helpers/armadillo');

module.exports = gulp => {
  gulp.task('publish', 'Publishes site to GitHub Pages', () => {
    return gulp.src(`${config.folders.output}/**/*`)
      .pipe(publish(config.pubish));
  });

  gulp.task('deploy:dry', 'Dry-run of deploy', cb => {
    return sequence(config.tasks.dry, cb);
  });

  gulp.task('deploy', 'Builds and publishes site', cb => {
    armadillo('Deploying');

    return sequence(config.tasks.deploy, cb);
  });
};
