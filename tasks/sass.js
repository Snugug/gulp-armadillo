'use strict';

const config = require('config');

const failure = require('../lib/helpers/failure');
const task = require('../lib/helpers/task');
const sass = require('../lib/tasks/sass');
const sync = require('browser-sync');

module.exports = gulp => {
  const build = `${config.folders.sass}/**/*.s+(a|c)ss`;
  const watch = build;

  // ////////////////////////////
  // Lint all Sass files
  // ////////////////////////////
  gulp.task('sass:lint', 'Lints Sass files', () => {
    return gulp.src(build)
      .pipe(sass.lint())
        .on('error', failure('sass-lint'));
  });

  // ////////////////////////////
  // Compile all Sass files
  // ////////////////////////////
  gulp.task('sass', 'Compiles Sass files using Eyeglass and adds needed vendor prefixes', ['sass:lint'], () => {
    return gulp.src(build)
      .pipe(sass.compile())
        .on('error', failure('sass'))
      .pipe(gulp.dest(task.dest(config.folders.css)))
      .pipe(sync.stream({
        match: '**/*.css',
      }));
  });

  // ////////////////////////////
  // Watch for changes in all Sass files and recompile them
  // ////////////////////////////
  task.watch('sass', watch, 'sass', gulp);
};
