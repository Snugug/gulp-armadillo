'use strict';

const config = require('config');

const task = require('../lib/helpers/task');
const scripts = require('../lib/tasks/scripts');
const sync = require('browser-sync');

module.exports = gulp => {
  task('js:lint', [
    gulp.src(config.watch.js),
    scripts.lint(),
  ], gulp);

  task('js', [
    scripts.compile(),
    gulp.dest(task.dest(config.dest.js)),
    sync.stream({
      match: '**/*.js'
    })
  ], gulp, ['js:lint']);

  task.watch('js:watch', config.watch.js, 'js', gulp);
}
