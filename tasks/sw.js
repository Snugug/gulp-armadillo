'use strict';

const sw = require('../lib/tasks/sw');

module.exports = gulp => {
  gulp.task('sw', 'Generates a dynamic Service Worker', cb => {
    sw(cb);
  });
};
