'use strict';

const config = require('config');
const path = require('path');

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
