'use strict';

const config = require('config');
const failure = require('../lib/helpers/failure');
const task = require('../lib/helpers/task');
const critical = require('../lib/tasks/critical');

module.exports = gulp => {
  gulp.task('optimize', 'Optimizes rendered HTML', () => {
    return gulp.src(`${config.folders.dist}/**/*.html`)
      .pipe(critical.compile())
        .on('error', failure('optimize'))
      .pipe(gulp.dest(task.dest('')));
  });
};
