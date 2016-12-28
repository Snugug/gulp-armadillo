'use strict';

const lazypipe = require('lazypipe');
const combine = require('stream-combiner');
const config = require('config');
const clone = require('lodash/cloneDeep');

const rollup = require('rollup-stream');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const maps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const lint = require('gulp-eslint');

const path = require('path');

module.exports.compile = file => {
  const rollupOptions = clone(config.get('rollup'));
  const babelOptions = config.get('babel');

  let entry = rollupOptions.entry;

  if (file) {
    entry = file;
    rollupOptions.entry = file;
  }

  return combine([
    rollup(rollupOptions),
    source(path.basename(entry), path.dirname(entry)),
    buffer(),
    maps.init({
      loadMaps: true,
    }),
    babel(babelOptions),
    maps.write(config.sourcemaps.directory),
  ]);
};

module.exports.lint = lazypipe()
  .pipe(lint)
  .pipe(lint.format);
