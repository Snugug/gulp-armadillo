'use strict';

const config = require('config');

const failure = require('../lib/helpers/failure');
const task = require('../lib/helpers/task');
const scripts = require('../lib/tasks/scripts');
const sync = require('browser-sync');

module.exports = gulp => {
  gulp.task('js:lint', () => {
    return gulp.src(config.watch.js)
      .pipe(scripts.lint())
        .on('error', failure('js-lint'))
  })

  gulp.task('js', () => {
    return scripts.compile()
        .on('error', failure('js'))
      .pipe(gulp.dest(task.dest(config.folders.js)))
      .pipe(sync.stream({
        match: '**/*.js'
      }))
  });

  // task('js', [
  //   scripts.compile().on('error', failure('sass')),

  // ], gulp, ['js:lint']);

  task.watch('js:watch', config.watch.js, 'js', gulp);
}
