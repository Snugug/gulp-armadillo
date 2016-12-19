'use strict';

const config = require('config');

const task = require('../lib/task');
const scripts = require('../lib/tasks/scripts');

module.exports = gulp => {
  task('js:lint', [
    gulp.src(config.watch.js),
    scripts.lint(),
  ], gulp);

  task('js', [
    scripts.compile(),
    gulp.dest(config.dest.js)
  ], gulp, ['js:lint']);

  task.watch('js:watch', config.watch.js, 'js', gulp);
}
