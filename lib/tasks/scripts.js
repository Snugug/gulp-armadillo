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

const sw = require('../helpers/sw');

const path = require('path');

module.exports.compile = file => {
  const rollupOptions = clone(config.get('rollup'));

  let input = rollupOptions.input;

  if (file) {
    input = file;
    rollupOptions.input = file;
  }

  if (config.sw.browser.include) {
    rollupOptions.intro = sw;
  }

  return combine([
    rollup(rollupOptions),
    source(path.basename(input), path.dirname(input)),
    buffer(),
    maps.init({
      loadMaps: true,
    }),
    babel({
      presets: [
        'babili',
      ],
      comments: false,
      minified: true,
      compact: true,
    }),
    maps.write(config.sourcemaps.directory),
  ]);
};

module.exports.lint = lazypipe()
  .pipe(lint)
  .pipe(lint.format);
