'use strict';

const config = require('config');
const sw = require('../lib/tasks/sw');
const task = require('../lib/helpers/task');

module.exports = gulp => {
  const watch = [
    `${config.folders.output}/**/*`,
    `!${config.folders.output}/${config.sw.file}`,
  ];

  gulp.task('sw', 'Generates a dynamic Service Worker', cb => {
    sw(cb);
  });

  task.watch('sw', watch, 'sw', gulp);
};
