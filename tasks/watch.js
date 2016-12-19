'use strict';

module.exports = gulp => {
  gulp.task('watch', ['sass:watch', 'js:watch']);
}
