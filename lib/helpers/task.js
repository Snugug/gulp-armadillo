'use strict';

const config = require('config');
const pump = require('pump');

const path = require('path');

const failOnError = cb => {
  return error => {
    if (config.failOnError && error) {
      cb(error);
    }

    if (error) {
      process.stderr.write(error + '\n');
      cb();
    }
  }
}

module.exports = (name, tasks, gulp, before = false) => {
  let prefix = before;

  if (prefix && typeof prefix === 'string') {
    prefix = [prefix];
  }

  gulp.task(name, prefix, cb => {
    pump(tasks, cb);
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

module.exports.dest = dest => {
  if (process.env.DEST) {
    return path.join(config.dest[process.env.DEST], dest);
  }

  return path.join(config.dest.server, dest);
}
