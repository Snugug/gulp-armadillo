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
    plumber = require('gulp-plumber'),
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

  var templatesPaths = [];

  config.folders.templates.forEach(function (folder) {
    templatesPaths.push(folder + '/**/*');
  });

  //////////////////////////////
  // Encapsulate task in function to choose path to work on
  //////////////////////////////
  var PagesTask = function (path, fail) {
    //////////////////////////////
    // Nunjucks Error
    //////////////////////////////
    var PagesError = function (error) {
      gutil.log(
        error.toString()
      );
    };

    //////////////////////////////
    // Nunjucks Config
    //////////////////////////////
    if (config.options && !config.options.nunjucks) {
      config.options.nunjucks = {};
    }

    return gulp.src(PagesPaths)
      .pipe(plumber({
        errorHandler: PagesError
      }))
      .pipe(fm())
      .pipe(walk(config))
      .pipe(mark())
      .pipe(nunjucks({
        'paths': config.folders.templates,
        'filters': config.options.nunjucks.filters ? config.options.nunjucks.filters : {},
        'tags': config.options.nunjucks.tags ? config.options.nunjucks.tags :  {},
        'variables': config.variables
      }))
      .pipe(gulpif(config.settings.transformURL, bt()))
      .pipe(gulp.dest(config.folders.server + '/'))
      .pipe(reload({stream: true}));
  }

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('pages', function () {
    return PagesTask(PagesPaths, true);
  });

  gulp.task('pages:templates', function () {
    return gulp.watch(templatesPaths, ['pages']);
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
        return PagesTask(event.path.absolute, false);
      });
  });
}
