'use strict';

const config = require('config');
const path = require('path');

// Ignoring as Gulp 3 can't check to see if a task exists
/* istanbul ignore next */
module.exports.watch = (name, glob, tasks, gulp) => {
  let tsks = tasks;

  if (tsks && typeof tsks === 'string') {
    tsks = [tsks];
  }

  gulp.task(`${name}:watch`, `Watches '${name}' files and recompiles on change`, tsks, () => {
    return gulp.watch(glob, tsks);
  });
};

module.exports.dest = dest => {
  if (process.env.DEST) {
    return path.join(config.folders[process.env.DEST], dest);
  }

  return path.join(config.folders.output, dest);
};
