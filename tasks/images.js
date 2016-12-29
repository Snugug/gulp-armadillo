'use strict';

const config = require('config');
const optimize = require('gulp-imagemin');
const cache = require('gulp-cached');
const failure = require('../lib/helpers/failure');
const task = require('../lib/helpers/task');
const sync = require('browser-sync');

module.exports = gulp => {
  const build = `${config.folders.images}/**/*`;
  const watch = build;

  gulp.task('images', 'Optimizes images', () => {
    return gulp.src(build)
      .pipe(cache('images'))
      .pipe(optimize(config.imagemin))
        .on('error', failure('images'))
      .pipe(gulp.dest(task.dest(config.folders.images)))
      .pipe(sync.stream());
  });

  task.watch('images', watch, 'images', gulp);
};
