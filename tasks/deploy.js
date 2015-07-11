'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var sequence = require('run-sequence'),
    armadillo = require('../helpers/armadillo'),
    ghPages = require('gulp-gh-pages');

//////////////////////////////
// Internal Vars
//////////////////////////////
var toDeploy = [
  '.dist/**/*'
];

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp, DeployPaths, options) {
  // Set value of paths to either the default or user entered
  DeployPaths = DeployPaths || toDeploy;

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('gh-pages', function () {
    return gulp.src(DeployPaths)
      .pipe(ghPages({
        'message': ':shipit: Update ' + new Date().toISOString()
      }));
  });

  gulp.task('deploy', function (cb) {
    armadillo('Deploying');
    return sequence(
      // Dist Everything
      'dist',

      // Deploy Everything
      'gh-pages',

      // Callback
      cb
    );
  });
}
