'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var critical = require('critical').stream,
    minifyHTML = require('gulp-minify-html');


//////////////////////////////
// Internal Vars
//////////////////////////////
var toCritical = [
  '.dist/**/*.html'
];

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp, CriticalPaths) {
  // Set value of paths to either the default or user entered
  CriticalPaths = CriticalPaths || toCritical;

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('critical', function () {
    return gulp.src('.dist/**/*.html')
      .pipe(critical({
        base: '.dist/',
        inline: true
      }))
      .pipe(minifyHTML({
        'empty': true,
        'quotes': true,
        'loose': true
      }))
      .pipe(gulp.dest('.dist/'));
  });
}
