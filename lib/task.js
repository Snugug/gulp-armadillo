'use strict';

const config = require('config');
const pump = require('pump');

const failOnError = cb => {
  return error => {
    if (config.failOnError) {
      return cb(error);
    }

    process.stderr.write(error + '\n');
    return cb();
  }
}

module.exports = (name, tasks, gulp, before = false) => {
  let prefix = before;

  if (prefix && typeof prefix === 'string') {
    prefix = [prefix];
  }

  gulp.task(name, prefix, cb => {
    pump(tasks, failOnError(cb));
  });
}

module.exports.watch = (name, glob, tasks, gulp) => {
  let tsks = tasks;

  if (tsks && typeof tsks === 'string') {
    tsks = [tsks];
  }

  gulp.task(name, tsks, cb => {
    return gulp.watch(glob, tsks);
  });
}
