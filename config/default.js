'use strict';

const rollupNode = require('rollup-plugin-node-resolve');
const rollupCommon = require('rollup-plugin-commonjs');

let fail = false;

if (process.env.FAIL_ON_ERROR === 'true' || process.env.CI === 'true') {
  fail = true;
}

module.exports = {
  rollup: {
    entry: 'js/main.js',
    sourceMap: true,
    preferConst: true,
    plugins: [
      rollupNode(),
      rollupCommon(),
    ],
  },
  babel: {
    presets: [
      'babili',
    ],
    comments: false,
    minified: true,
    compact: true,
  },
  eslint: {},
  sourcemaps: {
    enable: true,
    directory: '../maps',
  },
  failOnError: fail,
  watch: {
    sass: 'sass/**/*.scss',
    js: 'js/**/*.js',
  }
};
