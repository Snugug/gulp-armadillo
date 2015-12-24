'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var sequence = require('run-sequence'),
    armadillo = require('../helpers/armadillo'),
    ghPages = require('gulp-gh-pages');


//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp, config) {
  // Set value of paths to either the default or user entered
  var DeployPaths = [
    config.folders.output + '/**/*'
  ];

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('gh-pages', function () {
    return gulp.src(DeployPaths)
      .pipe(ghPages({
        'message': config.options.deployCommitMessage
      }));
  });

  gulp.task('deploy', function (cb) {
    armadillo('Deploying');
    return sequence(
      // Dist Everything
      config.tasks.deploy.build,

      // Deploy Everything
      config.tasks.deploy.deploy,

      // Callback
      cb
    );
  });
}
