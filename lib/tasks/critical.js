'use strict';

const combine = require('stream-combiner');
const config = require('config');

const task = require('../helpers/task');
const empty = require('../plugins/empty');
const critical = require('critical').stream;
const minify = require('gulp-htmlmin');

module.exports.compile = () => {
  const base = task.dest('');

  const criticalOpts = config.critical;
  criticalOpts.base = base;

  const minifyOpts = config.htmlmin;

  return combine([
    empty(),
    critical(criticalOpts),
    minify(minifyOpts),
  ]);
};
