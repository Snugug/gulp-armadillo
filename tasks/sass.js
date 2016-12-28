'use strict';

const config = require('config');

const failure = require('../lib/helpers/failure');
const task = require('../lib/helpers/task');
const sass = require('../lib/tasks/sass');
const sync = require('browser-sync');

module.exports = gulp => {
  //////////////////////////////
  // Lint all Sass files
  //////////////////////////////
  gulp.task('sass:lint', 'Lints Sass files', () => {
    return gulp.src(config.watch.sass)
      .pipe(sass.lint())
        .on('error', failure('sass-lint'))
  });

  //////////////////////////////
  // Compile all Sass files
  //////////////////////////////
  gulp.task('sass', 'Compiles Sass files using Eyeglass and adds needed vendor prefixes', ['sass:lint'], () => {
    return gulp.src(config.watch.sass)
      .pipe(sass.compile())
        .on('error', failure('sass'))
      .pipe(gulp.dest(task.dest(config.folders.css)))
      .pipe(sync.stream({
        match: '**/*.css'
      }))
  });


  //////////////////////////////
  // Watch for changes in all Sass files and recompile them
  //////////////////////////////
  task.watch('sass', config.watch.sass, 'sass', gulp);
};
