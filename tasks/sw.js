'use strict';

const config = require('config');
const sw = require('../lib/tasks/sw');
const task = require('../lib/helpers/task');
const sync = require('browser-sync');

module.exports = gulp => {
  const watch = `${config.folders.output}/**/*`;

  gulp.task('sw', 'Generates a dynamic Service Worker', cb => {
    sw((err) => {
      sync.reload();

      cb(err);
    });
  });

  task.watch('sw', watch, 'sw', gulp);
};
