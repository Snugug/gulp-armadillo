'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var critical = require('critical').stream,
    minifyInline = require('gulp-minify-inline'),
    minifyHTML = require('gulp-minify-html');


//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp, config) {
  // Set value of paths to either the default or user entered
  var CriticalPaths = [
    config.folders.output + '/**/*.html'
  ];

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('critical', function () {
    return gulp.src(config.folders.output + '/**/*.html')
      .pipe(critical({
        base: config.folders.output + '/',
        inline: true
      }))
      .pipe(minifyInline())
      .pipe(minifyHTML(config.options.minifyHTML))
      .pipe(gulp.dest(config.folders.output + '/'));
  });
}
