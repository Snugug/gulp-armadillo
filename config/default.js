'use strict';

const rollupNode = require('rollup-plugin-node-resolve');
const rollupCommon = require('rollup-plugin-commonjs');

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
  watch: {
    sass: 'sass/**/*.scss',
    js: 'js/**/*.js',
  },
  sass: {
    outputStyle: 'compressed',
  },
  dest: {
    server: '.www',
    dist: '.dist',
    sass: 'css',
    js: 'js',
  },
  tasks: {
    watch: [
      'sass:watch',
      'js:watch',
    ],
    serve: [
      'server',
      'watch',
    ],
  }
};
