'use strict';

const lazypipe = require('lazypipe');
const config = require('config');

const sass = require('gulp-sass');
const eyeglass = require('eyeglass');
const prefix = require('gulp-autoprefixer');
const lint = require('gulp-sass-lint');
const maps = require('gulp-sourcemaps');

module.exports.compile = lazypipe()
  .pipe(maps.init)
  .pipe(sass, eyeglass(config.sass))
  .pipe(prefix)
  .pipe(maps.write, config.sourcemaps.directory);

module.exports.lint = lazypipe()
  .pipe(lint)
  .pipe(lint.format);
