'use strict';

const config = require('config');

module.exports = gulp => {
  gulp.task('watch', config.tasks.watch);
}
