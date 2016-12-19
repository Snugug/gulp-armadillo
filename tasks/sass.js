'use strict';

const sass = require('../lib/tasks/sass');
const config = require('config');

module.exports = gulp => {

  gulp.task('sass', () => {
    return gulp.src(config.watch.sass)
      .pipe(sass())
      .pipe(gulp.dest(config.dest.sass));
  });

  gulp.task('sass:watch', ['sass'], () => {
    return gulp.watch(config.watch.sass, ['sass']);
  });
};
