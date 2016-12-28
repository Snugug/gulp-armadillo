'use strict';

const rollupNode = require('rollup-plugin-node-resolve');
const rollupCommon = require('rollup-plugin-commonjs');

module.exports = {
  // Individual Functions
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
  sass: {
    outputStyle: 'compressed',
  },
  imagemin: {
    progressive: true,
    svgoPlugins: [
      { removeViewbox: false },
      { removeUselessDefs: false },
      { convertTransform: false },
    ],
  },
  critical: {
    inline: true,
    minify: true,
  },
  htmlmin: {
    collapseWhitespace: true,
  },
  // Compiled Goodness
  folders: {
    server: '.www',
    dist: '.dist',
    css: 'css',
    js: 'js',
    pages: 'pages',
    templates: 'templates',
    images: 'images',
    videos: 'videos',
    audio: 'audio',
    fonts: 'fonts',
    documents: 'docs',
    fixtures: 'tests/fixtures/critical',
  },
  sourcemaps: {
    enable: true,
    directory: '../maps',
  },
  watch: {
    pages: [
      'pages/**/*.html',
      'pages/**/*.md',
      'pages/**/*.markdown',
    ],
    sass: 'sass/**/*.scss',
    js: 'js/**/*.js',
    images: 'images/**/*',
  },
  tasks: {
    watch: [
      [
        'copy:watch',
        'images:watch',
        'js:watch',
        'pages:watch',
        'sass:watch',
      ],
    ],
    copy: [
      [
        'copy:videos',
        'copy:audio',
        'copy:documents',
        'copy:fonts',
      ],
    ],
    build: [
      'clean:build',
      [
        'copy',
        'images',
        'js',
        'pages',
        'sass',
      ],
      'optimize',
    ],
    serve: [
      'clean:server',
      [
        'server',
        'watch',
      ]
    ],
  }
};
