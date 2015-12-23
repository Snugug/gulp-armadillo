'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var gutil = require('gulp-util'),
    gulpif = require('gulp-if'),
    fm = require('../helpers/fm'),
    mark = require('../helpers/mark'),
    nunjucks = require('../helpers/nunjucks'),
    walk = require('../helpers/walk'),
    bt = require('../helpers/blog-transform'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp, config) {
  // Set value of paths to either the default or user entered
  var PagesPaths = [
    config.folders.pages + '/**/*.md',
    config.folders.pages + '/**/*.html'
  ]

  //////////////////////////////
  // Encapsulate task in function to choose path to work on
  //////////////////////////////
  var PagesTask = function (path) {
    return gulp.src(PagesPaths)
      .pipe(fm())
      .pipe(walk(config))
      .pipe(mark())
      .pipe(nunjucks())
      .pipe(gulpif(config.settings.transformURL, bt()))
      .pipe(gulp.dest(config.folders.server + '/'))
      .pipe(reload({stream: true}));
  }

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('pages', function () {
    return PagesTask(PagesPaths);
  });

  gulp.task('pages:templates', function () {
    return gulp.watch(config.folders.templates + '/**/*', ['pages']);
  });

  //////////////////////////////
  // Watch Task
  //////////////////////////////
  gulp.task('pages:watch', function () {
    return gulp.watch(PagesPaths)
      .on('change', function (event) {
        // Add absolute and relative (to Gulpfile) paths
        event.path = {
          absolute: event.path,
          relative: event.path.replace(__dirname.replace('/tasks', '') + '/', '')
        }

        // Notify user of the change
        gutil.log('File ' + gutil.colors.magenta(event.path.relative) + ' was ' + event.type);

        // Call the task
        return PagesTask(event.path.absolute);
      });
  });
}
