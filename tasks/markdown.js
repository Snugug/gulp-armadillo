'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var gutil = require('gulp-util'),
    mark = require('../helpers/mark.js'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

//////////////////////////////
// Internal Vars
//////////////////////////////
var toMarkdown = [
  'pages/**/*.md'
];

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp, MarkdownPaths) {
  // Set value of paths to either the default or user entered
  MarkdownPaths = MarkdownPaths || toMarkdown;

  //////////////////////////////
  // Encapsulate task in function to choose path to work on
  //////////////////////////////
  var MarkdownTask = function (path) {
    return gulp.src(MarkdownPaths)
      .pipe(mark())
      .pipe(gulp.dest('dist/'))
      .pipe(reload({stream: true}));
  }

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('markdown', function () {
    return MarkdownTask(MarkdownPaths);
  });

  //////////////////////////////
  // Watch Task
  //////////////////////////////
  gulp.task('markdown:watch', function () {
    return gulp.watch(MarkdownPaths)
      .on('change', function (event) {
        // Add absolute and relative (to Gulpfile) paths
        event.path = {
          absolute: event.path,
          relative: event.path.replace(__dirname.replace('/tasks', '') + '/', '')
        }

        // Notify user of the change
        gutil.log('File ' + gutil.colors.magenta(event.path.relative) + ' was ' + event.type);

        // Call the task
        return MarkdownTask(event.path.absolute);
      });
  });
}
