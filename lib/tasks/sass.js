'use strict';
const lazypipe = require('lazypipe');
// const config = require('config');


const sass = require('gulp-sass');
const eyeglass = require('eyeglass');
const prefix = require('gulp-autoprefixer');
const lint = require('gulp-sass-lint');
const maps = require('gulp-sourcemaps');


const options = {
  outputStyle: 'compressed',
}

module.exports = lazypipe()
  .pipe(lint)
  .pipe(maps.init)
  .pipe(sass, eyeglass(options))
  .pipe(prefix)
  .pipe(maps.write, './maps');
