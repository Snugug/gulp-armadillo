'use strict';

const config = require('config');

const failure = require('../lib/helpers/failure');
const task = require('../lib/helpers/task');
const scripts = require('../lib/tasks/scripts');
const sync = require('browser-sync');

module.exports = gulp => {
  const build = `${config.folders.js}/**/*.js`;
  const watch = build;

  gulp.task('js:lint', 'Lints user JavaScript files with ESLint', () => {
    return gulp.src(build)
      .pipe(scripts.lint())
        .on('error', failure('js-lint'));
  });

  gulp.task('js', 'Compiles JavaScript files with Rollup and runs results through Babel', () => {
    return scripts.compile()
        .on('error', failure('js'))
      .pipe(gulp.dest(task.dest(config.folders.js)))
      .pipe(sync.stream({
        match: '**/*.js',
      }));
  });

  task.watch('js', watch, 'js', gulp);
};
