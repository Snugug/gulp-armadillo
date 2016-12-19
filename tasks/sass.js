'use strict';

const config = require('config');

const task = require('../lib/helpers/task');
const sass = require('../lib/tasks/sass');
const sync = require('browser-sync');

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
    gulp.dest(task.dest(config.dest.sass)),
    sync.stream({
      match: '**/*.css'
    })
  ], gulp);


  //////////////////////////////
  // Watch for changes in all Sass files and recompile them
  //////////////////////////////
  task.watch('sass:watch', config.watch.sass, 'sass', gulp);
};
