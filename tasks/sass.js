'use strict';

const config = require('config');

const failure = require('../lib/helpers/failure');
const task = require('../lib/helpers/task');
const sass = require('../lib/tasks/sass');
const lint = require('gulp-sass-lint');
const sync = require('browser-sync');

module.exports = gulp => {
  //////////////////////////////
  // Lint all Sass files
  //////////////////////////////
  gulp.task('sass:lint', () => {
    return gulp.src(config.watch.sass)
      .pipe(sass.lint())
        .on('error', failure('sass-lint'))
  });

  //////////////////////////////
  // Compile all Sass files
  //////////////////////////////
  gulp.task('sass', ['sass:lint'], () => {
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
  task.watch('sass:watch', config.watch.sass, 'sass', gulp);
};
