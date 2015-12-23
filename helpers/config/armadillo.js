'use strict';

var importOnce = require('node-sass-import-once'),
    pngquant = require('imagemin-pngquant');

var settings = {
  'folders': {
    'server': '.www',
    'output': '.dist',
    'pages': 'pages',
    'templates': 'templates',
    'sass': 'sass',
    'css': 'css',
    'javascript': 'js',
    'images': 'images',
    'videos': 'videos',
    'audio': 'audio',
    'fonts': 'fonts',
    'documents': 'documents'
  },
  'assets': [
    'images',
    'videos',
    'audio',
    'fonts',
    'documents'
  ],
  'settings': {
    'transformURL': true,
    'mergeDefaultConfig': true
  },
  'options': {
    'deployCommitMessage': ':shipit Update ' + new Date().toISOString(),
    'sass': {
      'outputStyle': 'expanded',
      'importer': importOnce,
      'importOnce': {
        'index': true,
        'css': true,
        'bower': true
      }
    },
    'copy': [],
    'imagemin': {
      'progressive': true,
      'svgoPlugins': [
        { 'removeViewBox': false },
        { 'removeUselessDefs': false },
        { 'convertTransform': false }
      ],
      'use': [
        pngquant()
      ]
    },
    'minifyHTML': {
      'empty': true,
      'quotes': true,
      'loose': true
    }
  },
  'tasks': {
    'watch': [
      'eslint:watch',
      'copy:watch',
      'sass:watch',
      'imagemin:watch',
      'pages:watch',
      'pages:templates'
    ],
    'build': {
      'clean': [
        'clean'
      ],
      'lint': [
        'eslint'
      ],
      'build': [
        'copy',
        'sass',
        'imagemin',
        'pages'
      ]
    },
    'dist': {
      'build': [
        'build',
        'clean:dist'
      ],
      'copy': [
        'copy:dist',
        'usemin'
      ],
      'optimize': [
        'critical'
      ]
    },
    'deploy': {
      'build': [
        'dist'
      ],
      'deploy': [
        'gh-pages'
      ]
    },
    'serve': {
      'build': [
        'build'
      ],
      'serve': [
        'browser-sync',
        'watch'
      ]
    }
  }
};


module.exports = settings;