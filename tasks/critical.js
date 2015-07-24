'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var critical = require('critical').stream,
    minifyInline = require('gulp-minify-inline'),
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
module.exports = function (gulp, CriticalPaths, options) {
  // Set value of paths to either the default or user entered
  CriticalPaths = CriticalPaths || toCritical;

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('critical', function () {
    return gulp.src('.dist/**/*.html')
      // .pipe(critical({
      //   base: '.dist/',
      //   inline: true
      // }))
      .pipe(minifyInline())
      .pipe(minifyHTML({
        'empty': true,
        'quotes': true,
        'loose': true
      }))
      .pipe(gulp.dest('.dist/'));
  });
}
