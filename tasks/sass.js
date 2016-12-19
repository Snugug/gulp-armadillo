'use strict';

const config = require('config');

const task = require('../lib/task');
const sass = require('../lib/tasks/sass');

module.exports = gulp => {
  //////////////////////////////
  // Lint all Sass files
  //////////////////////////////
  task('sass:lint', [
    gulp.src(config.watch.sass),
    sass.lint(),
  ], gulp);

  //////////////////////////////
  // Compile all Sass files
  //////////////////////////////
  task('sass', [
    gulp.src(config.watch.sass),
    sass.compile(),
    gulp.dest(config.dest.sass)
  ], gulp, ['sass:lint']);


  //////////////////////////////
  // Watch for changes in all Sass files and recompile them
  //////////////////////////////
  task.watch('sass:watch', config.watch.sass, 'sass', gulp);
};
