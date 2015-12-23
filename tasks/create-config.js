'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var armadillo = require('../helpers/armadillo'),
    print = require('../helpers/print'),
    rename = require('gulp-rename'),
    open = require('gulp-open'),
    path = require('path');

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp, config) {
  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('create-config', function () {
    var configFile = path.join(__dirname, '..', 'helpers', 'config', 'armadillo.js');

    armadillo('Generating Config File');
    return gulp.src(configFile)
      .pipe(rename('.armadillo.js'))
      .pipe(gulp.dest('./'))
      .pipe(print({
        'output': false,
        'message': armadillo('Generated .armadillo.js')
      }))
      .pipe(open());
  });
}
