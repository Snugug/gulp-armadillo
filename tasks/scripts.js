'use strict';

const scripts = require('../lib/tasks/scripts');
const config = require('config');

module.exports = gulp => {
  gulp.task('js:lint', () => {
    return gulp.src(config.watch.js)
      .pipe(scripts.lint());
  });

  gulp.task('js', ['js:lint'], () => {
    return scripts.compile()
      .pipe(gulp.dest(config.dest.js));
  });

  gulp.task('js:watch', ['js'], () => {
    return gulp.watch(config.watch.js, ['js']);
  });
}
