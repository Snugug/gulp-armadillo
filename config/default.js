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
  publish: {
    force: true,
    message: ':shipit: Update [timestamp]',
  },

  // Compiled Goodness
  folders: {
    output: '.www',
    sass: 'sass',
    css: 'css',
    js: 'js',
    pages: 'pages',
    templates: 'templates',
    images: 'images',
    videos: 'videos',
    audio: 'audio',
    fonts: 'fonts',
    documents: 'documents',
  },
  sourcemaps: {
    enable: true,
    directory: '../maps',
  },
  sw: {
    browser: {
      include: true,
      notify: true,
      updated: 'Content has been added or updated, refresh to get it!',
      offline: 'Content is now available offline!',
    },
    file: 'sw.js',
    extensions: [
      'html',
      'css',
      'js',
      'woff',
      'woff2',
      'svg',
      'png',
      'jpg',
      'jpeg',
      'gif',
      'webm',
    ],
  },
  tasks: {
    watch: [
      [
        'copy:watch',
        'images:watch',
        'js:watch',
        'pages:watch',
        'sass:watch',
        'sw:watch',
      ],
    ],
    copy: [
      [
        'copy:videos',
        'copy:audio',
        'copy:documents',
        'copy:fonts',
        'copy:meta',
      ],
    ],
    build: [
      'clean',
      [
        'copy',
        'images',
        'js',
        'pages',
        'sass',
      ],
      'sw',
    ],
    serve: [
      'build',
      [
        'server',
        'watch',
      ],
    ],
    dry: [
      'build',
      'optimize',
    ],
    deploy: [
      'deploy:dry',
      'publish',
    ],
  },
};
