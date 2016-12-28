'use strict';

const config = require('config');

module.exports = gulp => {
  gulp.task('watch', 'Runs all watch tasks', config.tasks.watch);
}
