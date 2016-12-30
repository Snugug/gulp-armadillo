'use strict';

const config = require('config');
const precache = require('sw-precache');
const task = require('../helpers/task');

module.exports = cb => {
  const file = task.dest(config.sw.file);
  const glob = task.dest(`**/*.{${config.sw.extensions.join(',')}}`);
  const dir = task.dest('');

  precache.write(file, {
    staticFileGlobs: [glob],
    stripPrefix: dir,
  }, cb);
};
