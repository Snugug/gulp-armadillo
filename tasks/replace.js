'use strict';

const task = require('../lib/helpers/task');
const failure = require('../lib/helpers/failure');
const replace = require('../lib/tasks/replace');

module.exports = gulp => {
  const base = task.dest('/**/*.html');

  // ////////////////////////////
  // Compile all Pages
  // ////////////////////////////
  gulp.task('replace:base', 'Replaces <base> tag contents in HTML files', () => {
    return gulp.src(base)
      .pipe(replace.base())
        .on('error', failure('replace:base'))
      .pipe(gulp.dest(task.dest('')));
  });
};
